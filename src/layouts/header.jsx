import gsap from "gsap";
import { Menu, Wrench, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/switchLanguage";
import { Link } from "react-scroll";
export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t, i18n } = useTranslation();
    const scope = useRef(null);

    useLayoutEffect(()=>{
        const ctx = gsap.context(()=>{
            const tl = gsap.timeline();
            tl.from('.header-text-animate', {
                y:-30,
                opacity:0,
                duration:1.5,
                stagger:0.1,
                ease:"power1.inOut"
            })
            .to(".header-bg-animate", {
                color:'white',
                duration:0.5
            })
            .to(".header-bg-animate", {
                backgroundColor:"rgb(255, 179, 0)",
                duration:1
            })
              .to(".header-bg-animate", {
                color:'black',
                duration:0.5
            }, "-=0.3")
        

        }, [scope]);
        
        return ()=>ctx.revert();
    })

    
    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    return  <header
            ref={scope}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              scrolled ? 'bg-zinc-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}
          >
            <nav className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wrench className="w-8 h-8 text-amber-500" />
                  <span className="text-2xl font-bold tracking-tight header-text-animate">AutoPro</span>
                </div>
    
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link
                    className="hover:text-amber-500 transition-colors cursor-pointer header-text-animate"
                    to="services"
                    smooth={true}
                    duration={600}
                    offset={-50}
                  >
                  { t("nav.services") }
                  </Link>
                  <Link
                    className="hover:text-amber-500 transition-colors cursor-pointer header-text-animate"
                    to="aboutUs"
                    smooth={true}
                    duration={600}
                    offset={-50}
                  >
                   {t("nav.about")}
                  </Link>
                  <Link
                    className="hover:text-amber-500 transition-colors cursor-pointer header-text-animate"
                    to="contact" 
                    smooth={true}
                    duration={600}
                    offset={-50}
                  >
                    {t("nav.contact")} 
                  </Link>
                  <Link        
                  to="contact" 
                    smooth={true}
                    duration={600}
                    offset={-50}>
                  <button className="hover:bg-amber-600 header-text-animate
                   text-black px-6 py-2 rounded-lg font-semibold transition-colors header-bg-animate">
                    Записаться
                  </button>      
                  </Link>
            
                  <LanguageSwitcher/>
                </div>
    
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
    
              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="md:hidden mt-4 pb-4 space-y-4">
                  <a href="#services" className="block hover:text-amber-500 transition-colors header-text-animate">Услуги</a>
                  <a href="#about" className="block hover:text-amber-500 transition-colors header-text-animate">О нас</a>
                  <a href="#contact" className="block hover:text-amber-500 transition-colors header-text-animate">Контакты</a>
                  <button className="w-full bg-amber-500 hover:bg-amber-600 !text-white
                  header-text-animate px-6 py-2 rounded-lg font-semibold transition-colors">
                    Записаться
                  </button>
                </div>
              )}
            </nav>
          </header>
}