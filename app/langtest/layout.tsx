import React, { ReactNode } from "react";

interface LangtestLayoutProps {
  children: ReactNode;
}

const LangtestLayout: React.FC<LangtestLayoutProps> = ({ children }) => {
  return <main className="container mx-auto">{children}</main>;
};

export default LangtestLayout;
