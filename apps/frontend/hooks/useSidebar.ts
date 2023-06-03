import { usePathname } from 'next/navigation';
import { sidebarRoutes } from '../routes';

export const useSidebar = () => {
  const pathname = usePathname();
  return sidebarRoutes(pathname);
};
