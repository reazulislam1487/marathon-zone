import React from "react";

import Banner from "./Banner";
import SliderPage from "../Shared/SliderPage";
import MarathonEvents from "./Marathonevents";
import MarathonsSection from "./MarathonsSection";
const Home = () => {
  return (
    <div>
      <SliderPage></SliderPage>
      <div className="max-w-screen-xl mx-auto">
        <Banner></Banner>
        <MarathonsSection></MarathonsSection>
        <MarathonEvents></MarathonEvents>
      </div>
    </div>
  );
};

export default Home;
