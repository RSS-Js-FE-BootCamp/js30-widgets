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

    const ID = "text-ru-date-and-time";
    const DIV = document.getElementById(ID);
    DIV.innerHTML = `
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
