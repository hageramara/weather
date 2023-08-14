let search = document.getElementById('search');
let forecastArr;
let loc;

async function getData(country) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7b54519a12784cae841225931230508&q=${country}&days=3`)
    data = await data.json()
    forecastArr = data.forecast.forecastday;
    loc = data.location.name
    display();
}


// Function display weather in 3 days

function display() {
    let box = '';
    // display first day 
    for (let i = 0; i < 1; i++) {
        let condtionObj = forecastArr[i].day.condition

        let dateStr = forecastArr[i].date;;
        let options = { weekday: 'long', month: 'long', day: 'numeric' };

        let date = new Date(dateStr);
        let formattedDate = date.toLocaleDateString('en-US', options);

        let dayName = formattedDate.split(", ")[0];
        let dateInfo = formattedDate.split(", ")[1];

box += `<div class="today p-0 col-md-4">
        <div class="card  w-100">
            <div class="d-flex justify-content-between">
                <p>${dayName}</p>
                <p>${dateInfo}</p>
            </div>
            <div class="card-body rounded-3">
                <p class="fs-5">${loc}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="text-white main-degree">${forecastArr[i].day.maxtemp_c}°C</p>
                    <img src="https:${condtionObj.icon}" alt="temp-image">
                </div>
                <p class="text-info">${condtionObj.text}</p>
                <ul class="d-flex ps-0 justify-content-start align-items-center fs-5">
                    <li class="pe-3"><i class="fa-solid fa-umbrella pe-2"></i>${forecastArr[i].day.daily_chance_of_rain}%</li>
                    <li class="pe-3"><i class="fa-solid fa-wind pe-2"></i>${forecastArr[i].day.maxwind_kph} km/h</li>
                    <li><i class="fa-regular fa-compass pe-2"></i>East</li>
                </ul>
            </div>
        </div>
    </div>`


    }

    // display two days after
    for (let i = 1; i < 3; i++) {

        let condtionObj = forecastArr[i].day.condition

        let dateStr = forecastArr[i].date;;
        let options = { weekday: 'long', month: 'long', day: 'numeric' };

        let date = new Date(dateStr);
        let formattedDate = date.toLocaleDateString('en-US', options);

        let dayName = formattedDate.split(", ")[0];




        box += `<div class="tomorrow p-0 text-center col-md-4">
<div class="card pb-3 w-100">
    <p>${dayName}</p>
    <div class="card-body">
        <img src="https:${condtionObj.icon}" class="m-4" alt="">
        <p class="fs-3 p-0 m-0 fw-bolder text-white">${forecastArr[i].day.maxtemp_c}°C</p>
        <p>${forecastArr[i].day.mintemp_c}°C</p>
        <p class="text-info mb-5">${condtionObj.text}</p>
    </div>
</div>
</div>`


    }
    document.getElementById('Row').innerHTML = box;
}
search.addEventListener('keyup', function () {
    getData(this.value);
})


// get location


let live_Location;
async function liveLocation() {

    if ("geolocation" in navigator) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            live_Location = data.address.country;
            console.log(live_Location);
        } catch (error) {
            console.log('Error: ' + error);
        }
    } else {
        console.log('Geolocation is not supported');
    }


}

(async function () {
    await liveLocation()
    await getData(live_Location)
})();

