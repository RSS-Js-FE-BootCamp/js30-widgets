document.querySelector('.tower').addEventListener('mouseenter', function(){    
document.querySelector('.tower').style.transform='scale(2.5)'
document.body.classList.add('dark-theme');
})
document.querySelector('.tower').addEventListener('mouseleave', function(){    
document.querySelector('.tower').style.transform='scale(1)'
document.body.classList.remove('dark-theme'); 
})

function updateClock() {
    const now = new Date();

    // Вычисляем углы поворота
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12; // Приводим к 12-часовому формату
    const date = now.getDate();
    const month = now.toLocaleString('ru-RU', { month: 'long' })
    const day = now.toLocaleString('ru-RU', { weekday: 'short' });

    // Секундная стрелка: 6 градусов в секунду (360 / 60)
    const secondDeg = seconds * 6;
    // Минутная стрелка: 6 градусов в минуту + плавный ход от секунд
    const minuteDeg = minutes * 6 + seconds * 0.1;
    // Часовая стрелка: 30 градусов в час + плавный ход от минут
    const hourDeg = hours * 30 + minutes * 0.5;

    document.querySelector('.sec').style.transform = `rotate(${secondDeg}deg)`;
    document.querySelector('.min').style.transform = `rotate(${180 + minuteDeg}deg)`;
    document.querySelector('.hour').style.transform = `rotate(${180 + hourDeg}deg)`;

//Вторые часы:
    document.querySelector('.dig_date').textContent = date < 10 ? '0' + date : String(date);
    document.querySelector('.dig_month').textContent =  month;
    document.querySelector('.dig_day').textContent =  day;
}

// Обновляем положение стрелок сразу при загрузке страницы
updateClock();

// Запускаем обновление каждую секунду (1000 мс)
// Без начальной отрисовки (вызова updateClock() перед setInterval) 
// пользователь увидел бы статичную картинку первую секунду.
const clockTimer = setInterval(updateClock, 1000);