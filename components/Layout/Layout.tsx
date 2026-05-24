import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import VerticalNav from "./VerticalNav/VerticalNav";

const Layout = ({ children }: { children: any }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      setMenuOpen(true);
    }
  }, []);
  return (
    <>
      <VerticalNav isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <div className="flex flex-col items-center pb-10 w-full px-5 sm:px-6">
        <div className="w-full max-w-2xl">
          <Nav isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
