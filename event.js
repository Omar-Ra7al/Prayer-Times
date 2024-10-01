//Start Change Mode
let settingIcon = document.querySelector(".setting i");
settingIcon.addEventListener("click", () => {
  let settingsContainer = document.querySelector(".settings-container");
  settingsContainer.classList.toggle("full-width");
});

let modeBtn = document.querySelector(".dark-light #darkmode-toggle");
let modeBtn2 = document.querySelector(
  ".dark-light.items #darkmode-toggle-items"
);
modeBtn2.addEventListener("change", () => {
  let parayItems = document.querySelectorAll(".prayers-times .pray-box");
  parayItems.forEach((item) => {
    item.classList.toggle("dark");
  });
});
let containerColor = document.querySelector(".container");
modeBtn.addEventListener("change", () => {
  containerColor.classList.toggle("light");
});
//End Change Mode
// Chnage mode deepend on teh night or mornign

if (sunrise < parseInt(currentTime)) {
  containerColor.classList.remove("light");
  modeBtn.checked = true;
  console.log("yes");
} else {
  containerColor.classList.add("light");
  modeBtn.checked = false;
}
// parseInt(timings.Sunrise);
let selectCountry = document.querySelector(".select-contry ");
let showCountries = document.querySelector(".select-contry .box-holder");
let citey;
let country;
selectCountry.addEventListener("click", () => {
  showCountries.classList.toggle("show");
});
let countries = showCountries.querySelectorAll("span");
countries.forEach((span) => {
  span.addEventListener("click", () => {
    console.log(span.innerHTML);
    country = span.innerHTML;
    document.querySelector(".text").innerHTML = span.innerHTML;
  });
});

addEventListener("click", () => {
  url = "http://api.aladhan.com/v1/timingsByAddress?address=" + country;
  fetchPraytime().then(() => {
    let arrOfNextPrayTime = [];
    let arrOfNextPrayName = [];
    onleyPrayers.forEach((span) => {
      if (parseFloat(span.innerHTML) > parseFloat(currentTime)) {
        arrOfNextPrayTime.push(span.innerHTML);
        arrOfNextPrayName.push(span.className);
        nearstPray.innerHTML = `
        ${arrOfNextPrayName[0]} <span class="spcific-time">${arrOfNextPrayTime[0]}</span>
            
            `;
      }
    });
  });
});
