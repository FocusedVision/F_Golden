import {
  Home,
  People,
  ReviewsOutlined,
  Campaign,
  Email,
  Feedback,
  Support,
  Settings,
  Logout,
  GridView,
  Assessment,
} from "@mui/icons-material";
import { NavItem, RouteConfig } from "@/types/homeLayout";

export const navigationItems1: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/home",
    icon: Home,
  },
  {
    id: "reviews",
    label: "Reviews",
    href: "/reviews",
    icon: ReviewsOutlined,
  },
  {
    id: "facilities",
    label: "Facilities",
    href: "/facilities",
    icon: GridView,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    href: "/campaigns",
    icon: Campaign,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: Assessment,
  },
];

export const navigationItems2: NavItem[] = [
  {
    id: "customers",
    label: "Customers",
    href: "/customers",
    icon: People,
  },
  {
    id: "es-templates",
    label: "Email/SMS templates",
    href: "/es-templates",
    icon: Email,
  },
  {
    id: "team-management",
    label: "Team Management",
    href: "/team-management",
    icon: People,
  },
  {
    id: "feedback",
    label: "Feedback Submissions",
    href: "/feedback-submissions",
    icon: Feedback,
  },
  {
    id: "review-management",
    label: "Review Management",
    href: "/review-management",
    icon: ReviewsOutlined,
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    icon: Support,
  },
  {
    id: "audit-logs",
    label: "Audit Logs",
    href: "/audit-logs",
    icon: Support,
  },
];

export const navigationItems3: NavItem[] = [
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    id: "logout",
    label: "Logout",
    href: "/logout",
    icon: Logout,
  },
];

export const routeConfigs: RouteConfig[] = [
  {
    path: "",
    title: "Home",
  },
  {
    path: "/reviews",
    title: "Reviews",
  },
  {
    path: "/facilities",
    title: "Facilities",
  },
  {
    path: "/campaigns",
    title: "Campaigns",
  },
  {
    path: "/analytics",
    title: "Analytics",
  },
  {
    path: "/customers",
    title: "Customers",
  },
  {
    path: "/es-templates",
    title: "Email/SMS templates",
  },
  {
    path: "/team-management",
    title: "Team Management",
  },
  {
    path: "/feedback-submissions",
    title: "Feedback Submissions",
  },
  {
    path: "/review-management",
    title: "Review Management",
  },
  {
    path: "/support",
    title: "Support",
  },
  {
    path: "/audit-logs",
    title: "Audit Logs",
  },
];
