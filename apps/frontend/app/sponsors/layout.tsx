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
            active: pathname === '/sponsors/juridicos',
          },
          {
            href: '/sponsors/naturales',
            name: 'Naturales',
            active: pathname === '/sponsors/naturales',
          },
        ]}
      />
      {children}
    </>
  );
}
