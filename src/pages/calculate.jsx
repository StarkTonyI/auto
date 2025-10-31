import React, { useState, useEffect } from 'react';
const Calculate = () => {
  const [data, setData] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [modelId, setModelId] = useState('');
  const [yearId, setYearId] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [engineId, setEngineId] = useState('');
  const [engineInfo, setEngineInfo] = useState(null);


  // Загрузка JSON
useEffect(() => {
  const loadData = async () => {
    try {
      const response = await fetch('/json/output.json');
      console.log('✅ Статус:', response.status, response.statusText);

      const text = await response.text(); // читаем как обычный текст
      console.log('📄 Длина файла:', text.length);

      try {
        const jsonData = JSON.parse(text);
        console.log('✅ JSON успешно распаршен, элементов:', jsonData.length);
        setData(jsonData);
      } catch (parseError) {
        console.error('❌ Ошибка парсинга JSON:', parseError.message);
        alert('Файл загружен, но не удалось распарсить JSON. Смотри консоль.');
      }

    } catch (networkError) {
      console.error('❌ Ошибка сети:', networkError);
      alert('Ошибка при загрузке JSON (fetch).');
    }
  };
  loadData();
}, []);


  // Получение бренда, модели, года и т.д.
  const selectedBrand = data.find(b => b.brandId == brandId);
  const selectedModel = selectedBrand?.models?.find(m => m.modelId == modelId);
  const selectedYear = selectedModel?.years?.find(y => y.yearId == yearId);
  const selectedEngines = selectedYear?.engines?.filter(e => e.fuelType === fuelType) || [];
  const selectedEngine = selectedEngines.find(e => e.id == engineId);

  // Получение уникальных типов топлива
  const fuelTypes = [...new Set(selectedYear?.engines?.map(e => e.fuelType) || [])];

  // Сброс зависимых полей
  const resetFrom = (field) => {
    if (field === 'brand') {
      setModelId('');
      setYearId('');
      setFuelType('');
      setEngineId('');
      setEngineInfo(null);
    } else if (field === 'model') {
      setYearId('');
      setFuelType('');
      setEngineId('');
      setEngineInfo(null);
    } else if (field === 'year') {
      setFuelType('');
      setEngineId('');
      setEngineInfo(null);
    } else if (field === 'fuel') {
      setEngineId('');
      setEngineInfo(null);
    } else if (field === 'engine') {
      setEngineInfo(null);
    }
  };

  // Обновление информации о двигателе
  useEffect(() => {
    if (!selectedEngine) {
      setEngineInfo(null);
      return;
    }

    const { name, fuelType, price, image, staging } = selectedEngine;

    const details = (
      <div className="space-y-2 text-gray-700 text-sm sm:text-base">
        <p><span className="font-semibold">Название:</span> {name || 'Н/Д'}</p>
        <p><span className="font-semibold">Тип топлива:</span> {fuelType || 'Н/Д'}</p>
        <p><span className="font-semibold">Цена:</span> {price || 'Н/Д'} €</p>
        <p>
          <span className="font-semibold">Изображение:</span>{' '}
          {image ? (
            <a href={image} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              Посмотреть
            </a>
          ) : (
            'Н/Д'
          )}
        </p>
      </div>
    );

    let tableHtml = (
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-red-600 mb-2">Стадии тюнинга</h3>
        {staging && Object.keys(staging).length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-1 sm:p-2 border border-gray-300">Стадия</th>
                  <th className="p-1 sm:p-2 border border-gray-300">Л.с. Текущая</th>
                  <th className="p-1 sm:p-2 border border-gray-300">Л.с. После</th>
                  <th className="p-1 sm:p-2 border border-gray-300">Прирост Л.с.</th>
                  <th className="p-1 sm:p-2 border border-gray-300">Нм Текущий</th>
                  <th className="p-1 sm:p-2 border border-gray-300">Нм После</th>
                  <th className="p-1 sm:p-2 border border-gray-300">Прирост Нм</th>
                  <th className="p-1 sm:p-2 border border-gray-300">Цена</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(staging).map(([stageName, stageData]) => (
                  <tr key={stageName} className="hover:bg-gray-50">
                    <td className="p-1 sm:p-2 border border-gray-300">{stageName}</td>
                    <td className="p-1 sm:p-2 border border-gray-300">{stageData.hp?.current || 'Н/Д'}</td>
                    <td className="p-1 sm:p-2 border border-gray-300">{stageData.hp?.tuned || 'Н/Д'}</td>
                    <td className="p-1 sm:p-2 border border-gray-300">{stageData.hp?.increase || 'Н/Д'}</td>
                    <td className="p-1 sm:p-2 border border-gray-300">{stageData.nm?.current || 'Н/Д'}</td>
                    <td className="p-1 sm:p-2 border border-gray-300">{stageData.nm?.tuned || 'Н/Д'}</td>
                    <td className="p-1 sm:p-2 border border-gray-300">{stageData.nm?.increase || 'Н/Д'}</td>
                    <td className="p-1 sm:p-2 border border-gray-300">{stageData.price || 'Н/Д'} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-sm">Стадии тюнинга отсутствуют.</p>
        )}
      </div>
    );

    setEngineInfo({ details, table: tableHtml });
  }, [selectedEngine]);

  return (
    <div className="min-h-screen text-gray-900 bg-cover bg-center bg-blend-overlay 
            bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920')] 
            bg-[linear-gradient(rgba(255,255,255,0.4),rgba(255,255,255,0.4))]">
      <div className="container mx-auto p-4 sm:p-6 max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
          Конфигуратор чип-тюнинга
        </h1>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="space-y-4">
            {/* Марка */}
            <div>
              <label htmlFor="brand" className="block text-sm font-semibold text-gray-700">
                Марка
              </label>
              <select
                id="brand"
                value={brandId}
                onChange={(e) => {
                  setBrandId(e.target.value);
                  resetFrom('brand');
                }}
                className="mt-1 w-full p-2 bg-gray-100 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Выберите марку</option>
                {data.map((brand) => (
                  <option key={brand.brandId} value={brand.brandId}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
            </div>

            {/* Модель */}
            {selectedBrand?.models?.length > 0 && (
              <div>
                <label htmlFor="model" className="block text-sm font-semibold text-gray-700">
                  Модель
                </label>
                <select
                  id="model"
                  value={modelId}
                  onChange={(e) => {
                    setModelId(e.target.value);
                    resetFrom('model');
                  }}
                  className="mt-1 w-full p-2 bg-gray-100 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Выберите модель</option>
                  {selectedBrand.models.map((model) => (
                    <option key={model.modelId} value={model.modelId}>
                      {model.modelName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Год */}
            {selectedModel?.years?.length > 0 && (
              <div>
                <label htmlFor="year" className="block text-sm font-semibold text-gray-700">
                  Год
                </label>
                <select
                  id="year"
                  value={yearId}
                  onChange={(e) => {
                    setYearId(e.target.value);
                    resetFrom('year');
                  }}
                  className="mt-1 w-full p-2 bg-gray-100 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Выберите год</option>
                  {selectedModel.years.map((year) => (
                    <option key={year.yearId} value={year.yearId}>
                      {year.yearName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Тип топлива */}
            {fuelTypes.length > 0 && (
              <div>
                <label htmlFor="fuel" className="block text-sm font-semibold text-gray-700">
                  Тип топлива
                </label>
                <select
                  id="fuel"
                  value={fuelType}
                  onChange={(e) => {
                    setFuelType(e.target.value);
                    resetFrom('fuel');
                  }}
                  className="mt-1 w-full p-2 bg-gray-100 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Выберите тип топлива</option>
                  {fuelTypes.map((ft) => (
                    <option key={ft} value={ft}>
                      {ft}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Двигатель */}
            {selectedEngines.length > 0 && (
              <div>
                <label htmlFor="engine" className="block text-sm font-semibold text-gray-700">
                  Двигатель
                </label>
                <select
                  id="engine"
                  value={engineId}
                  onChange={(e) => {
                    setEngineId(e.target.value);
                    resetFrom('engine');
                  }}
                  className="mt-1 w-full p-2 bg-gray-100 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Выберите двигатель</option>
                  {selectedEngines.map((engine) => (
                    <option key={engine.id} value={engine.id}>
                      {engine.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Информация о двигателе */}
          {engineInfo && (
            <div className="mt-4 sm:mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold text-red-600 mb-4">
                Информация о двигателе
              </h2>
              {engineInfo.details}
              <div className="mt-4">{engineInfo.table}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculate;