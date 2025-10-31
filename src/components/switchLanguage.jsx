import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

const languages = [
  { code: "ru", label: "Русский", flag: "RU" },
  { code: "pl", label: "Polski", flag: "PL" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const current = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">

      <button onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition">
        <ReactCountryFlag countryCode={current.flag} svg />
        {current.label}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
          {languages
            .filter(l => l.code !== current.code)
            .map(lang => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="flex items-center gap-2 px-3 py-2 w-full text-left text-white hover:bg-gray-700 transition">
                <ReactCountryFlag countryCode={lang.flag} svg />
                {lang.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
