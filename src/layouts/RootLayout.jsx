import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const RootLayout = () => {
  return (
    <section>
      <nav>
        <Navbar></Navbar>
      </nav>
      <Outlet></Outlet>
      <footer>
        <Footer></Footer>
      </footer>
    </section>
  );
};

export default RootLayout;
