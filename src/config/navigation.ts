import {
  Home,
  Analytics,
  People,
  Reviews,
  Campaign,
  Email,
  Feedback,
  Support,
} from '@mui/icons-material'
import { NavItem, RouteConfig } from '@/types/navigation'

export const navigationItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    id: 'reviews',
    label: 'Reviews',
    href: '/reviews',
    icon: Reviews,
  },
  {
    id: 'facilities',
    label: 'Facilities',
    href: '/facilities',
    icon: Reviews,
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    href: '/campaigns',
    icon: Campaign,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: Analytics,
  },


  {
    id: 'customers',
    label: 'Customers',
    href: '/customers',
    icon: People,
  },
  {
    id: 'es-templates',
    label: 'Email/SMS templates',
    href: '/es-templates',
    icon: Email,
  },
  {
    id: 'team-management',
    label: 'Team Management',
    href: '/team-management',
    icon: People,
  },
  {
    id: 'feedback',
    label: 'Feedback Submissions',
    href: '/feedback-submissions',
    icon: Feedback,
  },
  {
    id: 'review-management',
    label: 'Review Management',
    href: '/review-management',
    icon: Reviews,
  },
  {
    id: 'support',
    label: 'Support',
    href: '/support',
    icon: Support,
  },
  {
    id: 'audit-logs',
    label: 'Audit Logs',
    href: '/audit-logs',
    icon: Support,
  },
]

export const routeConfigs: RouteConfig[] = [
  {
    path: '',
    title: 'Home',
  },
  {
    path: '/reviews',
    title: 'Reviews',
  },
  {
    path: '/facilities',
    title: 'Facilities',
  },
  {
    path: '/campaigns',
    title: 'Campaigns',
  },
  {
    path: '/analytics',
    title: 'Analytics',
  },
  {
    path: '/customers',
    title: 'Customers',
  },
  {
    path: '/es-templates',
    title: 'Email/SMS templates',
  },
  {
    path: '/team-management',
    title: 'Team Management',
  },
  {
    path: '/feedback-submissions',
    title: 'Feedback Submissions',
  },
  {
    path: '/review-management',
    title: 'Review Management',
  },
  {
    path: '/support',
    title: 'Support',
  },
  {
    path: '/audit-logs',
    title: 'Audit Logs',
  },
] 