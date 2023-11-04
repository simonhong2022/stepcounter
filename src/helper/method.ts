import { ApexOptions } from "apexcharts";

export default function getHoursfromMillisec(millisec: number) {
  var seconds: string = (millisec / 1000).toFixed(0);
  var minutes: string = Math.floor(parseInt(seconds) / 60).toString();
  var hours: string = "";
  if (parseInt(minutes) > 59) {
    hours = Math.floor(parseInt(minutes) / 60).toString();
    hours = parseInt(hours) >= 10 ? hours : "0" + hours;
    minutes = (parseInt(minutes) - parseInt(hours) * 60).toString();
    minutes = parseInt(minutes) >= 10 ? minutes : "0" + minutes;
  }

  seconds = Math.floor(parseInt(seconds) % 60).toString();
  seconds = parseInt(seconds) >= 10 ? seconds : "0" + seconds;
  if (hours != "") {
    return hours + ":" + minutes + ":" + seconds;
  }
  return minutes + ":" + seconds;
}
