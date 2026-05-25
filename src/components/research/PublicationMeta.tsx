'use client';
import { ExternalLink, MapPin, Calendar, Hash } from 'lucide-react';
import { ResearchPaper } from '@/data/research';

export function PublicationMeta({ paper }: { paper: ResearchPaper }) {
  const metaItems = [
    { label: 'Conference', value: paper.conference, icon: '🏛️' },
    { label: 'Date of Conference', value: paper.dates, icon: '📅' },
    ...(paper.dateAddedIEEE ? [{ label: 'Date Added to IEEE Xplore', value: paper.dateAddedIEEE, icon: '📋' }] : []),
    { label: 'ISBN Information', value: '—', icon: '#️⃣' },
    { label: 'DOI', value: paper.doi, icon: '🔗', href: paper.doiUrl },
    { label: 'Conference Location', value: paper.location, icon: '📍' },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
      {/* Published in */}
      <div className="glass-card p-4">
        <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Published in:</div>
        <div className="text-xs text-gray-300 leading-relaxed font-medium">{paper.conferenceFull}</div>
      </div>

      {/* Metadata list */}
      <div className="glass-card p-4">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">Publication Details</div>
        <div className="space-y-3">
          {metaItems.map(({ label, value, icon, href }) => (
            <div key={label} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
              <span className="text-xs mt-0.5">{icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-gray-500 mb-0.5">{label}</div>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-violet-400 hover:text-violet-300 hover:underline transition-colors break-all"
                  >
                    {value}
                  </a>
                ) : (
                  <div className="text-xs text-gray-300 break-all">{value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Button */}
      {paper.pdfUrl && (
        <a
          href={paper.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-violet-500/50
            text-violet-400 hover:bg-violet-500/10 transition-colors text-sm font-medium"
        >
          📄 View PDF on IEEE
        </a>
      )}

      {/* Award badge + Certificate */}
      {paper.award && (
        <div className="glass-card p-4 border border-yellow-500/20 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="text-xs font-bold text-yellow-400">{paper.award}</div>
              <div className="text-[10px] text-gray-500">{paper.conference} · {paper.year}</div>
            </div>
          </div>
          {paper.certificateUrl && (
            <a
              href={paper.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-yellow-500/40
                text-yellow-400 hover:bg-yellow-500/10 transition-colors text-xs font-medium"
            >
              🎖️ View Certificate
            </a>
          )}
        </div>
      )}
    </div>
  );
}
