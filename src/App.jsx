import { useLayoutEffect } from 'react';
import OurService from './pages/OurService.jsx'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from 'gsap';
import AboutUs from './pages/aboutUs.jsx';
import HeroSection from './layouts/heroSectoin.jsx';
import Header from './layouts/header.jsx';
import Footer from './layouts/footer.jsx';
import Reviews from './layouts/reviews.jsx';
import MapWithDirections from './layouts/map.jsx';
import Calculate from './pages/calculate.jsx';
import Contacts from './layouts/contacts.jsx';


function App() {



useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const ctx = gsap.context(() => {
    ScrollSmoother.create({
      wrapper: "#wrapper-block",
      content: "#wrapper-content",
      smooth: 3,
      smoothTouch: 0.1,
      effects: true
    });
  });

  return () => ctx.revert(); // <--- обязательно!
}, []);





  return (

    <div className="min-h-screen text-white" id='wrapper-block'>
      <div id='wrapper-content'>

      <Header/>

      <HeroSection/>
      
      <OurService/>
        
      <AboutUs/>

      <MapWithDirections
        lat={51.1605}
        lng={71.4704}
        name="Мой Магазин"
        address="Улица Примерная, 5, Алматы"
        zoom={16}
      />

      <Reviews/>

      <Contacts/>

      <Footer/>
    

    
      </div>
      
    </div>
  
);
}

export default App;
