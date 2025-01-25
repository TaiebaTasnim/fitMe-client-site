import { Helmet } from "react-helmet";
import AboutUs from "../Components/Home/AboutUs";
import Banner from "../Components/Home/Banner";
import FeaturedClasses from "../Components/Home/FeaturedClasses";
import Features from "../Components/Home/Features";
import NewsletterSection from "../Components/Home/NewsletterSection";
import RecentForums from "../Components/Home/RecentForums";
import TeamSection from "../Components/Home/TeamSection";
import Testimonials from "./PublicPage/Testimonials";


const Home = () => {
      return (
            <div>
                  <Helmet><title>FitMe | Home</title></Helmet>
                  <Banner></Banner>
                  <Features></Features>
                  <AboutUs></AboutUs>
                  <FeaturedClasses></FeaturedClasses>
                  <TeamSection></TeamSection>
                  <RecentForums></RecentForums>
                  <Testimonials></Testimonials>
                  <NewsletterSection></NewsletterSection>
                  
            </div>
      );
};

export default Home;