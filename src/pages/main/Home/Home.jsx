import Advertisements from "./components/Advertisements";
import FeaturedProperties from "./components/FeaturedProperties";
import RecentReviews from "./components/RecentReviews";
import Slider from "./components/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Advertisements />
      <FeaturedProperties />
      <RecentReviews />
    </div>
  );
};

export default Home;
