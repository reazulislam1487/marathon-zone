import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
  };

  const slides = [
    {
      img: "https://www.southernliving.com/thmb/110u4_Q7R-1Y8Juz6bX-RPPNer0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2119102_garla039-e59dd588deba4301a43515fcd0c213d3.jpg",
      heading: "Welcome to Your Green Home",
      subheading:
        "Discover smart tips and tools to grow a greener lifestyle—from your doorstep!",
      buttonText: "Get Started",
    },
    {
      img: "https://images.squarespace-cdn.com/content/v1/5dea42a80d60bb6675fdb54c/1619182116698-VM8JQZATNHI2DWZB2RYY/alaster-anderson-garden-design-planting-installation-garden-lighting.jpg?format=2500w",
      heading: "Join Our Growing Community",
      subheading:
        "Share your garden journey, get tips from others, and grow together with like-minded people.",
      buttonText: "Join Now",
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/038/345/095/non_2x/ai-generated-blurry-garden-house-scene-behind-an-empty-wooden-surface-setting-the-stage-for-product-displays-photo.jpeg",
      heading: "Easy Gardening Tips & Tools",
      subheading:
        "Explore seasonal tips and tools to make gardening joyful and simple.",
      buttonText: "Learn More",
    },
  ];

  return (
    <Slider className="mb-20 overflow-hidden " {...settings}>
      {slides.map((slide, index) => (
        <div key={index}>
          <div className="w-full h-[calc(100vh-5rem)] relative">
            <img
              className="w-full h-full object-cover brightness-90"
              src={slide.img}
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 flex items-center justify-center text-center text-white px-4">
              <div className="max-w-3xl space-y-6">
                <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg tracking-wide">
                  {slide.heading}
                </h2>
                <p className="text-lg md:text-xl drop-shadow-sm">
                  {slide.subheading}
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-full transition shadow-lg hover:shadow-xl hover:scale-105 duration-300">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};
export default SliderPage;
