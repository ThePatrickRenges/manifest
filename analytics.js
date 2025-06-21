// analytics.js
const siteId = "deine-domain.de"; // <-- deine Domain hier eintragen

// Besucherzahl animiert anzeigen
fetch(`https://plausible.io/api/v1/stats/aggregate?site_id=${siteId}&period=30d&metrics=visitors`)
  .then(res => res.json())
  .then(data => {
    const visitors = data.results.visitors.value;
    animateVisitorCount(visitors);
  });

function animateVisitorCount(target) {
  const el = document.getElementById("animatedVisitorCount");
  let current = 0;
  const step = Math.ceil(target / 50);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.innerText = `👥 Besucher im letzten Monat: ${current.toLocaleString()}`;
  }, 30);
}

// Länder-Chart aufbauen
fetch(`https://plausible.io/api/v1/stats/breakdown?site_id=${siteId}&property=country&metrics=visitors&period=30d`)
  .then(res => res.json())
  .then(data => {
    const chartContainer = document.getElementById("countryChart");
    const maxValue = data.results[0].visitors;

    data.results.slice(0, 5).forEach(entry => {
      const percent = (entry.visitors / maxValue) * 100;
      const bar = document.createElement("div");
      bar.className = "country-bar";
      bar.style.width = `${percent}%`;
      bar.innerText = `${entry.name} (${entry.visitors})`;
      chartContainer.appendChild(bar);
    });
  });
