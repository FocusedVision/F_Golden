import { SvgIconComponent } from '@mui/icons-material'

export interface NavItem {
  id: string
  label: string
  href: string
  icon: SvgIconComponent
  badge?: number
  children?: NavItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface RouteConfig {
  path: string
  title: string
  description?: string
  requiresAuth?: boolean
  roles?: string[]
} 