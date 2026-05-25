'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppStore {
  bootComplete: boolean;
  setBootComplete: (val: boolean) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  notificationCount: number;
  incrementNotification: () => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (val: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  musicPlaying: boolean;
  setMusicPlaying: (val: boolean) => void;

  // Resume Editor State (persisted)
  isEditModeOpen: boolean;
  selectedRole: string;
  selectedProjectIds: string[];
  customRoleTitle: string;
  activeFilter: string[];
  isPreviewOpen: boolean;
  isExporting: boolean;

  // Resume Actions
  openEditMode: () => void;
  closeEditMode: () => void;
  setSelectedRole: (role: string) => void;
  applySuggestedCombo: (projectIds: [string, string, string]) => void;
  addProject: (projectId: string) => void;
  removeProject: (projectId: string) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;
  setCustomRoleTitle: (title: string) => void;
  toggleFilter: (domain: string) => void;
  clearFilters: () => void;
  openPreview: () => void;
  closePreview: () => void;
  setIsExporting: (val: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      bootComplete: false,
      setBootComplete: (val) => set({ bootComplete: val }),

      theme: 'dark',
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme);
        }
        return { theme: newTheme };
      }),

      notificationCount: 88,
      incrementNotification: () => set((state) => ({ notificationCount: state.notificationCount + 1 })),
      notificationsOpen: false,
      setNotificationsOpen: (val) => set({ notificationsOpen: val }),

      currentPage: '/',
      setCurrentPage: (page) => set({ currentPage: page }),

      musicPlaying: false,
      setMusicPlaying: (val) => set({ musicPlaying: val }),

      // Resume Editor State
      isEditModeOpen: false,
      selectedRole: 'Full Stack (Current Live)',
      selectedProjectIds: ['focus-flow-ai', 'smart-city-traffic', 'ecommerce-compliance'],
      customRoleTitle: 'Full Stack Developer · Backend Systems · AI Integration · Published IEEE Researcher',
      activeFilter: [],
      isPreviewOpen: false,
      isExporting: false,

      // Resume Actions
      openEditMode: () => set({ isEditModeOpen: true }),
      closeEditMode: () => set({ isEditModeOpen: false, isPreviewOpen: false }),
      setSelectedRole: (role) => set({ selectedRole: role }),
      applySuggestedCombo: (projectIds) => set({ selectedProjectIds: [...projectIds] }),
      addProject: (projectId) => set((state) => {
        if (state.selectedProjectIds.length >= 3) return state;
        if (state.selectedProjectIds.includes(projectId)) return state;
        return { selectedProjectIds: [...state.selectedProjectIds, projectId] };
      }),
      removeProject: (projectId) => set((state) => ({
        selectedProjectIds: state.selectedProjectIds.filter(id => id !== projectId),
      })),
      reorderProjects: (fromIndex, toIndex) => set((state) => {
        const ids = [...state.selectedProjectIds];
        const [moved] = ids.splice(fromIndex, 1);
        ids.splice(toIndex, 0, moved);
        return { selectedProjectIds: ids };
      }),
      setCustomRoleTitle: (title) => set({ customRoleTitle: title }),
      toggleFilter: (domain) => set((state) => {
        const filters = state.activeFilter.includes(domain)
          ? state.activeFilter.filter(d => d !== domain)
          : [...state.activeFilter, domain];
        return { activeFilter: filters };
      }),
      clearFilters: () => set({ activeFilter: [] }),
      openPreview: () => set({ isPreviewOpen: true }),
      closePreview: () => set({ isPreviewOpen: false }),
      setIsExporting: (val) => set({ isExporting: val }),
    }),
    {
      name: 'subhashos-store',
      partialize: (state) => ({
        selectedRole: state.selectedRole,
        selectedProjectIds: state.selectedProjectIds,
        customRoleTitle: state.customRoleTitle,
      }),
    }
  )
);
