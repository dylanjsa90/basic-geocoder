'use strict';

const requestify = require('requestify');
let zips = process.argv[2] !== undefined ? process.argv.slice(2) : [98110, 98105, 85391, 58301, 49211];

let geo = function (zip) {
  return requestify.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&key=').then(function(response) {
    let body = response.getBody();
    return {coordinates: body.results[0].geometry.location, zipcode: zip}; // Coordinates from zip code
  }).catch(reason => {
    console.log('error', reason);
  });  
};

function convert() {
  let transforming = zips.map(function(zip) {
    return geo(zip);
  });
  return Promise.all(transforming).then(results => {
    console.log('Results: ', results); // For dispaying results on terminal since return value is isolated
    return results;
  }).catch(reason => {
    console.log('error: rejection', reason);
  });
}

// Implement usage here from the promise returned by convert i.e. convert().then(do more stuff)
convert(); // Returns a promise of all zip to coordinates promises 