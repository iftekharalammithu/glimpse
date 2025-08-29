import React, { ReactNode } from "react";
import LandingPageNavbar from "./_Components/LandingPageNavbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex flex-col py-10 px-10 xl:px-2 xl:py-2 container">
      {/* <LandingPageNavbar></LandingPageNavbar> */}
      {children}
    </div>
  );
};

export default layout;
