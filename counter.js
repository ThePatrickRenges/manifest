const counterKey = 'visitor-count-local';

function updateVisitorCount() {
  let count = localStorage.getItem(counterKey);
  count = count ? parseInt(count) : 0;
  count++;
  localStorage.setItem(counterKey, count);
  document.getElementById('visit-count').textContent = count;
}

document.addEventListener('DOMContentLoaded', updateVisitorCount);
