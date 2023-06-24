import {
  CurrencyDollarIcon,
  GlobeAltIcon,
  HomeIcon,
  TrophyIcon,
  UsersIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export const sidebarRoutes = (pathname: string) => [
  {
    name: 'Escolas',
    icon: HomeIcon,
    href: '/',
    active: pathname === '/' || pathname.includes('escola'),
  },
  {
    name: 'Integrantes',
    icon: UserIcon,
    href: '/integrantes',
    active: pathname.includes('integrantes'),
  },
  {
    name: 'Premios',
    icon: TrophyIcon,
    href: '/premios',
    active: pathname.includes('premios'),
  },
  {
    name: 'Roles',
    icon: UsersIcon,
    href: '/roles',
    active: pathname.includes('roles'),
  },
  {
    name: 'Patrocinadores',
    icon: CurrencyDollarIcon,
    href: '/sponsors',
    active: pathname.includes('sponsors'),
  },
  {
    name: 'Lugares',
    icon: GlobeAltIcon,
    href: '/places',
    active: pathname.includes('/places'),
  },
];
