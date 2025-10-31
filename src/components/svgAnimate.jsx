import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// VerticalProgressGSAP.jsx
// Требует: npm i gsap
// Компонент — сам SVG (немного подправил: добавил id и классы), анимация — через GSAP (без платных плагинов).

export default function VerticalProgressGSAP() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const svg = rootRef.current.querySelector("svg");
      const mainLine = svg.querySelector("#main-line");
      const circles = Array.from(svg.querySelectorAll(".checkpoint"));
      const checks = Array.from(svg.querySelectorAll(".check"));

      // Подготовка путей: stroke-dash technique (работает везде, не нужен DrawSVG)
      const preparePath = (p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        // ensure visible stroke for animation
        p.setAttribute("stroke-linecap", "round");
      };

      preparePath(mainLine);
      checks.forEach(preparePath);

      // Начальные состояния для кружков
      circles.forEach((c) => {
        gsap.set(c, { scale: 0, transformOrigin: "50% 50%", opacity: 0 });
      });

      // Timeline
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1) Рисуем основную линию сверху вниз
      tl.to(mainLine, { strokeDashoffset: 0, duration: 1.2 });

      // 2) Появление кружков — последовательный pop-in с лёгким пружинистым эффектом
      tl.to(
        circles,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: { each: 0.18, from: "start" },
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.26" // немного перекрываем с линией
      );

      // 3) Рисуем галочки (чекмарки) внутри кружков один за другим
      tl.to(
        checks,
        {
          strokeDashoffset: 0,
          duration: 0.45,
          stagger: 0.18,
          ease: "power1.out",
        },
        "-=0.5"
      );

      // 4) Финальная приятная микропульсация для уже появившихся чекпоинтов
      tl.fromTo(
        circles,
        { scale: 1 },
        {
          scale: 1.04,
          duration: 0.6,
          yoyo: true,
          repeat: 1,
          stagger: { each: 0.18 },
          ease: "sine.inOut",
        },
        "+=0.08"
      );

      // Optional: subtle vertical slide-in for the whole SVG when it first mounts
      gsap.from(rootRef.current, { y: 10, opacity: 0, duration: 0.6 });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} style={{ width: 120 }} aria-hidden={false}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 800"
        width="120"
        height="800"
        role="img"
        aria-labelledby="title desc"
        className="block"
      >
        <title id="title">Вертикальный прогресс с большими чекпоинтами</title>
        <desc id="desc">Пять крупных зелёных кружков с белыми галочками вдоль длинной серой линии</desc>

        {/* основная линия */}
        <path
          id="main-line"
          d="M60 100 L60 900"
          stroke="gray"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* чекпоинты */}
        {[
          100,
          260,
          420,
          580,
          740
        ].map((cy, i) => (
          <g key={i}>
            <circle className="checkpoint" cx="60" cy={cy} r="18" fill="#0b7a2a" />
            <path
              className="check"
              d={`M50 ${cy} L58 ${cy + 10} L72 ${cy - 10}`}
              fill="none"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
