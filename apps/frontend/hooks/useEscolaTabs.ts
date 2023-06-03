import { usePathname } from 'next/navigation';
import { escolaTabs } from '../routes';

export const useEscolaTabs = (id: string) => {
  const pathname = usePathname();
  return escolaTabs(id, pathname);
};
