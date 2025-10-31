import { Car, Gauge, Wrench } from "lucide-react";

export const services = [
        {
          icon: <Wrench className="w-12 h-12" />,
          title: 'Диагностика и ремонт',
          description: 'Комплексная диагностика и профессиональный ремонт всех систем автомобиля',
          image: 'https://images.pexels.com/photos/4489743/pexels-photo-4489743.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          icon: <Car className="w-12 h-12" />,
          title: 'Кузовной ремонт',
          description: 'Восстановление геометрии кузова, покраска и полировка',
          image: 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          icon: <Gauge className="w-12 h-12" />,
          title: 'Техническое обслуживание',
          description: 'Регулярное ТО, замена масла, фильтров и расходных материалов',
          image: 'https://images.pexels.com/photos/5835362/pexels-photo-5835362.jpeg?auto=compress&cs=tinysrgb&w=800'
        },

      ];