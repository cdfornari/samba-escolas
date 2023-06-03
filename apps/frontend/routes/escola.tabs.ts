export const escolaTabs = (id: string, pathname: string) => [
  {
    name: 'Escola',
    href: `/escola/${id}`,
    active:
      !pathname.includes('integrantes') &&
      !pathname.includes('titulos') &&
      !pathname.includes('sponsorships'),
  },
  {
    name: 'Integrantes',
    href: `/${id}/integrantes`,
    active: pathname.includes('integrantes'),
  },
  {
    name: 'Titulos',
    href: `/${id}/titulos`,
    active: pathname.includes('titulos'),
  },
  {
    name: 'Patrocinios',
    href: `/${id}/sponsorships`,
    active: pathname.includes('sponsorships'),
  },
];
