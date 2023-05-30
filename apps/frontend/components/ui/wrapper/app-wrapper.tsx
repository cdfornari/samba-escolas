import { Navbar } from './navbar/navbar';

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="-mt-32 mb-auto h-full max-h-screen">
        <div className="mx-8 px-4 pb-12 sm:px-6 lg:px-8 h-full">
          <div className="rounded-lg bg-blue-50 px-5 py-6 shadow sm:px-6 overflow-y-scroll h-[calc(100vh-300px)]">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};
