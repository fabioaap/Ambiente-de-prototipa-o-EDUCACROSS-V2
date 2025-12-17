'use client';

// Re-export Tabler icons with our naming convention
export {
  IconDashboard,
  IconChartBar as IconChart,
  IconFlag,
  IconBook,
  IconCalendar,
  IconBook2 as IconReading,
  IconClipboardList as IconRegister,
  IconDownload,
  IconUser,
  IconShoppingCart as IconSales,
  IconCurrencyDollar as IconMoney
} from '@tabler/icons-react';

// Simple icon props type based on common props
export interface IconProps {
  size?: number | string;
  color?: string;
  stroke?: number;
  className?: string;
  style?: React.CSSProperties;
}
