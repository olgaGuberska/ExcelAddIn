
function handlingData(data) {
    let allststes = [];

    data.forEach(row => {

        let idCity = row[0].value;
        let stateName = row[1].value;
        let countyName = row[2].value;
        let cityName = row[3].value;
        let cityDescription = row[4].value;

        let state = getState(stateName, allststes);
        let county = getCounty(state, countyName);
        getCity(county, cityName, idCity, cityDescription);
    });
    return allststes;
}

function getCounty(state, countyName) {
    let idCounty = state.id + countyName;
    let county = state.subChild.find(el => el.id === idCounty);

    if (!county){
        county = {
            id: idCounty,
            name: countyName,
            subChild: []
        };
        state.subChild.push(county);
    }
    return county;
}

function getState(stateName, allststes) {
    let state = allststes.find(el => el.id === stateName);

    if (!state){
        state = {
            id: stateName,
            name: stateName,
            subChild: []
        };
        allststes.push(state);
    }
    return state;
}



function getCity(county, cityName, idCity, cityDescription) {
    let city = county.subChild.find(el => el.id === idCity);

    if(!city) {
        city = {
            id: idCity,
            name: cityName,
            tooltip: cityDescription
        };
        county.subChild.push(city);
    }
    return city;
}

module.exports = { handlingData: handlingData};