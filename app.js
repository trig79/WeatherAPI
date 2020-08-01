window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperatureDescription')
    let temperatureDegree = document.querySelector('.temperatureDegree');
    let realfeel = document.querySelector('.realfeelDegree');
    let locationCity = document.querySelector('.locationCity');
    let locationCounty = document.querySelector('.locationCounty');
    let locationCountry = document.querySelector('.locationCountry');
    let iconPic = document.querySelector('.icon');
    let temperatureSection = document.querySelector('.temperatureSection');
    let actualDegreeType = document.querySelector('.actualSection span')
    let realDegreeType = document.querySelector('.realFeelSection span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const weatherApiKey = '3bbdc8d8795341569ca140714202807'
        const api = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${long}`


        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data); // only needed for error checking

            //Set API DOM Elements
            const {temp_c, feelslike_c, temp_f, feelslike_f} = data.current  // this format is ideally used when pulling multiple items from current folder
            const {name, region, country} = data.location;
            const {icon, text} = data.current.condition;

            temperatureDegree.textContent = temp_c; 
            locationCity.textContent = name;
            locationCounty.textContent = region;
            locationCountry.textContent = country;
            temperatureDescription.textContent = text;
            iconPic.innerHTML = "<img src='" + "https:" + icon + "'>" ;
            realfeel.textContent = feelslike_c;

            //add event listener to change between F to C
            temperatureSection.addEventListener('click', () => {
                if (actualDegreeType.textContent === "C"){
                    actualDegreeType.textContent = "F";
                    temperatureDegree.textContent = temp_f; 
                    realDegreeType.textContent = "F";
                    realfeel.textContent = feelslike_f; 
                } else {
                    actualDegreeType.textContent = "C"
                    temperatureDegree.textContent = temp_c; 
                    realDegreeType.textContent = "C";
                    realfeel.textContent = feelslike_c; 
                }
            })

        })
    })
    } else {
        h1.textContent = "please enable Geo Location for this to work"
    }

})
