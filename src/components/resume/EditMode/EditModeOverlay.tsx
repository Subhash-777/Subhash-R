'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Eye, Download, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/store/app';
import { PROJECT_BANK, ROLE_COMBINATIONS, ROLE_TITLES, ProjectDomain, DOMAIN_LABELS, ROLE_FILENAMES } from '@/data/projectBank';
import { calculateATSScore } from '@/lib/atsScorer';
import { generateLatex } from '@/lib/generateLatex';
import copy from 'copy-to-clipboard';
import { useExportPDF } from '@/hooks/useExportPDF';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
const overlayVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

function SortableProjectSlot({ id, proj, selectedRole, onRemove }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const projAts = calculateATSScore([proj], selectedRole);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 rounded-xl border transition-all min-h-[100px] flex items-start gap-3 ${
        isDragging ? 'bg-violet-500/20 border-violet-500 shadow-2xl scale-[1.02]' : 'bg-violet-500/5 border-violet-500/30'
      }`}
    >
      <div {...attributes} {...listeners} className="mt-1 cursor-grab active:cursor-grabbing text-gray-500 hover:text-violet-400">
        <GripVertical size={16} />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-xs font-bold text-white leading-tight">■ {proj.title}</span>
          <button
            onClick={onRemove}
            className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
            proj.priorityTier === 1 ? 'bg-green-500/20 text-green-400' :
            proj.priorityTier === 2 ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            Tier {proj.priorityTier}
          </span>
          {proj.domain.slice(0, 2).map((d: any) => (
            <span key={d} className="text-[9px] text-gray-500">{DOMAIN_LABELS[d as ProjectDomain]}</span>
          ))}
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  projAts.score >= 90 ? 'bg-green-500' :
                  projAts.score >= 75 ? 'bg-yellow-500' :
                  'bg-orange-500'
                }`}
                style={{ width: `${projAts.score}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-gray-400">{projAts.score}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditModeOverlay() {
  const {
    isEditModeOpen, closeEditMode,
    selectedRole, setSelectedRole,
    selectedProjectIds, addProject, removeProject, applySuggestedCombo, reorderProjects,
    customRoleTitle, setCustomRoleTitle,
    activeFilter, toggleFilter, clearFilters,
    openPreview,
  } = useAppStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = selectedProjectIds.indexOf(active.id as string);
      const newIndex = selectedProjectIds.indexOf(over.id as string);
      reorderProjects(oldIndex, newIndex);
    }
  };

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [copied, setCopied] = useState(false);
  const { exportPDF, isExporting, exportingLines } = useExportPDF();
  const handleExport = () => exportPDF(selectedProjects as any, selectedRole, customRoleTitle);

  const selectedProjects = useMemo(() =>
    selectedProjectIds.map(id => PROJECT_BANK.find(p => p.id === id)).filter(Boolean) as typeof PROJECT_BANK,
    [selectedProjectIds]
  );

  const atsResult = useMemo(() =>
    calculateATSScore(selectedProjects, selectedRole),
    [selectedProjects, selectedRole]
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter.length === 0) return PROJECT_BANK;
    return PROJECT_BANK.filter(p =>
      activeFilter.some(f => p.domain.includes(f as ProjectDomain))
    );
  }, [activeFilter]);

  const allDomains = useMemo(() =>
    Array.from(new Set(PROJECT_BANK.flatMap(p => p.domain))),
    []
  );

  const handleSmartSuggest = () => {
    const combo = ROLE_COMBINATIONS[selectedRole];
    if (combo) {
      applySuggestedCombo(combo);
    }
    const title = ROLE_TITLES[selectedRole];
    if (title) setCustomRoleTitle(title);
  };

  const handleCopyLatex = () => {
    const latex = generateLatex(selectedProjects, customRoleTitle);
    copy(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenOverleaf = () => {
    const latex = generateLatex(selectedProjects, customRoleTitle);
    const encoded = btoa(unescape(encodeURIComponent(latex)));
    const dataUri = `data:application/x-tex;base64,${encoded}`;
    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'https://www.overleaf.com/docs';
    form.target = '_blank';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'snip_uri';
    input.value = dataUri;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };
  return (
    <AnimatePresence>
      {isEditModeOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">✏️ RESUME EDITOR</span>
              <span className="text-[10px] text-gray-500 font-mono">Select exactly 3 projects for your resume</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLatex}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-400 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet-500/30 transition-all"
              >
                📋 {copied ? 'Copied!' : 'Copy LaTeX'}
              </button>
              <button
                onClick={handleOpenOverleaf}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 px-3 py-1.5 rounded-lg border border-white/10 hover:border-green-500/30 transition-all"
              >
                🍃 Open in Overleaf
              </button>
              <button
                onClick={closeEditMode}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Content — Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

            {/* Role Selector + Smart Suggest */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Applying for:</span>
                <div className="relative">
                  <button
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    className="flex items-center gap-2 text-sm text-white bg-white/5 border border-white/10 hover:border-violet-500/30 px-3 py-1.5 rounded-lg transition-colors min-w-[200px]"
                  >
                    {selectedRole}
                    <ChevronDown size={14} className="text-gray-400 ml-auto" />
                  </button>
                  <AnimatePresence>
                    {isRoleDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute top-full mt-1 left-0 w-72 max-h-64 overflow-y-auto bg-[#0a0a14] border border-white/10 rounded-xl shadow-2xl z-50"
                      >
                        {Object.keys(ROLE_COMBINATIONS).map(role => (
                          <button
                            key={role}
                            onClick={() => { setSelectedRole(role); setIsRoleDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                              role === selectedRole
                                ? 'bg-violet-600/20 text-violet-300'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <button
                onClick={handleSmartSuggest}
                className="flex items-center gap-1.5 text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <Zap size={12} />🎯 Smart Suggest
              </button>
            </div>

            {/* One-line Title Editor */}
            <div>
              <span className="text-[10px] text-gray-500 font-mono mb-1 block">ROLE TITLE:</span>
              {isEditingTitle ? (
                <input
                  type="text"
                  value={customRoleTitle}
                  onChange={e => setCustomRoleTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={e => e.key === 'Enter' && setIsEditingTitle(false)}
                  autoFocus
                  className="w-full bg-transparent border border-violet-500/30 text-sm text-white px-3 py-1.5 rounded-lg outline-none focus:border-violet-500"
                />
              ) : (
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="text-sm text-gray-300 italic hover:text-violet-300 transition-colors cursor-text"
                >
                  &quot;{customRoleTitle}&quot;
                </button>
              )}
            </div>

            {/* Selected Project Slots (Drag and Drop) */}
            <div>
              <div className="text-[10px] text-gray-500 font-mono mb-2 uppercase tracking-wider">
                Selected Projects ({selectedProjectIds.length}/3)
              </div>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={selectedProjectIds}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-1 gap-3">
                    {selectedProjectIds.map((id, index) => {
                      const proj = selectedProjects.find(p => p.id === id);
                      if (!proj) return null;
                      return (
                        <SortableProjectSlot
                          key={id}
                          id={id}
                          proj={proj}
                          selectedRole={selectedRole}
                          onRemove={() => removeProject(id)}
                        />
                      );
                    })}
                    {/* Empty Slots */}
                    {Array.from({ length: Math.max(0, 3 - selectedProjectIds.length) }).map((_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="p-3 rounded-xl border transition-all min-h-[100px] bg-white/[0.02] border-dashed border-white/10 flex items-center justify-center text-[11px] text-gray-600 font-mono"
                      >
                        Slot {selectedProjectIds.length + index + 1} — Drop a project here
                      </div>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            {/* Domain Filter */}
            <div>
              <div className="text-[10px] text-gray-500 font-mono mb-2 uppercase tracking-wider">
                All Projects · Filter by Domain
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <button
                  onClick={clearFilters}
                  className={`text-[10px] px-2.5 py-1 rounded-full transition-all ${
                    activeFilter.length === 0
                      ? 'bg-violet-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  All
                </button>
                {allDomains.map(domain => (
                  <button
                    key={domain}
                    onClick={() => toggleFilter(domain)}
                    className={`text-[10px] px-2.5 py-1 rounded-full transition-all ${
                      activeFilter.includes(domain)
                        ? 'bg-violet-600 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {DOMAIN_LABELS[domain as ProjectDomain]}
                  </button>
                ))}
              </div>

              {/* Project Browser Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <AnimatePresence>
                  {filteredProjects.map(proj => {
                    const isSelected = selectedProjectIds.includes(proj.id);
                    const isFull = selectedProjectIds.length >= 3;
                    const projAts = calculateATSScore([proj], selectedRole);
                    return (
                      <motion.div
                        key={proj.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-violet-500/10 border-violet-500/40'
                            : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px]">{proj.status === 'active' ? '✅' : '🔄'}</span>
                            <span className="text-xs font-bold text-white leading-tight">{proj.title}</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-gray-400 italic font-mono mb-1 line-clamp-1">{proj.stack}</div>
                        <div className="text-[10px] text-gray-500 mb-2">{proj.date}</div>
                        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                            proj.priorityTier === 1 ? 'bg-green-500/20 text-green-400' :
                            proj.priorityTier === 2 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            Tier {proj.priorityTier}
                          </span>
                          {proj.domain.map(d => (
                            <span key={d} className="text-[9px] bg-white/5 text-gray-500 px-1.5 py-0.5 rounded-full">
                              {DOMAIN_LABELS[d]}
                            </span>
                          ))}
                        </div>
                        {/* ATS bar */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                projAts.score >= 90 ? 'bg-green-500' :
                                projAts.score >= 75 ? 'bg-yellow-500' :
                                'bg-orange-500'
                              }`}
                              style={{ width: `${projAts.score}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-gray-500">ATS: {projAts.score}%</span>
                        </div>
                        {/* Action Button */}
                        <button
                          onClick={() => isSelected ? removeProject(proj.id) : addProject(proj.id)}
                          disabled={!isSelected && isFull}
                          className={`w-full text-[10px] py-1 rounded-lg transition-all font-medium ${
                            isSelected
                              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                              : isFull
                              ? 'bg-white/3 text-gray-600 border border-white/5 cursor-not-allowed'
                              : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-500/30'
                          }`}
                        >
                          {isSelected ? '✓ Selected' : isFull ? 'Slots Full' : '+ Add'}
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Combined ATS Score Panel */}
            <div className="glass-card p-4 border border-white/10">
              <div className="text-[10px] text-gray-500 font-mono mb-2 uppercase tracking-wider">Combined ATS Score</div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-gray-400">
                  Selected: {selectedProjects.map(p => p.title.split(':')[0]).join(' + ')}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      atsResult.score >= 90 ? 'bg-green-500' :
                      atsResult.score >= 75 ? 'bg-yellow-500' :
                      'bg-orange-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${atsResult.score}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <span className={`text-lg font-bold font-mono ${
                  atsResult.score >= 90 ? 'text-green-400' :
                  atsResult.score >= 75 ? 'text-yellow-400' :
                  'text-orange-400'
                }`}>
                  {atsResult.score}%
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px]">
                <span className="text-gray-400">Matched: {atsResult.matched.length} key terms</span>
                {atsResult.missing.length > 0 && (
                  <span className="text-gray-500">Missing: {atsResult.missing.slice(0, 3).join(', ')}</span>
                )}
              </div>
            </div>

            {/* Export Animation Terminal */}
            {exportingLines.length > 0 && (
              <div className="glass-card p-4 border border-green-500/20 font-mono text-xs space-y-1">
                {exportingLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={line.includes('Done') ? 'text-green-400' : 'text-gray-400'}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Bottom Action Buttons */}
            <div className="flex items-center justify-center gap-4 py-4">
              <button
                onClick={handleCopyLatex}
                className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 hover:border-violet-500/30 text-gray-300 hover:text-violet-300 px-5 py-2.5 rounded-xl transition-all"
              >
                📋 {copied ? 'Copied!' : 'Copy LaTeX Code'}
              </button>
              <button
                onClick={handleOpenOverleaf}
                className="flex items-center gap-2 text-xs bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 text-green-400 px-5 py-2.5 rounded-xl transition-all"
              >
                🍃 Open in Overleaf
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 text-xs bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl transition-colors"
              >
                <Download size={14} />
                ⬇️ Export PDF
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
