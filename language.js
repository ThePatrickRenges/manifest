document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("language-select");

  // Beim Laden: aktuelle Sprache aus localStorage holen oder "de"
  const currentLang = localStorage.getItem("lang") || "de";
  select.value = currentLang;
  loadLanguage(currentLang);

  select.addEventListener("change", function () {
    const lang = select.value;
    localStorage.setItem("lang", lang);
    loadLanguage(lang);
  });

  function loadLanguage(lang) {
    fetch(`${lang}.json`)
      .then(response => response.json())
      .then(translations => {
        for (const [id, text] of Object.entries(translations)) {
          const el = document.getElementById(id);
          if (el) el.innerHTML = text;
        }

        // Setze <html lang="..."> dynamisch
        document.documentElement.setAttribute("lang", lang);
      })
      .catch(err => {
        console.error("Sprachdatei konnte nicht geladen werden:", err);
      });
  }
});
