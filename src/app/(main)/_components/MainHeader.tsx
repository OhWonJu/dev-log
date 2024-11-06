import React from "react";

const MainHeader = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-bold text-8xl mb-6 mx-auto text-center">{children}</h2>;
};

export default MainHeader;
