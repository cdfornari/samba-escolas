import { AppWrapper } from '../components/ui/AppWrapper';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='h-screen'>
      <body className='h-full'>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
