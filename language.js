document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("language-select");
  const label = document.getElementById("languageLabel");
  const lang = localStorage.getItem("lang") || "de";
  select.value = lang;
  loadLanguage(lang);

  select.addEventListener("change", () => {
    const newLang = select.value;
    localStorage.setItem("lang", newLang);
    loadLanguage(newLang);
  });

  function loadLanguage(lang) {
    fetch(`${lang}.json`)
      .then((res) => res.json())
      .then((data) => {
        for (const key in data) {
          const el = document.getElementById(key);
          if (el) el.innerHTML = data[key];
        }
        // Button-Text dynamisch anpassen
        document.documentElement.lang = lang;
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Sprache:", err);
      });
  }
});
