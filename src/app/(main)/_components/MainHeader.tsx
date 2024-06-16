import React from "react";

const MainHeader = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-bold text-6xl mb-8 mx-auto text-center">{children}</h2>;
};

export default MainHeader;
