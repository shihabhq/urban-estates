import Advertisements from "./components/Advertisements";
import Agents from "./components/AgentsCard";
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
      <Agents />
    </div>
  );
};

export default Home;
