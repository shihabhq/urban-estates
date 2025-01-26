import FeaturedProperties from "./components/FeaturedProperties";
import RecentReviews from "./components/RecentReviews";
import Slider from "./components/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProperties />
      <RecentReviews />
    </div>
  );
};

export default Home;
