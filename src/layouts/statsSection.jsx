export default function StatsSection(){
    return       <section className="py-20 px-6 bg-zinc-950">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10+', label: 'Лет опыта' },
              { number: '5000+', label: 'Довольных клиентов' },
              { number: '15', label: 'Специалистов' },
              { number: '24/7', label: 'Поддержка' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
}