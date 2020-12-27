const api = {
    key: "6fb091a3995cc68327e446ec6b097d29",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event){
    if(event.keyCode == 13){
        getResults(searchbox.value);
        //console.log(searchbox.value)
    }
}


function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)//what
      .then(weather => {
        return weather.json();
      }).then(displayResults);    
}

function displayResults (weather) {


    //let apiKey = "19587365-39615fab6ae184544507c1d9a";
    
    //document.body.style.backgroundImage  = "url('https://image.flaticon.com/icons/png/512/35/35896.png')";
    getImage(weather.name);

    let city = document.querySelector('.location .city'); // what is "let"
    city.innerText = `${weather.name}, ${weather.sys.country}`; // $
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`; //html
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let icon = document.querySelector('.current .icon');
    let iconID = weather.weather[0].icon;
    icon.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    

}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
}

function getImage (cityName) {
    let apiKey = "19587365-39615fab6ae184544507c1d9a"

    fetch(`https://pixabay.com/api/?key=${apiKey}&q=${cityName}&image_type=photo&editors_choice=false`)//what
      .then(link => {
        return link.json();
        
      }).then(pullImage); 
}

function pullImage(link){
    
    //console.log(link.hits[0].largeImageURL);
    //link.hits[0].largeImageURL
    document.body.style.backgroundImage = `url('${link.hits[0].largeImageURL}')`;
}
  


