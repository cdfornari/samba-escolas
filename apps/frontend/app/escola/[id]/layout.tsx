'use client';
import { TabContainer } from '../../../components/ui/TabContainer';
import { useEscolaTabs } from '../../../hooks/useEscolaTabs';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const tabs = useEscolaTabs(params.id);
  return (
    <>
      <TabContainer tabs={tabs} />
      {children}
    </>
  );
}
