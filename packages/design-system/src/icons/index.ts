'use client';

import type { Icon } from '@tabler/icons-react';

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

// Type for all Tabler icon components
export type IconProps = React.ComponentProps<Icon>;
