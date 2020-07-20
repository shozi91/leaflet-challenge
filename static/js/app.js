var queryURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(queryURL).then(function(data){
    createFeatures(data.features);
    createLegend()
});

var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(myMap);
  

  function createFeatures(featureData){
      for (var i = 0; i < featureData.length; i++){
        var location = [featureData[i].geometry.coordinates[1],featureData[i].geometry.coordinates[0]]
        L.circle(location,{
            fillOpacity: 1,
            color: d3.interpolateRdYlGn(1-(featureData[i].properties.mag/10)),
            fillColor: d3.interpolateRdYlGn(1-(featureData[i].properties.mag/10)),
            // Adjust radius
            radius: 1000 * Math.exp(featureData[i].properties.mag)
        })
        .bindPopup("<h2>" + featureData[i].properties.title + "</h2> <hr> <h3> " + Date(featureData[i].properties.time))
        .addTo(myMap);
      }
  }

