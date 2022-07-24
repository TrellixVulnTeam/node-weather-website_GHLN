//This API is to fetch the forecast API
const request = require('request')
const { showHelpOnFail } = require('yargs')

const forecast = (latitude, longitude , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c4c68f34f6bafe00713617814d3dbd9e&query=${latitude},${longitude}&units=m`
    request({url, json: true}, (error, {body}) => {
        if(error){ //If error, no network, API not working etc.
            callback(`Cannot Connect To Weather Service! Retry Later`, undefined)
        }
        else if(isNaN(body.error) && body.error !== undefined) { 
            // This API basically has a problem, when data is shown, error is not there, and when error there, data is not there 
            //If response has error like user inputting something unusual then...
            callback('Invalid Location, Not Found in our directory', undefined)
        }
        else{
            callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature}\xB0C out in ${body.location.name},${body.location.country} and feels like ${body.current.feelslike}\xB0C. Precipitation is ${body.current.precip}`)
        }
    })
}
module.exports = forecast