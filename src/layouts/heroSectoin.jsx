import gsap from "gsap"
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react"

export default function HeroSection(){
    const scope = useRef(null);
    useLayoutEffect(()=>{
        const ctx = gsap.context(()=>{
        const split = new SplitText(".hero-animate-text");
        const tl = gsap.timeline()       
        .from(scope.current, {
            scale:2,
            delay:1.2,
            duration:1,
            ease:"power1.inOut"
        })
        .from(split.chars, {
            y: 40,
            opacity: 0,
            stagger: 0.02,
            duration: 0.1,
        })
        .to(".hero-animate-bg", {
            color:'white',
            duration:0.2
        })
        .to(".hero-animate-bg", {
                backgroundColor:"rgb(255, 179, 0)",
                duration:2
        }, "-=0.4")
        .to(".hero-animate-bg", {
            color:'black',
            duration:0.2
        })
        .to(".hero-animate-bg", {
            backgroundColor:"#D97706",
            duration:0.5
        })
        ;
        

        }, [scope]);

        return ()=> ctx.revert()
    })
    
    return  <section ref={scope} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/4489765/pexels-photo-4489765.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in hero-animate-text">
            Профессиональный <span className="text-amber-500 hero-animate-text">автосервис</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 hero-animate-text">
            Качественный ремонт и обслуживание вашего автомобиля
          </p>
          <button className="hero-animate-bg hero-animate-text hover:bg-amber-600 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
            Записаться на сервис
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>
}
