import Nav from "@components/Footer";
import Footer from "@components/Nav";
import { ReactNode } from "react";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // max-w-[110rem]
    <main className="min-h-screen  p-[2.5rem] flex flex-col gap-4 bg-[linear-gradient(180deg,_#E2F6FC_14.25%,_rgba(255,255,255,0)_100%)] ">
      <Nav />
      {children}
      <Footer />
    </main>
  );
};

export default MainLayout;
