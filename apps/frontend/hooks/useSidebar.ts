import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  TrophyIcon,
  UsersIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

export const useSidebar = () => {
  const pathname = usePathname();
  return [
    { name: 'Escolas', icon: HomeIcon, href: '/', active: pathname === '/' },
    {
      name: 'Premios',
      icon: TrophyIcon,
      href: '/premios',
      active: pathname.includes('/premios'),
    },
    {
      name: 'Roles',
      icon: UsersIcon,
      href: '/roles',
      active: pathname.includes('/roles'),
    },
    {
      name: 'Patrocinadores',
      icon: CurrencyDollarIcon,
      href: '/sponsors',
      active: pathname.includes('/sponsors'),
    },
    {
      name: 'Lugares',
      icon: GlobeAltIcon,
      href: '/places',
      active: pathname.includes('/places'),
    },
  ];
};
