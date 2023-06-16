import React from 'react';
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import "./Layout.scss"


const Layout = () => {
  return (
    <div className={"layout"}>
      <header className={"header"}>Header: exemple-use-firebase </header>
      <div className={"wrapMain"}>
        <nav className={"nav"}>
          <NavLink to={"/"}>Home</NavLink>
        </nav>
        <main className={"main"}>
          <Outlet/>
        </main>
      </div>
      <footer className={"footer"}>2023 - footer</footer>
    </div>
  );
};

export default Layout;