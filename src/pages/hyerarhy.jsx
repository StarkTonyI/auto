import  HierarchyTree  from "../components/hyerarhyText/heyrarhyTree";

const sampleData = {
  id:0,
  title: "Главный технический директор",
  description: "Отвечает за общую техническую стратегию компании",
 
  children: [
    {
      id: "1",
      title: "Слово",
      description: "",
      children: [
        {
          id: "1",
          title: "Руководитель QA",
          description: "Управляет командой разработчиков",
        },
        {
          id: "2",
          title: "Руководитель QA",
          description: "Обеспечивает качество продукта",
        },
      
      ],
    },
    {
      id: "2",
      title: "Слово",
      description: "",
      children: [

        {
          id: "1",
          title: "Руководитель QA",
          description: "Обеспечивает качество продукта",
        },
         {
          id: "2",
          title: "Руководитель QA",
          description: "Обеспечивает качество продукта",
        },
      
      ],
    },
    {
      id: "3",
      title: "Слово",
      description: "",
      children: [
  
        {
          id: "1",
          title: "Руководитель QA",
          description: "Обеспечивает качество продукта",
        },
         {
          id: "2",
          title: "Руководитель QA",
          description: "Обеспечивает качество продукта",
        },
      
      ],
    },
      {
      id: "4",
      title: "Слово",
      description: "",
      children: [
  
        {
          id: "1",
          title: "Руководитель QA",
          description: "Обеспечивает качество продукта",
        },
         {
          id: "2",
          title: "Руководитель QA",
          description: "Обеспечивает качество продукта",
        },
      
      ],
    },


  ],
};

const Hyerarhy = () => {
  return (
    <div className="min-h-screen bg-background -mt-32 ">
      {/* Main content */}
      <main className="container w-full mx-auto  py-0 sm:py-12">
        <HierarchyTree data={sampleData} />
      </main>

    </div>
  );
};

export default Hyerarhy;
