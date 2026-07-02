class StylesRulesData {
  constructor(hour, minute, second, mode) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }
}

class StylesRulesString {
  constructor(rules) {
    this._stringRules = '';
    this._constantRules = `
        --color-text: #d8f89c;
        --color-digit: #25e40c;
        --color-clock-face: #031035;
        --color-clock-border: #450769;
        --color-hour-arrow: #cc0d0d;
        --color-minute-arrow: #97be06;
        --color-seconds-arrow: #1a8991;
        --clock-analog-bolt: #7a4407;`;
    this._setAnalogClockRules(rules.hour, rules.minute, rules.second);
    this._setBackGroundRules(rules.hour);
  }

  _setAnalogClockRules(hour = 0, minute = 0, seconds = 0){
    this._stringRules += `
      --clock-analog-hour: ${hour};
      --clock-analog-minute: ${minute};
      --clock-analog-seconds: ${seconds};`;
  };

  _setBackGroundRules(hour) {
    const bgUrls = {
      day: 'https://images.pexels.com/photos/4275892/pexels-photo-4275892.jpeg',
      night: 'https://images.pexels.com/photos/920534/pexels-photo-920534.jpeg'
    };
    if (hour > 20 || hour < 6) {
      this._stringRules += (`--body-bg: url(${bgUrls.night});`);
    } else {
      this._stringRules += (`--body-bg: url(${bgUrls.day});`);
    }
  }

  getRulesString() {
    return `:root {${this._stringRules}${this._constantRules}}`;
  }
}

class TimeData {
  constructor(timeData) {
    this.hour = timeData.hour > 10 ? timeData.hour : '0' + timeData.hour;
    this.minute = timeData.minute > 10 ? timeData.minute : '0' + timeData.minute;
    this.seconds = timeData.second > 10 ? timeData.second : '0' + timeData.second;
    this.day = this._setDayOfWeek(timeData);
    this.month = this._setMonth(timeData);
    this.date = timeData.day;
  }

  _setMonth(timeData) {
    const monthes = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ];

    return monthes[timeData.month - 1];
  }

  _setDayOfWeek(timeData) {
    const daysOfWeek = [
      'понедельник',
      'вторник',
      'среда',
      'четверг',
      'пятница',
      'суббота',
      'воскресенье'
    ];

    return daysOfWeek[timeData.dayOfWeek - 1];
  }
}

class Timer {
  constructor(clock) {
    this.timeData = new TimeData(Temporal.Now.plainDateTimeISO());
    this.clock = clock;
    this._updateTime();
  }

  startTimer() {
    setInterval(() => this._updateTime.bind(this)(), 1000);
  }

  _updateTime() {
    const temporalData = Temporal.Now.plainDateTimeISO();
    this.timeData = new TimeData(temporalData);
    this.clock.setAnalogClock(this.timeData);
    this.clock.setDataClock(this.timeData);
  }
}

class ClockData {
  constructor() {
    this.clockData = document.querySelector('.clock__data');
    this.styles = this._initRulesStyles(0, 0, 0);
  }

  getRulesString(hour, minute, seconds) {
    const rulesData = new StylesRulesData(hour, minute, seconds);
    const rulesString = new StylesRulesString(rulesData);

    return rulesString.getRulesString();
  }

  _initRulesStyles(hourAngle, minuteAngle, secondsAngle) {
    const startStylesVariables = this.getRulesString(0, 0, 0);

    const rules = new CSSStyleSheet();

    rules.replaceSync(startStylesVariables);

    document.adoptedStyleSheets = [rules, ...document.adoptedStyleSheets];

    return rules;
  }
}

class Clock extends ClockData {
  constructor() {
    super();
  }

  setAnalogClock(timeData) {
    const hourAngle = timeData.hour * 30;
    const minuteAngle = timeData.minute * 6;
    const secondsAngle = timeData.seconds * 6;

    const startStylesVariables = this.getRulesString(hourAngle, minuteAngle, secondsAngle);

    this.styles.replaceSync(startStylesVariables);
  }

  setDataClock(timeData) {
    this.clockData.querySelector('.clock__time-hour').textContent = timeData.hour;
    this.clockData.querySelector('.clock__time-minute').textContent = timeData.minute;
    this.clockData.querySelector('.clock__time-second').textContent = timeData.seconds;

    this.clockData.querySelector('.clock__date-day').textContent = timeData.day;
    this.clockData.querySelector('.clock__date-number').textContent = timeData.date;
    this.clockData.querySelector('.clock__date-month').textContent = timeData.month;
  }
}

class App {
  constructor() {
    this.clock = new Clock();
    this.timer = new Timer(this.clock);
  }

  start() {
    this.timer.startTimer();
  }
}

const app = new App();
app.start();