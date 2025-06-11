import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
  persistent?: boolean;
}

export interface Modal {
  id: string;
  type: 'confirm' | 'form' | 'info' | 'custom';
  title: string;
  content?: string;
  component?: string;
  props?: any;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface UiState {
  // Layout and Navigation
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  
  // Loading states
  globalLoading: boolean;
  pageLoading: boolean;
  componentLoading: { [key: string]: boolean };
  
  // Notifications
  notifications: Notification[];
  maxNotifications: number;
  
  // Modals
  modals: Modal[];
  
  // Responsive design
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  // Theme and appearance
  theme: 'light' | 'dark' | 'system';
  density: 'comfortable' | 'compact' | 'spacious';
  
  // Page state
  pageTitle: string;
  breadcrumbs: BreadcrumbItem[];
  
  // Search and filters
  searchQuery: string;
  activeFilters: { [key: string]: any };
  
  // Data views
  viewMode: 'grid' | 'list' | 'card';
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  
  // Form states
  unsavedChanges: boolean;
  formErrors: { [key: string]: string };
  
  // Tour and onboarding
  showOnboarding: boolean;
  currentTourStep: number;
  tourActive: boolean;
  
  // Performance and error tracking
  errorBoundaries: { [key: string]: boolean };
  debugMode: boolean;
}

const initialState: UiState = {
  // Layout and Navigation
  sidebarOpen: true,
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  
  // Loading states
  globalLoading: false,
  pageLoading: false,
  componentLoading: {},
  
  // Notifications
  notifications: [],
  maxNotifications: 5,
  
  // Modals
  modals: [],
  
  // Responsive design
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  screenSize: 'lg',
  
  // Theme and appearance
  theme: 'light',
  density: 'comfortable',
  
  // Page state
  pageTitle: '',
  breadcrumbs: [],
  
  // Search and filters
  searchQuery: '',
  activeFilters: {},
  
  // Data views
  viewMode: 'grid',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  
  // Form states
  unsavedChanges: false,
  formErrors: {},
  
  // Tour and onboarding
  showOnboarding: false,
  currentTourStep: 0,
  tourActive: false,
  
  // Performance and error tracking
  errorBoundaries: {},
  debugMode: process.env.NODE_ENV === 'development',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Layout and Navigation
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    
    // Loading states
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    setPageLoading: (state, action: PayloadAction<boolean>) => {
      state.pageLoading = action.payload;
    },
    setComponentLoading: (state, action: PayloadAction<{ component: string; loading: boolean }>) => {
      state.componentLoading[action.payload.component] = action.payload.loading;
    },
    clearComponentLoading: (state, action: PayloadAction<string>) => {
      delete state.componentLoading[action.payload];
    },
    
    // Notifications
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: `notif-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        timestamp: Date.now(),
      };
      
      state.notifications.unshift(notification);
      
      // Remove oldest notifications if exceeding max
      if (state.notifications.length > state.maxNotifications) {
        state.notifications = state.notifications.slice(0, state.maxNotifications);
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.persistent) {
        state.notifications = state.notifications.filter(n => n.id !== action.payload);
      }
    },
    
    // Modals
    openModal: (state, action: PayloadAction<Omit<Modal, 'id'>>) => {
      const modal: Modal = {
        ...action.payload,
        id: `modal-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      };
      state.modals.push(modal);
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter(m => m.id !== action.payload);
    },
    closeAllModals: (state) => {
      state.modals = [];
    },
    
    // Responsive design
    setScreenSize: (state, action: PayloadAction<{ 
      isMobile: boolean; 
      isTablet: boolean; 
      isDesktop: boolean; 
      screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    }>) => {
      state.isMobile = action.payload.isMobile;
      state.isTablet = action.payload.isTablet;
      state.isDesktop = action.payload.isDesktop;
      state.screenSize = action.payload.screenSize;
      
      // Auto-collapse sidebar on mobile
      if (action.payload.isMobile) {
        state.sidebarOpen = false;
        state.sidebarCollapsed = true;
      }
    },
    
    // Theme and appearance
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setDensity: (state, action: PayloadAction<'comfortable' | 'compact' | 'spacious'>) => {
      state.density = action.payload;
    },
    
    // Page state
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setBreadcrumbs: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      state.breadcrumbs = action.payload;
    },
    addBreadcrumb: (state, action: PayloadAction<BreadcrumbItem>) => {
      state.breadcrumbs.push(action.payload);
    },
    
    // Search and filters
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveFilters: (state, action: PayloadAction<{ [key: string]: any }>) => {
      state.activeFilters = action.payload;
    },
    updateFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      if (action.payload.value === null || action.payload.value === undefined || action.payload.value === '') {
        delete state.activeFilters[action.payload.key];
      } else {
        state.activeFilters[action.payload.key] = action.payload.value;
      }
    },
    clearFilters: (state) => {
      state.activeFilters = {};
    },
    
    // Data views
    setViewMode: (state, action: PayloadAction<'grid' | 'list' | 'card'>) => {
      state.viewMode = action.payload;
    },
    setSorting: (state, action: PayloadAction<{ sortBy: string; sortOrder: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    
    // Form states
    setUnsavedChanges: (state, action: PayloadAction<boolean>) => {
      state.unsavedChanges = action.payload;
    },
    setFormErrors: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.formErrors = action.payload;
    },
    addFormError: (state, action: PayloadAction<{ field: string; error: string }>) => {
      state.formErrors[action.payload.field] = action.payload.error;
    },
    clearFormError: (state, action: PayloadAction<string>) => {
      delete state.formErrors[action.payload];
    },
    clearFormErrors: (state) => {
      state.formErrors = {};
    },
    
    // Tour and onboarding
    setShowOnboarding: (state, action: PayloadAction<boolean>) => {
      state.showOnboarding = action.payload;
    },
    startTour: (state) => {
      state.tourActive = true;
      state.currentTourStep = 0;
    },
    nextTourStep: (state) => {
      state.currentTourStep += 1;
    },
    prevTourStep: (state) => {
      if (state.currentTourStep > 0) {
        state.currentTourStep -= 1;
      }
    },
    setTourStep: (state, action: PayloadAction<number>) => {
      state.currentTourStep = action.payload;
    },
    endTour: (state) => {
      state.tourActive = false;
      state.currentTourStep = 0;
    },
    
    // Performance and error tracking
    setErrorBoundary: (state, action: PayloadAction<{ component: string; hasError: boolean }>) => {
      state.errorBoundaries[action.payload.component] = action.payload.hasError;
    },
    clearErrorBoundary: (state, action: PayloadAction<string>) => {
      delete state.errorBoundaries[action.payload];
    },
    setDebugMode: (state, action: PayloadAction<boolean>) => {
      state.debugMode = action.payload;
    },
    
    // Reset states
    resetPageState: (state) => {
      state.pageTitle = '';
      state.breadcrumbs = [];
      state.searchQuery = '';
      state.activeFilters = {};
      state.formErrors = {};
      state.unsavedChanges = false;
    },
    resetUiState: (state) => {
      return { ...initialState, theme: state.theme, density: state.density };
    },
  },
});

