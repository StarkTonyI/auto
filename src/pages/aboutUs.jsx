import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, CheckCircle, Users, Award } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Element } from 'react-scroll';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {

  const sectionRef = useRef(null); 
  const titleRef = useRef(null); 
  const badgeRef = useRef(null); 
  const paragraphRef = useRef(null); 
  const cardsRef = useRef([]); 
  const finalBlockRef = useRef(null);

  useEffect(() => {
  // безопасно, если gsap ещё не зарегистрирован — предположим, что registerPlugin уже вызван
  const ctx = gsap.context(() => {
    // --- 1) БЕЙДЖ — лёгкое появление (без бесконечного yoyo) ---
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // --- 2) Заголовок — по строкам, простой reveal (без innerHTML прямой вставки) ---
    if (titleRef.current) {
      const lines = Array.from(titleRef.current.querySelectorAll('div'));
      lines.forEach((line, li) => {
        const text = line.textContent || '';
        // очистим узел и создадим безопасно span-ы для каждого символа
        line.textContent = '';
        const fragment = document.createDocumentFragment();
        for (const ch of text) {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.style.transform = 'translateY(0.25em)'; // начальное смещение визуально
          span.style.opacity = '0';
          span.textContent = ch;
          fragment.appendChild(span);
        }
        line.appendChild(fragment);

        const spans = line.querySelectorAll('span');
        gsap.to(spans, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.02,
          ease: 'power2.out',
          delay: 0.15 + li * 0.2,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }

    // --- 3) Параграф — появление (без "фиксированной высоты") ---
    if (paragraphRef.current) {
      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // --- 4) Карточки — фильтруем пустые refs и делаем аккуратный вход с небольшим stagger ---
    const cards = Array.isArray(cardsRef.current) ? cardsRef.current.filter(Boolean) : [];
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: cards[0], // триггер первой карточки — остальное появится по stagger
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Небольшие под-анимации: иконки и line (но упрощённо — без сложных фильтров)
      cards.forEach((card) => {
        const iconBg = card.querySelector('.icon-bg');
        const icon = card.querySelector('svg');
        const bottomLine = card.querySelector('.bottom-0');

        if (iconBg) {
          gsap.fromTo(iconBg, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)', scrollTrigger: { trigger: card, start: 'top 85%' } });
        }
        if (icon) {
          gsap.fromTo(icon, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%' } });
        }
        if (bottomLine) {
          // безопасно: используем scaleX через transformOrigin
          gsap.set(bottomLine, { scaleX: 0, transformOrigin: 'left' });
          gsap.to(bottomLine, { scaleX: 1, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%' } });
        }
      });
    }

    // --- 5) Финальный блок — аккуратное появление ---
    if (finalBlockRef.current) {
      gsap.fromTo(
        finalBlockRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'elastic.out(1, 0.6)',
          scrollTrigger: {
            trigger: finalBlockRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // --- 6) Параллакс фона секции (оставляем, но простой) ---
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 120%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // лёгкий skew — упрощённый (без частого создания твинов)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // small, smoothed value
          const skewVal = (self.progress - 0.5) * 1.5; // от -0.75 до +0.75 deg
          gsap.to(sectionRef.current, { skewY: skewVal, duration: 0.4, ease: 'power1.out' });
        },
      });
    }
  });

  // очистка
  return () => {
    ctx.revert();
    // дополнительно убиваем все ScrollTrigger'ы, если нужно:
    ScrollTrigger.getAll().forEach(st => {
      // Некоторые ScrollTrigger'ы уже удалятся при ctx.revert, но на всякий случай:
      try { st.kill(); } catch (e) {}
    });
  };
}, []);


  return (
    <Element name="aboutUs">
      <div
        ref={sectionRef}
        className="min-h-screen mt-20 bg-[#0f1522] bg-[url('/noise.png')] bg-repeat opacity-90"
        style={{ backgroundAttachment: 'fixed' }}
      >
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* БЕЙДЖ */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-sm bg-white/5 border border-orange-500/30"
            >
              <Wrench className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 text-sm font-semibold tracking-wider">
                ПРОФЕССИОНАЛЬНЫЙ СЕРВИС С 2009 ГОДА
              </span>
            </div>

            {/* ЗАГОЛОВОК */}
            <h1
              ref={titleRef}
              className="text-5xl lg:text-7xl font-bold text-white leading-tight"
            >
              <div>О нашем</div>
              <div>
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                  автосервисе
                </span>
              </div>
            </h1>

            {/* ПАРАГРАФ */}
<p
  className="
    text-gray-300 break-words text-lg lg:text-xl leading-relaxed
    max-w-4xl w-full mx-auto
    backdrop-blur-sm bg-white/5 p-6 rounded-2xl
    border border-gray-700/50
    overflow-hidden relative
  "
>
  Мы — команда профессионалов с{" "}
  <strong className="text-orange-400">
    более чем 15-летним опытом
  </strong>{" "}
  в сфере автомобильного ремонта и обслуживания. Наша миссия — обеспечить
  каждому клиенту{" "}
  <strong className="text-orange-400">безопасность на дороге</strong> и
  уверенность в своем автомобиле. Используем только оригинальные запчасти,
  современное оборудование и проверенные технологии.
</p>


            {/* КАРТОЧКИ */}
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {[
                { icon: CheckCircle, title: 'Качество', desc: 'Только оригинальные запчасти от проверенных производителей' },
                { icon: Users, title: 'Опыт', desc: 'Более 5000 довольных клиентов за 15 лет работы' },
                { icon: Award, title: 'Гарантия', desc: '12 месяцев на все виды работ и заменённые детали' },
                { icon: Wrench, title: 'Сервис', desc: 'Диагностика и ремонт любой сложности — от ТО до капитального ремонта' }
              ].map((item, i) => (
                <div
                  key={i}
                  ref={el => cardsRef.current[i] = el}
                  className="group relative p-6 bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden cursor-pointer transform-gpu"
                  onMouseEnter={e => {
                    gsap.to(e.currentTarget, { y: -8, scale: 1.03, duration: 0.4, ease: 'power3.out' });
                    gsap.to(e.currentTarget.querySelector('.icon-bg'), { scale: 1.3, duration: 0.6 });
                  }}
                  onMouseLeave={e => {
                    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
                    gsap.to(e.currentTarget.querySelector('.icon-bg'), { scale: 1, duration: 0.6 });
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="icon-bg w-14 h-14 bg-orange-500/15 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-orange-500/30">
                        <item.icon className="w-7 h-7 text-orange-400 group-hover:text-orange-300 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-orange-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>

            {/* ФИНАЛЬНЫЙ БЛОК */}
            <div
              ref={finalBlockRef}
              className="mt-16 p-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl border border-orange-500/20 backdrop-blur-sm"
            >
              <p className="text-center text-orange-300 font-medium text-lg">
                Более 87% клиентов возвращаются к нам снова

              </p>
            </div>
          </div>
        </div>

      </div>
    </Element>
  );
}