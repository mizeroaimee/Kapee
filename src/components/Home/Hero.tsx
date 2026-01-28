import PromoCard from "./PromoCard";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const heroImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTnVw-fsNtgGYLNmiS7dTZAuP6X2SoeHePJg&s",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto slide with interval
  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoplay]);

  // Manual navigation
  const goToPrev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToNext = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setAutoplay(false);
    setCurrent(index);
  };

  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">

      {/* MAIN HERO SLIDER */}
      <div 
        className="lg:col-span-2 relative h-[200px] sm:h-[300px] lg:h-[420px] rounded-lg overflow-hidden group"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        {/* Images with Carousel */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out
              ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}
            `}
            style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center p-3 sm:p-8 lg:p-10 text-white">
          <p className="text-xs sm:text-lg mb-1 sm:mb-2 font-semibold">New Collections 2019</p>

          <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4">
            Men's Fashion
          </h1>

          <p className="text-xs sm:text-sm lg:text-base mb-3 sm:mb-6 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor!
          </p>

          <button className="w-fit px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm border-2 border-white text-white font-bold hover:bg-white hover:text-black transition">
            SHOP NOW
          </button>
        </div>

        {/* Left Arrow */}
        <button
          onClick={goToPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-white p-2 sm:p-3 rounded-full transition opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={20} className="text-black" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-white p-2 sm:p-3 rounded-full transition opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <FiChevronRight size={20} className="text-black" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === current
                  ? "bg-white w-8 h-2"
                  : "bg-white/50 hover:bg-white/70 w-2 h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* PROMO CARDS */}
      <div className="flex flex-col gap-3 sm:gap-6">
        <PromoCard
          title="WHITE SNEAKERS"
          subtitle="Men Fashionable Shoes"
          discount="MIN. 30% OFF"
          image="data:image/jpeg;base64,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"
        />

        <PromoCard
          title="WOMEN'S FASHION"
          subtitle="Shoes & Backpacks"
          discount="UP TO 65% OFF"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipCrv2-VPpDBQY_DYhQRBCF0DRQwPP5UjpA&s"
        />
      </div>
    </section>
  );
};

export default Hero;

