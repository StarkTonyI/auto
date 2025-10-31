import TestimonialCard from "../components/card";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ReviewsSection = () => {
  const testimonials = [
    {
      name: "Анна Петрова",
      role: "CEO",
      company: "TechStart",
      content: "Невероятный сервис! Команда превзошла все наши ожидания. Проект был выполнен в срок и с высочайшим качеством. Обязательно будем работать снова.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Дмитрий Соколов",
      role: "Директор по маркетингу",
      company: "Digital Pro",
      content: "Профессиональный подход на всех этапах работы. Результат превзошел ожидания, а коммуникация была на высшем уровне. Рекомендую всем!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Елена Иванова",
      role: "Product Manager",
      company: "InnovaCorp",
      content: "Отличная работа! Внимание к деталям и готовность идти навстречу сделали процесс работы максимально комфортным. Результат отличный!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "Михаил Кузнецов",
      role: "Tech Lead",
      company: "CodeFactory",
      content: "Высокий уровень экспертизы и профессионализма. Команда оперативно решала все задачи и предлагала лучшие решения. Очень доволен результатом.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      name: "Ольга Смирнова",
      role: "Founder",
      company: "StartupHub",
      content: "Превосходное качество и внимание к деталям. Команда действительно понимает потребности клиента и реализует решения на высшем уровне.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
    },
    {
      name: "Александр Волков",
      role: "CTO",
      company: "DevStream",
      content: "Работать с такой командой - одно удовольствие. Все сроки соблюдены, качество на высоте. Обязательно обратимся снова для новых проектов.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    }
  ];

  // Refs
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Заголовок + иконка
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      // Карточки — по одной, плавно
      gsap.fromTo(
        gridRef.current?.children || [],
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );

      // Нижний блок
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 90%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Gradient overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 ring-4 ring-primary/20">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            Отзывы клиентов
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Узнайте, что говорят о нас наши клиенты и партнеры
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div ref={bottomRef} className="mt-16 text-center">
          <div className="inline-block px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-sm text-muted-foreground">
            <span className="text-primary font-semibold">100+</span> довольных клиентов по всему миру
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReviewsSection;