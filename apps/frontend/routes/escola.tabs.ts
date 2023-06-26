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
    href: `/escola/${id}/integrantes`,
    active: pathname.includes('integrantes'),
  },
  {
    name: 'Titulos',
    href: `/escola/${id}/titulos`,
    active: pathname.includes('titulos'),
  },
  {
    name: 'Patrocinios',
    href: `/escola/${id}/sponsorships`,
    active: pathname.includes('sponsorships'),
  },
  {
    name: 'Sambas',
    href: `/escola/${id}/sambas`,
    active: pathname.includes('sambas'),
  },
];
