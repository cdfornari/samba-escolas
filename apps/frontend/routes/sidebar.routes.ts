import {
  CurrencyDollarIcon,
  GlobeAltIcon,
  HomeIcon,
  TrophyIcon,
  UsersIcon,
  UserIcon,
  StarIcon,
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
    active: pathname.includes('integrantes') && !pathname.includes('escola'),
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
    name: 'Habilidades',
    icon: StarIcon,
    href: '/habilidades',
    active: pathname.includes('habilidades'),
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
