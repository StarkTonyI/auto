// MapWithDirections.jsx
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import gsap from 'gsap';

// Fix for default marker icons in many bundlers
/*
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapWithDirections({
  lat,
  lng,
  name = 'Магазин',
  address = '',
  zoom = 15,
}) {
  const center = [lat, lng];

  const openGoogleMaps = () => {
    // Открывает Google Maps с маршрутами к координатам
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${lat},${lng}`
    )}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openAppleMaps = () => {
    // Apple Maps (iOS / macOS)
    const url = `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openUniversalGeo = () => {
    // Универсальный geo: URI (работает не везде, но можно попробовать на мобильных)
    // добавим метку через query (q)
    const url = `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(name)})`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
  <div className="w-full max-w-3xl mx-auto mt-10 space-y-5">

  <div className="text-center">
    <h2 className="text-2xl font-semibold text-gray-800">Наш магазин</h2>
    <p className="text-gray-500 mt-1">
      Приходите к нам по адресу <span className="font-medium text-gray-700">{address}</span>.  
      Ниже вы можете увидеть нас на карте и построить маршрут удобным способом.
    </p>
  </div>

  <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-[360px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          <div className="min-w-[160px] text-sm">
            <strong className="block text-base mb-1">{name}</strong>
            {address && (
              <div className="text-gray-600 mb-2">{address}</div>
            )}
            <div className="flex gap-2 mt-2">
              <button
                onClick={openGoogleMaps}
                className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Google Maps
              </button>
              <button
                onClick={openAppleMaps}
                className="px-3 py-1 text-xs rounded-md bg-gray-800 text-white hover:bg-gray-900 transition"
              >
                Apple Maps
              </button>
            </div>
            <div className="mt-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Открыть в Google Картах
              </a>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  </div>

  <div className="flex flex-wrap justify-center gap-3 pt-2">
    <button
      onClick={openGoogleMaps}
      className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition"
    >
      Построить маршрут (Google)
    </button>
    <button
      onClick={openAppleMaps}
      className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg shadow-sm hover:bg-gray-900 transition"
    >
      Построить маршрут (Apple)
    </button>
    <button
      onClick={openUniversalGeo}
      className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition"
    >
      Открыть geo:
    </button>
  </div>
</div>

  );
}
*/

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function StoreMap({
  lat,
  lng,
  name = 'Магазин',
  address = '',
  zoom = 15,
}) {
    const center = [lat, lng];
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const mapRef = useRef(null);
  const buttonsRef = useRef([]);

  const openGoogleMaps = () => {
    // Открывает Google Maps с маршрутами к координатам
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${lat},${lng}`
    )}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openAppleMaps = () => {
    // Apple Maps (iOS / macOS)
    const url = `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openUniversalGeo = () => {
    // Универсальный geo: URI (работает не везде, но можно попробовать на мобильных)
    // добавим метку через query (q)
    const url = `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(name)})`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация заголовка
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Анимация описания
      gsap.fromTo(
        titleRef.current?.nextElementSibling,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' }
      );

      // Карта
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.5,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Кнопки под картой
      buttonsRef.current.forEach((btn, i) => {
        gsap.fromTo(
          btn,
          { opacity: 0, y: 15, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.7 + i * 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: btn,
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-6xl h-[80vh] relative mx-auto mb-40 md:mb-12 p-16">
      {/* Заголовок и описание */}
      <div className="text-center mb-10" ref={titleRef}>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Наш автосервис
        </h2>
        <p className="text-gray-300 mt-3 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Приходите к нам по адресу{' '}
          <span className="font-semibold text-gray-200">{address}</span>.  
          Ниже — интерактивная карта с возможностью построить маршрут.
        </p>
      </div>

      {/* Карта */}
      <div
        ref={mapRef}
        className="rounded-3xl overflow-hidden shadow-xl border h-[80%] border-gray-200 
                   transform-gpu transition-all duration-300 
                   hover:shadow-2xl hover:border-orange-300/50"
      >
        <MapContainer
          center={center}
          zoom={zoom}
          className="h-[400px] md:h-full w-full"
          style={{ borderRadius: '1.5rem' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              <div className="p-3 min-w-[180px] h-full font-sans">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{name}</h3>
                {address && (
                  <p className="text-sm text-gray-600 mb-3 leading-tight">{address}</p>
                )}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={openGoogleMaps}
                    className="w-full px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                               hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    Google Maps
                  </button>
                  <button
                    onClick={openAppleMaps}
                    className="w-full px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-gray-800 to-black text-white 
                               hover:from-gray-900 hover:to-gray-800 transform hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    Apple Maps
                  </button>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-xs text-center text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline transition"
                >
                  Открыть в Google Картах
                </a>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Кнопки под картой */}
      <div className="flex flex-wrap justify-center gap-4 pt-6">
        {[
          { onClick: openGoogleMaps, label: 'Маршрут (Google)', color: 'from-blue-600 to-blue-700' },
          { onClick: openAppleMaps, label: 'Маршрут (Apple)', color: 'from-gray-800 to-black' },
        ].map((btn, i) => (
          <button
            key={i}
            ref={el => buttonsRef.current[i] = el}
            onClick={btn.onClick}
            className={`group relative overflow-hidden px-6 py-3 text-sm font-semibold text-white 
                        rounded-xl shadow-lg bg-gradient-to-r ${btn.color}
                        transform transition-all duration-300 
                        hover:scale-105 hover:shadow-xl active:scale-95`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {btn.label}
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        ))}
      </div>


    </div>
  );
}