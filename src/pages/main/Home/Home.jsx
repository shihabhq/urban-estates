import Advertisements from "./components/Advertisements";
import Agents from "./components/AgentsCard";
import ContactForm from "./components/ContactHome";
import FeatureDevelopers from "./components/FeatureDevelopers";
import FeaturedProperties from "./components/FeaturedProperties";
import RecentReviews from "./components/RecentReviews";
import Slider from "./components/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Advertisements />
      <FeaturedProperties />
      <FeatureDevelopers />
      <RecentReviews />
      <Agents />
      <ContactForm />
    </div>
  );
};

export default Home;
