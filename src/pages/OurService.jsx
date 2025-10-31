
import { useRef, useState } from "react";
import {ServiceCard} from "../components/serviceCard.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CircleDot, Droplets, Gauge, Settings, Wrench } from "lucide-react";
import { Element } from "react-scroll";

export default function OurService(){

const scope = useRef(null);

const germanServices = [
  {
    icon: Wrench,
    title: "Диагностика",
    description: "Компьютерная диагностика для BMW, Mercedes, Audi, Volkswagen",
    price: "2 500 ₽",
    features: [
      "Полная диагностика двигателя",
      "Проверка электронных систем",
      "Выявление скрытых ошибок"
    ]
  },
  {
    icon: Settings,
    title: "Ремонт двигателя",
    description: "Профессиональный ремонт немецких двигателей",
    price: "15 000 ₽",
    features: [
      "Ремонт цилиндров и поршней",
      "Замена изношенных деталей",
      "Настройка двигателя после ремонта",
      "Тестирование на стенде"
    ]
  },
  {
    icon: Gauge,
    title: "ТО Premium",
    description: "Полное техническое обслуживание по регламенту",
    price: "8 500 ₽",
    features: [
      "Смена масла и фильтров",
      "Проверка всех жидкостей",
      "Тест всех систем автомобиля",
      "Обновление ПО и диагностика ECU"
    ]
  },
  {
    icon: Gauge,
    title: "ТО Premium",
    description: "Полное техническое обслуживание по регламенту",
    price: "8 500 ₽",
    features: [
      "Смена масла и фильтров",
      "Проверка тормозной системы",
      "Диагностика подвески",
      "Проверка электрооборудования"
    ]
  },
  {
    icon: CircleDot,
    title: "Тормозная система",
    description: "Замена колодок, дисков, прокачка",
    price: "5 000 ₽",
    features: [
      "Замена тормозных колодок",
      "Ремонт и замена дисков",
      "Прокачка тормозной системы",
      "Контроль эффективности торможения"
    ]
  },

];

const otherServices = [
  {
    icon: Wrench,
    title: "Диагностика OBD-II",
    description: "Компьютерная диагностика всех марок",
    price: "1 500 ₽",
    features: [
      "Считывание кодов ошибок",
      "Проверка работы двигателя и КПП",
      "Контроль электронных систем"
    ]
  },
  {
    icon: Droplets,
    title: "Замена масла",
    description: "Замена масла и фильтров",
    price: "2 000 ₽",
    features: [
      "Слив старого масла",
      "Замена масляного фильтра",
      "Заливка нового масла",
      "Проверка давления и уровней"
    ]
  },
  {
    icon: Gauge,
    title: "ТО Стандарт",
    description: "Комплексное техническое обслуживание",
    price: "5 500 ₽",
    features: [
      "Замена расходников",
      "Проверка подвески и тормозов",
      "Диагностика электрооборудования"
    ]
  },
  {
    icon: Gauge,
    title: "ТО Premium",
    description: "Полное техническое обслуживание по регламенту",
    price: "8 500 ₽",
    features: [
      "Полная диагностика всех систем",
      "Замена масла и фильтров",
      "Проверка тормозной системы",
      "Обновление ПО автомобиля"
    ]
  },

];


const [activeTab, setActiveTab] = useState("german");


/*
const [active, setActive] = useState(false);

const sidebarItems = [
  {
    title: "I work",
    text: "Собираю код, чиню баги, пью кофе. Иногда в обратном порядке."
  },
  {
    title: "I learn",
    text: "Понимаю, что чем больше учусь — тем больше всего не знаю. Но уже не страшно."
  },
  {
    title: "I refactor",
    text: "Код был чудовищем, а стал красавцем. Иногда наоборот, но мы это не обсуждаем."
  },
  {
    title: "I optimize",
    text: "Каждый килобайт важен. Даже тот, что я съел на завтрак."
  },
  {
    title: "I chill",
    text: "Когда всё задеплоилось без ошибок, можно наконец-то выдохнуть… и снова деплойнуть."
  }
];
const handleClick = (e) => {
  const card = e.currentTarget;
  const isActive = card.dataset.active === "true";
  const allCards = document.querySelectorAll(".our-service-card"); // <-- все карточки


  const tl = gsap.timeline()
  .to('.svg-block-service', {
    display:'block'
  })
  .to(card, {
    x:50,
    opacity:0,
    duration: 0.2,
    ease: "power3.out",
  })

  .to(".our-service-text-title", {
    y: isActive ? 0 : -100,
    opacity: isActive ? 1 : 0,
    duration: 1,
    stagger: 0.2,
  }, "-=0.5")
  .to(".our-service-text", {
    y: isActive ? -100 : 0,
    opacity: isActive ? 0 : 1,
    duration: 1,
    stagger: 0.2,
  }, "-=0.5")
  .to('.service-cards-block', {
    display:"none"
  }, "-=1");
 
  
  
  // Исчезновение остальных карточек
  allCards.forEach((c) => {
    if (c !== card) {
      gsap.to(c, {
        opacity: isActive ? 1 : 0, // скрыть, если активируем, показать, если деактивируем
        duration: 0.6,
        ease: "power2.out",
      });
    }
  });
    setActive(!isActive); 


  card.dataset.active = !isActive;
};

  const germanServices = [
    "Компьютерная диагностика всех систем",
    "Техническое обслуживание по регламенту производителя",
    "Ремонт двигателя и трансмиссии",
    "Работа с электронными системами и датчиками",
    "Замена масла и технических жидкостей",
    "Ремонт подвески и рулевого управления",
    "Установка оригинальных запчастей",
  ];

  const otherServices = [
    "Полная диагностика автомобиля",
    "Плановое ТО всех марок и моделей",
    "Ремонт ходовой части",
    "Замена расходников и запчастей",
    "Электрика и электроника",
    "Кузовной ремонт и покраска",
    "Шиномонтаж и балансировка",
  ];


useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {

    const tl = gsap.timeline({
        scrollTrigger:{
            trigger:scope.current,
            start:"top top", 
            end:"+=200",
            pin:true,
            scrub:true
        }
    })
    .to(scope.current, {
        zIndex:100
    })

  }, scope);

  return () => ctx.revert();
}, []);

const carCards = [
  {
    id: 1,
    title: "Немецкий автопром",
    description: "Премиум качество и инновации",
    img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: 2,
    title: "Остальные марки",
    description: "Широкий выбор автомобилей",
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];
*/

return (
      <Element name="services">
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Наши услуги</h2>
            <p className="text-lg text-muted-foreground">
              Выберите категорию автомобиля для просмотра специализированных услуг
            </p>
          </div>

          <Tabs defaultValue="german" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-14 bg-card border border-border">
              <TabsTrigger 
                value="german" 
                className="text-base data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                Немецкие авто
              </TabsTrigger>
              <TabsTrigger 
                value="other"
                className="text-base data-[state=active]:bg-gradient-secondary data-[state=active]:text-primary-foreground"
              >
                Другие марки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="german" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {germanServices.map((service, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ServiceCard
                  { ...service } category={"german"}
/>

                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="other" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherServices.map((service, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ServiceCard
                  { ...service } category={"other"}
/>

                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      </Element>
  

  
  
  
  
  
  
  

);

}


/*

  <section ref={scope} id="services" className="py-20 px-6 bg-[rgb(20,19,19)] relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
 
        <div className="flex flex-col gap-8 service-cards-block">

          <div className="flex flex-col items-center text-center bp992:items-center bp992:text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="our-service-text-title">Наши </span>
              <span className="text-amber-500 our-service-text-title">услуги</span>
            </h2>
            <p className="text-gray-400 text-lg our-service-text-title max-w-3xl">
              Полный спектр услуг для вашего автомобиля
            </p>
          </div>

          <div className="w-full z-0 hidden md:block">
            <div className="grid z-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-6 bp992:gap-10 bp992:grid-cols-2">
              {carCards.map((card) => (
                <article
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  onClick={handleClick}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClick(card);
                    }
                  }}
                  className="group our-service-card relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-72 md:h-[420px] bp992:h-[560px] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-amber-500"
                >
                  <div className="absolute inset-0">
                    <img
                      src={card.img}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg md:text-xl font-bold mb-1">{card.title}</h3>
                    <p className="text-gray-600 text-sm md:text-lg opacity-0 
                    transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>



      <main className="container mx-auto px-4 pb-20 block md:hidden">
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="animate-in fade-in slide-in-from-left duration-700 delay-300">
            <ServiceCard
              title="Немецкие Авто"
              subtitle="BMW · Mercedes-Benz · Audi · Volkswagen · Porsche"
              image={germanCar}
              services={germanServices}
              theme="german"
            />
          </div>

          <div className="animate-in fade-in slide-in-from-right duration-700 delay-500">
            <ServiceCard
              title="Другие Марки"
              subtitle="Toyota · Honda · Mazda · Nissan · и другие"
              image={otherCar}
              services={otherServices}
              theme="other"
            />
          </div>
        </div>
      </main> 

    

        </div>

          {  active && <Hyerarhy/> }

      </div>
    </section>
   <div className="hidden absolute right-[20%] top-0 md:top-[15%] lg:top-[2%] xl:top-[5%] 
        h-screen md:flex flex-col justify-end w-[40%]">
        <div className="flex gap-2 md:gap-4 relative">
    <div className="flex-none relative">
      {active && <VerticalProgressGSAP />}
    </div>

    <div className="flex flex-col justify-between gap-12 py-12 sm:py-16 md:py-20 pb-12 sm:pb-14 md:pb-16">
      {[
        {
          title: "I work",
          text: "Собираю код, чиню баги, пью кофе. Иногда в обратном порядке."
        },
        {
          title: "I learn",
          text: "Понимаю, что чем больше учусь — тем больше всего не знаю. Но уже не страшно."
        },
        {
          title: "I refactor",
          text: "Код был чудовищем, а стал красавцем. Иногда наоборот, но мы это не обсуждаем."
        },
        {
          title: "I optimize",
          text: "Каждый килобайт важен. Даже тот, что я съел на завтрак."
        },
        {
          title: "I chill",
          text: "Когда всё задеплоилось без ошибок, можно наконец-то выдохнуть… и снова деплойнуть."
        }
      ].map((item, i) => (
        <div
          key={i}
          className="mb-12 sm:mb-12 md:mb-10 max-w-[550px] our-service-text opacity-0"
        >
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2 text-gray-300">
            {item.title}
          </h1>
          <ul className="text-sm list-disc text-gray-600 ml-8">
            <li>{item.text}</li>
          </ul>
        </div>
      ))}
    </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-20 block md:hidden">
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="animate-in fade-in slide-in-from-left duration-700 delay-300">
            <ServiceCard
              title="Немецкие Авто"
              subtitle="BMW · Mercedes-Benz · Audi · Volkswagen · Porsche"
              image={germanCar}
              services={germanServices}
              theme="german"
            />
          </div>

          <div className="animate-in fade-in slide-in-from-right duration-700 delay-500">
            <ServiceCard
              title="Другие Марки"
              subtitle="Toyota · Honda · Mazda · Nissan · и другие"
              image={otherCar}
              services={otherServices}
              theme="other"
            />
          </div>
        </div>
      </main>
*/


{ /*
  
    <section ref={scope} id="services" className="py-20 px-6 bg-[rgb(20,19,19)] relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
 
        <div className="flex flex-col gap-8">

          <div className="flex flex-col items-center text-center bp992:items-center bp992:text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="our-service-text-title">Наши </span>
              <span className="text-amber-500 our-service-text-title">услуги</span>
            </h2>
            <p className="text-gray-400 text-lg our-service-text-title max-w-3xl">
              Полный спектр услуг для вашего автомобиля
            </p>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-6 bp992:gap-10 bp992:grid-cols-2">
              {carCards.map((card) => (
                <article
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  onClick={handleClick}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClick(card);
                    }
                  }}
                  className="group our-service-card relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-72 md:h-[420px] bp992:h-[560px] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-amber-500"
                >
                  <div className="absolute inset-0">
                    <img
                      src={card.img}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg md:text-xl font-bold mb-1">{card.title}</h3>
                    <p className="text-gray-200 text-sm md:text-base opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

 <div className="absolute right-[20%] top-[0%] h-[100vh] flex flex-col justify-end w-[40%]">
 


    <div className="flex gap-2 relative">

  <div className="flex-none relative">
    { active && <VerticalProgressGSAP/>}
  </div>

  <div className="flex flex-col justify-between py-[80px] pb-[60px]">
    {[
      {
        title: "I work",
        text: "Собираю код, чиню баги, пью кофе. Иногда в обратном порядке."
      },
      {
        title: "I learn",
        text: "Понимаю, что чем больше учусь — тем больше всего не знаю. Но уже не страшно."
      },
      {
        title: "I refactor",
        text: "Код был чудовищем, а стал красавцем. Иногда наоборот, но мы это не обсуждаем."
      },
      {
        title: "I optimize",
        text: "Каждый килобайт важен. Даже тот, что я съел на завтрак."
      },
      {
        title: "I chill",
        text: "Когда всё задеплоилось без ошибок, можно наконец-то выдохнуть… и снова деплойнуть."
      }
    ].map((item, i) => (
      <div key={i} className="mb-16 max-w-[550px] our-service-text opacity-0">
        <h1 className="text-2xl font-bold mb-2 text-white">{item.title}</h1>
        <p className="text-gray-600 text-base leading-relaxed">{item.text}</p>
      </div>
    ))}
  </div>
</div>
</div>
      </div>
    </section>
  */ }