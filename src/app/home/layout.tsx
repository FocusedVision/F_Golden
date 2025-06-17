"use client";

import styles from "./layout.module.css";
import { useLayout } from "./useLayout";
import { Sidebar } from "@/components/home/sidebar";
import { RouteGuard } from "@/lib/features/auth/RouteGuard";
import { TopBar } from "@/components/home/topbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    sidebarOpen,
    sidebarCollapsed,
    profileMenuAnchor,
    isHydrated,
    isMobile,
    handleSidebarToggle,
    handleSidebarClose,
    handleProfileMenuOpen,
    handleProfileMenuClose,
  } = useLayout();

  return (
    <div className={styles.homePageLayout}>
      <Sidebar
        open={isHydrated ? sidebarOpen : false}
        collapsed={isHydrated ? sidebarCollapsed : false}
        onClose={handleSidebarClose}
        permanent={!isMobile}
        isMobile={isMobile}
      />

      <main
        className={`
          ${styles.mainContent} 
          ${
            sidebarOpen && !isMobile
              ? sidebarCollapsed
                ? styles.mainContentCollapsed
                : styles.mainContentShifted
              : ""
          }
        `}
      >
        <TopBar
          onSidebarToggle={handleSidebarToggle}
          onProfileMenuOpen={handleProfileMenuOpen}
          profileMenuAnchor={profileMenuAnchor}
          onProfileMenuClose={handleProfileMenuClose}
        />

        <div className={styles.pageContent}>
          <RouteGuard>{children}</RouteGuard>
        </div>
      </main>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div className={styles.mobileOverlay} onClick={handleSidebarClose} />
      )}
    </div>
  );
}
