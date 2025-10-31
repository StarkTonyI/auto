import React from "react";
import { HierarchyNode } from "./heyrarhyNode.jsx";

// HierarchyTree.jsx
// - root node (level 0) -> большой текст, центрирован в своём блоке
// - все остальные -> маленький текст
// - использую auto-fit grid для адаптивного заполнения ряда

export default function HierarchyTree({ data }) {
  const renderNode = (node, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;

    // классы для текста в зависимости от уровня
    const textWrapperClass =
      level === 0
        ? "w-full max-w-[900px] mx-auto text-center"
        : "w-full text-left";

    const textSizeClass =
      level === 0
        ? "text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
        : "text-xs sm:text-sm md:text-sm leading-snug";

    return (
      <div key={node.id} className="flex flex-col items-center w-full">
        {/* NODE */}
        <div className={`relative z-10 w-full ${textWrapperClass}`}>
          {/* Обёртка, которая задаёт размер/центрирование текста */}
          <div className={`mx-auto ${textSizeClass}`}>
            {/* HierarchyNode сам рендерит карточку — обёртка даёт контроль над размером текста */}
            <HierarchyNode node={node} level={level} />
          </div>
        </div>

        {/* CHILDREN */}
        {hasChildren && (
          <div className="flex flex-col items-center w-full mt-6 sm:mt-8 md:mt-12">
            {/* vertical line */}
            <div className="w-[2px] h-6 sm:h-10 md:h-14 bg-gradient-to-b from-primary via-secondary to-transparent" />

            {/* central horizontal connector */}
            {node.children.length > 1 && (
              <div className="relative w-full flex justify-center">
                <div
                  className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ width: `${Math.min(80, node.children.length * 10)}%` }}
                />
              </div>
            )}

            {/* GRID: карточки адаптивно тянутся на всю ширину ряда */}
            <div
              className="w-full mt-6 grid gap-6 sm:gap-8 md:gap-10 place-items-start"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
            >
              {node.children.map((child) => (
                <div key={child.id} className="relative flex flex-col items-center w-full">
                  {/* vertical line to child */}
                  {node.children.length > 1 && (
                    <div className="absolute -top-6 sm:-top-8 md:-top-10 w-[2px] h-6 sm:h-10 md:h-14 bg-gradient-to-b from-primary to-secondary left-1/2 transform -translate-x-1/2" />
                  )}

                  {/* arrow */}
                  <svg
                    className="absolute -top-5 sm:-top-7 md:-top-9 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 opacity-60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>

                  {/* Рекурсивно рендерим child — поддерево расположится внутри ячейки и унаследует маленький текст */}
                  <div className="w-full">
                    {renderNode(child, level + 1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-auto px-4 py-6 flex justify-center">
      <div className="w-full max-w-screen-2xl">{renderNode(data)}</div>
    </div>
  );
}
