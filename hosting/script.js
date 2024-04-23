const timeZoneBox = document.querySelector(".box");
const YOUR_API_KEY = "62fd42add5e9420697659cd129e749df";
document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    timeZoneBox.textContent = "Geolocation is not supported by this browser.";
  }
});
function successCallback(position, i = true) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${YOUR_API_KEY}
      `
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateTimeZoneInfo(data, i);
    })
    .catch((error) => {
      console.error("Error fetching timezone information:", error);
      i
        ? (timeZoneBox.textContent = "Error fetching timezone information.")
        : (curr.textContent = "Error fetching timezone information.");
      curr.classList.add(i ? " hello" : "war");
    });
}
function errorCallback(error) {
  console.error("Error getting user's location:", error);
  timeZoneBox.textContent = "Error getting user's location.";
}
function updateTimeZoneInfo(timeZoneData, i = true) {
  console.log(curr);
  const {
    name,
    offset_DST,
    offset_DST_seconds,
    offset_STD,
    offset_STD_seconds,
  } = timeZoneData.results[0].timezone;
  const { country, postcode, city } = timeZoneData.results[0];
  const { lat, lon } = timeZoneData.query;
  curr.classList.add(i ? "Hello" : "add");
  i
    ? (timeZoneBox.innerHTML = `
        <p>Name of Time Zone: ${name}</p>
        <div class="sec-line">
          <p>Lat: ${lat}</p>
          <p>Long: ${lon}</p>
        </div>
        <p>Offset STD: ${offset_STD} hours</p>
        <p>Offset STD Seconds: ${offset_STD_seconds} seconds</p>
        <p>Offset DST: ${offset_DST} hours</p>
        <p>Offset DST Seconds: ${offset_DST_seconds} seconds</p>
        <p>Country: ${country}</p>
        <p>Postcode: ${postcode}</p>
        <p>City: ${city}</p>
      `)
    : (curr.innerHTML = `
      <p>Name of Time Zone: ${name}</p>
      <div class="sec-line">
        <p>Lat: ${lat}</p>
        <p>Long: ${lon}</p>
      </div>
      <p>Offset STD: ${offset_STD} hours</p>
      <p>Offset STD Seconds: ${offset_STD_seconds} seconds</p>
      <p>Offset DST: ${offset_DST} hours</p>
      <p>Offset DST Seconds: ${offset_DST_seconds} seconds</p>
      <p>Country: ${country}</p>
      <p>Postcode: ${postcode}</p>
      <p>City: ${city}</p>
    `);
}
const curr = document.querySelector(".curr");
const intAdd = document.getElementById("add");
function getGeoLoc() {
  if (intAdd.value.trim()) {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${intAdd.value.trim()}&format=json&apiKey=${YOUR_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const position = {
          coords: {
            latitude: data.results[0].lat,
            longitude: data.results[0].lon,
          },
        };
        console.log(position);
        successCallback(position, false);
      })
      .catch((error) => {
        console.error("Error fetching timezone information:", error);
        curr.textContent = "Please enter valid Address.";
        curr.classList.add("war");
      });
  } else {
    curr.textContent = "Please enter Address.";
    curr.classList.add("war");
  }
}
