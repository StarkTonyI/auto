import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

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

export default function CarCards({ handleClick }) {
  const scope = useRef(null);



  return (
<div className="w-full max-w-screen-xl mx-auto px-4 -mt-5" ref={scope}>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
    {carCards.map((card) => (
      <article
        key={card.id}
        role="button"
        tabIndex={0}
        aria-label={`Открыть ${card.title}`}
        onClick={() => handleClick(card)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(card);
          }
        }}
        className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-[420px] md:h-[500px] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500"
      >
        <div className="absolute inset-0">
          <img
            src={card.img}
            alt={card.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">
            {card.title}
          </h3>
          <p className="text-gray-200 text-sm md:text-base opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {card.description}
          </p>
        </div>
      </article>
    ))}
  </div>
</div>



  );
}
