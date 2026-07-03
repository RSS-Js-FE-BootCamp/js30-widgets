    const secondHand = document.getElementById('second-hand');
    const minHand = document.getElementById('min-hand');
    const hourHand = document.getElementById('hour-hand');

    const digitalTime = document.getElementById('digital-time');
    const digitalDay = document.getElementById('digital-day');
    const digitalDate = document.getElementById('digital-date');
    const digitalYear = document.getElementById('digital-year');

    const hoursProgress = document.getElementById('hours-progress');
    const minutesProgress = document.getElementById('minutes-progress');
    const secondsProgress = document.getElementById('seconds-progress');

    const themeBtn = document.getElementById('theme-btn');
    const citiesGrid = document.getElementById('cities-grid');

    const cities = [
      { name: 'Москва', timezone: 'Europe/Moscow' },
      { name: 'Лондон', timezone: 'Europe/London' },
      { name: 'Нью-Йорк', timezone: 'America/New_York' },
      { name: 'Токио', timezone: 'Asia/Tokyo' },
      { name: 'Сидней', timezone: 'Australia/Sydney' },
      { name: 'Дубай', timezone: 'Asia/Dubai' },
      { name: 'Париж', timezone: 'Europe/Paris' },
      { name: 'Лос-Анджелес', timezone: 'America/Los_Angeles' }
    ];

    function createCityCards() {
      citiesGrid.innerHTML = '';
      cities.forEach(city => {
        const card = document.createElement('div');
        card.className = 'city-card';
        card.dataset.timezone = city.timezone;
        card.innerHTML = `
          <div class="city-name">${city.name}</div>
          <div class="city-time" id="city-time-${city.timezone.replace('/', '-')}">--:--:--</div>
          <div class="city-date" id="city-date-${city.timezone.replace('/', '-')}">--</div>
          <div class="city-offset">${getTimezoneOffset(city.timezone)}</div>
        `;
        citiesGrid.appendChild(card);
      });
    }

    // === ПОЛУЧАЕМ СМЕЩЕНИЕ ЧАСОВОГО ПОЯСА ===
    function getTimezoneOffset(timezone) {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('ru', {
          timeZone: timezone,
          timeZoneName: 'short'
        });
        const parts = formatter.formatToParts(now);
        const tzPart = parts.find(p => p.type === 'timeZoneName');
        return tzPart ? tzPart.value : 'UTC';
      } catch (e) {
        return 'UTC';
      }
    }

    function updateWorldTimes() {
      cities.forEach(city => {
        try {
          const now = new Date();
          const formatter = new Intl.DateTimeFormat('ru', {
            timeZone: city.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
          
          const dateFormatter = new Intl.DateTimeFormat('ru', {
            timeZone: city.timezone,
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          const timeStr = formatter.format(now);
          const dateStr = dateFormatter.format(now);
          
          const timeId = `city-time-${city.timezone.replace('/', '-')}`;
          const dateId = `city-date-${city.timezone.replace('/', '-')}`;
          
          const timeEl = document.getElementById(timeId);
          const dateEl = document.getElementById(dateId);
          
          if (timeEl) timeEl.textContent = timeStr;
          if (dateEl) dateEl.textContent = dateStr;
        } catch (e) {
          console.warn(`Timezone ${city.timezone} not supported`);
        }
      });
    }

    let prevSecond = -1;
    let isTransitionDisabled = false;

    function updateMainClock() {
      const now = new Date();
      
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours() % 12;

      const isSecondRollover = prevSecond === 59 && seconds === 0;
      
      const secondsDeg = (seconds / 60) * 360;
      const minutesDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
      const hoursDeg = (hours / 12) * 360 + (minutes / 60) * 30;

      if (isSecondRollover) {
        secondHand.classList.add('no-transition');
        minHand.classList.add('no-transition');
        hourHand.classList.add('no-transition');
        isTransitionDisabled = true;
      }

      secondHand.style.transform = `rotate(${secondsDeg}deg)`;
      minHand.style.transform = `rotate(${minutesDeg}deg)`;
      hourHand.style.transform = `rotate(${hoursDeg}deg)`;

      if (isTransitionDisabled) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            secondHand.classList.remove('no-transition');
            minHand.classList.remove('no-transition');
            hourHand.classList.remove('no-transition');
            isTransitionDisabled = false;
          });
        });
      }

      prevSecond = seconds;

      // === Цифровое время ===
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');
      const ss = String(seconds).padStart(2, '0');
      digitalTime.textContent = `${hh}:${mm}:${ss}`;

      const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      
      digitalDay.textContent = days[now.getDay()];
      digitalDate.textContent = `${now.getDate()} ${months[now.getMonth()]}`;
      digitalYear.textContent = now.getFullYear();

      // === Прогресс ===
      const secProgress = (seconds / 60) * 100;
      const minProgress = (minutes / 60) * 100;
      const hourProgress = ((now.getHours() % 12) / 12) * 100;

      secondsProgress.textContent = `${Math.round(secProgress)}%`;
      minutesProgress.textContent = `${Math.round(minProgress)}%`;
      hoursProgress.textContent = `${Math.round(hourProgress)}%`;

      document.querySelector('#progress-seconds').style.setProperty('--progress', `${secProgress}%`);
      document.querySelector('#progress-minutes').style.setProperty('--progress', `${minProgress}%`);
      document.querySelector('#progress-hours').style.setProperty('--progress', `${hourProgress}%`);

      // === Обновляем мировое время ===
      updateWorldTimes();
    }

    // === Смена темы ===
    function toggleTheme() {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      themeBtn.textContent = isDark ? '☀️ Светлая' : '🌙 Тёмная';
      localStorage.setItem('clock-theme', isDark ? 'dark' : 'light');
    }

    function loadTheme() {
      const saved = localStorage.getItem('clock-theme');
      if (saved === 'dark') {
        document.body.classList.add('dark');
        themeBtn.textContent = '☀️ Светлая';
      } else {
        document.body.classList.remove('dark');
        themeBtn.textContent = '🌙 Тёмная';
      }
    }

    themeBtn.addEventListener('click', toggleTheme);

    createCityCards();
    updateMainClock();
    setInterval(updateMainClock, 1000);
    loadTheme();