export const {
  // Layout and Navigation
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapsed,
  setSidebarCollapsed,
  toggleMobileMenu,
  setMobileMenuOpen,
  
  // Loading states
  setGlobalLoading,
  setPageLoading,
  setComponentLoading,
  clearComponentLoading,
  
  // Notifications
  addNotification,
  removeNotification,
  clearNotifications,
  markNotificationAsRead,
  
  // Modals
  openModal,
  closeModal,
  closeAllModals,
  
  // Responsive design
  setScreenSize,
  
  // Theme and appearance
  setTheme,
  setDensity,
  
  // Page state
  setPageTitle,
  setBreadcrumbs,
  addBreadcrumb,
  
  // Search and filters
  setSearchQuery,
  setActiveFilters,
  updateFilter,
  clearFilters,
  
  // Data views
  setViewMode,
  setSorting,
  
  // Form states
  setUnsavedChanges,
  setFormErrors,
  addFormError,
  clearFormError,
  clearFormErrors,
  
  // Tour and onboarding
  setShowOnboarding,
  startTour,
  nextTourStep,
  prevTourStep,
  setTourStep,
  endTour,
  
  // Performance and error tracking
  setErrorBoundary,
  clearErrorBoundary,
  setDebugMode,
  
  // Reset states
  resetPageState,
  resetUiState,
} = uiSlice.actions;

export default uiSlice.reducer; 