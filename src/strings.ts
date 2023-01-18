import { Language } from "./types";
import getGerman from "./lang/de";
import getArabic from "./lang/ar";
import getEnglish from "./lang/en";

function getStrings(lang: Language) {
  return (
    {
      de: getGerman,
      ar: getArabic,
      en: getEnglish,
    }[lang] || getEnglish
  );
}

const lang = new URLSearchParams(window.location.search).get("lang");

const strings = getStrings(lang as Language)();

export default strings;
