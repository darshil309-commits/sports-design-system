import React from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Search,
  ListFilter,
  Home,
  Trophy,
  Newspaper,
  Heart,
  MoreHorizontal,
  Bell,
  CalendarDays,
  Play,
  Pause,
  Share2,
  Info,
  Star,
  Menu,
  Clock,
  User,
  Users,
  Radio,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Video,
  Settings,
  AlertCircle,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react-native';
import { iconSizes, colors, type IconSizeKey } from '../../tokens';

/**
 * Semantic icon registry. Components should ask for `<Icon name="arrowRight" />`
 * rather than importing lucide-react-native directly — keeps the underlying
 * icon set swappable in one place and keeps the visual language consistent
 * (geometric, stroke-based, no filled/cute glyphs).
 */
const registry = {
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowUpRight: ArrowUpRight,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  close: X,
  check: Check,
  search: Search,
  filter: ListFilter,
  home: Home,
  matches: Trophy,
  news: Newspaper,
  following: Heart,
  more: MoreHorizontal,
  bell: Bell,
  calendar: CalendarDays,
  play: Play,
  pause: Pause,
  share: Share2,
  info: Info,
  star: Star,
  menu: Menu,
  clock: Clock,
  user: User,
  users: Users,
  live: Radio,
  trendUp: TrendingUp,
  trendDown: TrendingDown,
  neutral: Minus,
  venue: MapPin,
  video: Video,
  settings: Settings,
  alert: AlertCircle,
  success: CheckCircle2,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

export interface IconProps {
  name: IconName;
  size?: IconSizeKey | number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 'md', color = colors.text.primary, strokeWidth = 2 }: IconProps) {
  const Cmp = registry[name];
  const resolvedSize = typeof size === 'number' ? size : iconSizes[size];
  return <Cmp size={resolvedSize} color={color} strokeWidth={strokeWidth} />;
}
