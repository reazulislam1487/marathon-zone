import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import ScrollToTop from "../Pages/Shared/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop></ScrollToTop>
      <nav>
        <Navbar></Navbar>
      </nav>
      <Outlet></Outlet>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default RootLayout;
