class JSClockHelper {
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static setTextTime() {
    const D = new Date();

    const MONTH_INDEX = D.getMonth();
    const MONTH_BY = this.getByMonth(MONTH_INDEX);
    const MONTH_RU = this.getRuMonth(MONTH_INDEX);
    const MONTH_EN = this.getEnMonth(MONTH_INDEX);

    const DD = String(D.getDate()).padStart(2, "0");
    const MM = String(MONTH_INDEX + 1).padStart(2, "0");
    const YYYY = D.getFullYear();

    const HH = String(D.getHours()).padStart(2, "0");
    const MI = String(D.getMinutes()).padStart(2, "0");
    const SS = String(D.getSeconds()).padStart(2, "0");

    this.updateSegmentDigits(HH, MI, SS);

    const SECONDS_LINE = document.getElementById("seconds_line");
    if (!SECONDS_LINE) {
      throw new Error(`Не найден узел: #seconds_line`);
    }

    const MINUTES_LINE = document.getElementById("minites_line");
    if (!MINUTES_LINE) {
      throw new Error(`Не найден узел: #minites_line`);
    }

    const HOURS_LINE = document.getElementById("hours_line");
    if (!HOURS_LINE) {
      throw new Error(`Не найден узел: #hours_line`);
    }

    let seconds_deg = (SS / 60) * 360;
    const SECONDS_DEG = seconds_deg + 90;
    SECONDS_LINE.style.transition = SS == "00" ? "" : "all 0.5s ease-in-out";
    SECONDS_LINE.style.transform = `rotate(${SECONDS_DEG}deg)`;

    let minutes_deg = (MI / 60) * 360;
    const MINUTES_DEG = minutes_deg + 90;
    MINUTES_LINE.style.transition = MI == "00" ? "" : "all 0.5s ease-in-out";
    MINUTES_LINE.style.transform = `rotate(${MINUTES_DEG}deg)`;

    const HH12 = HH > 12 ? HH - 12 : HH;
    let hours_deg = (HH12 / 12) * 360;
    const HOURS_DEG = hours_deg + 90;
    HOURS_LINE.style.transition = HH == "00" ? "" : "all 0.5s ease-in-out";
    HOURS_LINE.style.transform = `rotate(${HOURS_DEG}deg)`;

    const TEXT_DATETIME = document.getElementById("text_datetime");
    if (!TEXT_DATETIME) {
      throw new Error(`Не найден узел: #text_datetime`);
    }

    TEXT_DATETIME.innerHTML = `
      <table>
        <thead>
          <tr>
            <td>Locale</td>
            <td>Time</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BY</td>
            <td>${HH}:${MI}:${SS}</td>
            <td>${DD} ${MONTH_BY} ${YYYY} г.</td>
          </tr>
          <tr>
            <td>RU</td>
            <td>${HH}:${MI}:${SS}</td>
            <td>${DD} ${MONTH_RU} ${YYYY} г.</td>
          </tr>
          <tr>
            <td>EN</td>
            <td>${HH}:${MI}:${SS}</td>
            <td>${DD} ${MONTH_EN}, ${YYYY}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  static updateSegmentDigits(hours, minutes, seconds) {
    const DIV = document.getElementById("digital_segment_time");
    if (!DIV) {
      throw new Error(`Не найден узел: #digital_segment_time`);
    }

    const ARRAY = DIV.querySelectorAll(".seven_segment__container");
    if (ARRAY.length < 6) {
      throw new Error(
        `Не найден 6 узлов: #digital_segment_time .seven_segment__container`,
      );
    }

    ARRAY[0].setAttribute("data-symbol", hours[0]);
    ARRAY[1].setAttribute("data-symbol", hours[1]);
    ARRAY[2].setAttribute("data-symbol", minutes[0]);
    ARRAY[3].setAttribute("data-symbol", minutes[1]);
    ARRAY[4].setAttribute("data-symbol", seconds[0]);
    ARRAY[5].setAttribute("data-symbol", seconds[1]);
  }

  static getByMonth(monthIndex) {
    return [
      "студзеня",
      "лютага",
      "сакавіка",
      "красавіка",
      "мая",
      "чэрвеня",
      "ліпеня",
      "жніўня",
      "верасня",
      "кастрычніка",
      "лістапада",
      "снежня",
    ][monthIndex];
  }

  static getRuMonth(monthIndex) {
    return [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ][monthIndex];
  }

  static getEnMonth(monthIndex) {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][monthIndex];
  }
}
