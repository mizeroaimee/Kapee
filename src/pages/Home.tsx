import Hero from "../components/Home/Hero";
import CategoryCarousel from "../components/Home/CategoryCarousel";
import FeaturedProducts from "../components/Home/featuredproducts";
import MenFashion from "../components/Home/MenFashion";
import WomenFashion from "../components/Home/WomenFashion";


const Home = () => {
  return (
    <>
      <Hero />
      <CategoryCarousel />
      <FeaturedProducts />
      <MenFashion />
      <WomenFashion />
    </>
  );
};

export default Home;
