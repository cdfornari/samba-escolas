'use client';
import { usePathname } from 'next/navigation';
import { TabContainer } from '../../components/ui/TabContainer';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();
  return (
    <>
      <TabContainer
        tabs={[
          {
            href: '/sponsors/juridicos',
            name: 'Jurídicos',
            active: pathname.includes('juridicos'),
          },
          {
            href: '/sponsors/naturales',
            name: 'Naturales',
            active: pathname.includes('naturales'),
          },
        ]}
      />
      {children}
    </>
  );
}
