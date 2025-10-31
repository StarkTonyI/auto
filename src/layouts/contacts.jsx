import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Element } from "react-scroll";

export default function Contacts(){
    return <Element name="contact">
    <section id="contact" className="py-20 px-6 bg-zinc-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-amber-500">Свяжитесь</span> с нами
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-800 p-6 rounded-xl flex items-start space-x-4 hover:bg-zinc-750 transition-colors">
              <Phone className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Телефон</h3>
                <p className="text-gray-400">+7 (495) 123-45-67</p>
              </div>
            </div>

            <div className="bg-zinc-800 p-6 rounded-xl flex items-start space-x-4 hover:bg-zinc-750 transition-colors">
              <Mail className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-400">info@autopro.ru</p>
              </div>
            </div>

            <div className="bg-zinc-800 p-6 rounded-xl flex items-start space-x-4 hover:bg-zinc-750 transition-colors">
              <MapPin className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Адрес</h3>
                <p className="text-gray-400">г. Москва, ул. Примерная, д. 1</p>
              </div>
            </div>

            <div className="bg-zinc-800 p-6 rounded-xl flex items-start space-x-4 hover:bg-zinc-750 transition-colors">
              <Clock className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Режим работы</h3>
                <p className="text-gray-400">Пн-Вс: 08:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element> 

}