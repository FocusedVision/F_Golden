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
    href: "/home/reviews",
    icon: ReviewsOutlined,
  },
  {
    id: "facilities",
    label: "Facilities",
    href: "/home/facilities",
    icon: GridView,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    href: "/home/campaigns",
    icon: Campaign,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/home/analytics",
    icon: Assessment,
  },
];

export const navigationItems2: NavItem[] = [
  {
    id: "customers",
    label: "Customers",
    href: "/home/customers",
    icon: People,
  },
  {
    id: "es-templates",
    label: "Email/SMS templates",
    href: "/home/es-templates",
    icon: Email,
  },
  {
    id: "team-management",
    label: "Team Management",
    href: "/home/team-management",
    icon: People,
  },
  {
    id: "feedback",
    label: "Feedback Submissions",
    href: "/home/feedbackSubmission",
    icon: Feedback,
  },
  {
    id: "review-management",
    label: "Review Management",
    href: "/home/reviewManagement",
    icon: ReviewsOutlined,
  },
  {
    id: "support",
    label: "Support",
    href: "/home/support",
    icon: Support,
  },
  {
    id: "audit-logs",
    label: "Audit Logs",
    href: "/home/audit-logs",
    icon: Support,
  },
];

export const navigationItems3: NavItem[] = [
  {
    id: "settings",
    label: "Settings",
    href: "/home/settings",
    icon: Settings,
  },
  {
    id: "logout",
    label: "Logout",
    href: "/home/logout",
    icon: Logout,
  },
];

export const routeConfigs: RouteConfig[] = [
  {
    path: "",
    title: "Home",
  },
  {
    path: "/home/reviews",
    title: "Reviews",
  },
  {
    path: "/home/facilities",
    title: "Facilities",
  },
  {
    path: "/home/campaigns",
    title: "Campaigns",
  },
  {
    path: "/home/analytics",
    title: "Analytics",
  },
  {
    path: "/home/customers",
    title: "Customers",
  },
  {
    path: "/home/es-templates",
    title: "Email/SMS templates",
  },
  {
    path: "/home/team-management",
    title: "Team Management",
  },
  {
    path: "/home/feedback-submissions",
    title: "Feedback Submissions",
  },
  {
    path: "/home/reviewManagement",
    title: "Review Management",
  },
  {
    path: "/home/support",
    title: "Support",
  },
  {
    path: "/home/audit-logs",
    title: "Audit Logs",
  },
];
