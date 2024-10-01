let url = `http://api.aladhan.com/v1/timingsByAddress?address=Damnhour,EG`;
let dateAh = document.querySelector(".next-prayer .date-ah");
let nearstPray = document.querySelector(".next-prayer .pray-name");
let allSpansTime = document.querySelectorAll("span");
let onleyPrayers = document.querySelectorAll(".prays-holder span");
let prayerDetails = document.querySelector(".pray-details .pray-name");
let contryName = document.querySelector(".country-date .country");

// Get hours and minutes START
const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const formattedHours = hours.toString().padStart(2, "0");
const formattedMinutes = minutes.toString().padStart(2, "0");
const currentTime = `${formattedHours}:${formattedMinutes}`;
// Get hours and minutes END
let sunrise = localStorage.getItem("Sunrise");
fetchPraytime = () => {
  return new Promise((resolve, reject) => {
    axios.get(url).then((respone) => {
      let data = respone.data.data;
      let dateHijri = data.date.hijri.date;
      let hijriMonthName = data.date.hijri.month.en;
      let timings = data.timings;
      console.log(timings);
      localStorage.setItem("Sunrise", parseInt(timings.Sunset));
      // Set data
      allSpansTime.forEach((sapn) => {
        for (pray in timings) {
          if (sapn.className === pray) {
            sapn.innerHTML = timings[pray];
          }
        }
      });
      dateAh.innerHTML = `${dateHijri} ${hijriMonthName}`;
      contryName.innerHTML = data.date.gregorian.date;

      // Edit The time in this cause onley
      nearstPray.innerHTML = `
        Fajr <span class="spcific-time">${timings.Fajr}</span>
            `;

      resolve();
    });
  });
};
fetchPraytime().then(() => {
  let arrOfNextPrayTime = [];
  let arrOfNextPrayName = [];
  onleyPrayers.forEach((span) => {
    // console.log(parseFloat(span.innerHTML));
    // console.log(parseFloat(currentTime));
    if (parseFloat(span.innerHTML) > parseFloat(currentTime)) {
      arrOfNextPrayTime.push(span.innerHTML);
      arrOfNextPrayName.push(span.className);
      nearstPray.innerHTML = `
        ${arrOfNextPrayName[0]} <span class="spcific-time">${arrOfNextPrayTime[0]}</span>
            
            `;
    }
  });
});

