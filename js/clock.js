(function () {
  const clock = document.getElementById('site-clock');
  if (!clock) return;

  const dateFormat = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeFormat = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });

  function tick() {
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = dateFormat.format(now) + ' — ' + timeFormat.format(now);
  }

  tick();
  setInterval(tick, 1000);
})();
