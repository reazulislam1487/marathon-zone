import React from "react";

import Banner from "./Banner";
import SliderPage from "../Shared/SliderPage";
import MarathonEvents from "./Marathonevents";
import MarathonsSection from "./MarathonsSection";
import WhyJoinSection from "./WhyJoinSection";
import usePageTitle from "../../hooks/usePageTitle";
import FAQSection from "./FAQSection";
const Home = () => {
  usePageTitle("Home");

  return (
    <main>
      <SliderPage></SliderPage>
      <div className="max-w-screen-xl mx-auto">
        <MarathonsSection></MarathonsSection>
        <Banner></Banner>
        <MarathonEvents></MarathonEvents>
        <FAQSection></FAQSection>
        <WhyJoinSection></WhyJoinSection>
      </div>
    </main>
  );
};

export default Home;
