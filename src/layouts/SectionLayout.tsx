import { ReactNode } from "react";

const SectionLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="lg:max-w-[110 rem] lg:min-w-screen  mx-auto px-[2.9rem] lg:px-0">
      {children}
    </main>
  );
};

export default SectionLayout;
