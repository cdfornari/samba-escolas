import { AppWrapper } from '../components/ui/wrapper/app-wrapper';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="max-h-screen bg-carnival_yellow overflow-y-hidden">
      <body className="h-full">
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
