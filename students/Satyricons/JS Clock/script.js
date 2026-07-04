// document.querySelector('.sec').style.transform = 'rotate(222deg)'

function updateClock() {
    const now = new Date();
   
    // Вычисляем углы поворота
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12; // Приводим к 12-часовому формату

    // Секундная стрелка: 6 градусов в секунду (360 / 60)
    const secondDeg = seconds * 6;
    // Минутная стрелка: 6 градусов в минуту + плавный ход от секунд
    const minuteDeg = minutes * 6 + seconds * 0.1; 
    // Часовая стрелка: 30 градусов в час + плавный ход от минут
    const hourDeg = hours * 30 + minutes * 0.5; 

    document.querySelector('.sec').style.transform = `rotate(${180+secondDeg}deg)`;
    document.querySelector('.min').style.transform = `rotate(${180+minuteDeg}deg)`;
    document.querySelector('.hour').style.transform = `rotate(${180+hourDeg}deg)`;

 console.log(hours+' '+minutes+' '+seconds)
}


// Обновляем положение стрелок сразу при загрузке страницы
updateClock(); 

// Запускаем обновление каждую секунду (1000 мс)
// Без начальной отрисовки (вызова updateClock() перед setInterval) 
// пользователь увидел бы статичную картинку первую секунду.
const clockTimer = setInterval(updateClock, 1000);