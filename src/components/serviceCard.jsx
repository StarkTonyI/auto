import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагин
gsap.registerPlugin(ScrollTrigger);

export const ServiceCard = ({ icon: Icon, title, description, price, category, features = [] }) => {
  const gradientClass = category === "german" ? "bg-gradient-primary" : "bg-gradient-secondary";
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    // Анимация появления карточки
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Анимация элементов внутри: иконка, заголовок, описание, цена, фичи
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Иконка
      tl.from(card.querySelector(".icon-container"), {
        scale: 0,
        rotation: 180,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, 0.2);

      // Заголовок
      tl.from(card.querySelector("h3"), {
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }, 0.3);

      // Описание
      tl.from(card.querySelector("p"), {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }, 0.4);

      // Цена
      tl.from(card.querySelector(".price"), {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.4)",
      }, 0.5);

      // Фичи — по одной
      const features = card.querySelectorAll("ul li");
      if (features.length > 0) {
        tl.from(features, {
          x: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        }, 0.6);
      }
    }, card);

    return () => {
      ctx.revert(); // Очистка при размонтировании
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className="group relative overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:-translate-y-1"
    >
      {/* цветная полоска сверху */}
      <div className={`absolute top-0 left-0 w-full h-1 ${gradientClass}`} />

      <CardHeader className="pt-4">
        <div
          className={`icon-container w-12 h-12 rounded-lg ${gradientClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>

        <CardTitle className="text-xl text-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2" asChild>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline justify-between mb-3">
          <span className="price text-2xl font-bold text-primary">{price}</span>
          <span className="text-sm text-muted-foreground">от</span>
        </div>

        {/* Ненумерованный список фич */}
        {features.length > 0 && (
          <ul
            role="list"
            aria-label={`${title} — что входит`}
            className="mt-2 space-y-2 text-sm text-muted-foreground"
          >
            {features.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
              >
                {/* стилизованный bullet — небольшой круг, перекликается с градиентом карточки */}
                <span className={`mt-1 inline-flex h-2 w-2 shrink-0 rounded-full ${gradientClass}`} aria-hidden="true" />
                <span className="leading-relaxed break-words">{f}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};