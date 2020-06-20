
L.mapbox.accessToken = 'pk.eyJ1Ijoic2FkdGFuIiwiYSI6ImNrYmt6ZjVpaDBmMGcydXBpeTQ0YWE1bTEifQ.KG2taHfe7j3bNm0nj2Bgug';
var docPiezas = document.getElementsByClassName("pieza");
var docCreadores = document.getElementsByClassName("creador");


var geoJson = [];
var latLongArr = [];
var mymap = L.map('mapid', { zoomControl: false }).setView([4.2486, -74.5742], 6);
//var mymap = L.map('mapid').setView([6.2486, -75.5742], 6).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    
    id: 'mapbox/light-v10',
    tileSize: 512,
    opacity: 0,
    zoomOffset: -1,
    
    maxBounds: L.latLngBounds(L.latLng(17.0354698214, -79.1635583007), L.latLng(-4.23168726, -66.85119071)),
    accessToken: 'pk.eyJ1Ijoic2FkdGFuIiwiYSI6ImNrYmt6ZjVpaDBmMGcydXBpeTQ0YWE1bTEifQ.KG2taHfe7j3bNm0nj2Bgug',
    zoomControl: false,
}).addTo(mymap);

mymap.setMinZoom(6);
mymap.setMaxBounds(L.latLngBounds(L.latLng(17.0354698214, -79.1635583007), L.latLng(-4.23168726, -66.85119071)))

mymap.setZoomControl
L.control.zoom({
    position: 'bottomright'
}).addTo(mymap);

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8,
        fillColor: '#FC4141'
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#fff',
        dashArray: '',
        fillOpacity: 0.7,
        fillColor: '#FEDB31'
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(colombiaData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(mymap);

for (var creador in docCreadores) {
    if (docCreadores[creador].children != undefined) {
        var docCreadorFeautreList = docCreadores[creador].children[1].children[1];
        var feature = {};
        feature.type = 'Feature';
        feature.geometry = {
            type: 'Point',
            coordinates: [parseFloat(docCreadorFeautreList.children[1].innerText), parseFloat(docCreadorFeautreList.children[0].innerText)]
        }

        var piezas = [];

        for (pieza in docPiezas) {
            if (docPiezas[pieza].children) {
                if (docPiezas[pieza].children[1].children[3].children[0].innerText == docCreadorFeautreList.children[2].innerText) {
                    var _pieza = {};
                    _pieza.img_s3_key = docPiezas[pieza].children[0].children[0].getAttribute("src");
                    _pieza.titulo = docPiezas[pieza].children[1].children[0].innerText;
                    _pieza.idCreador = docPiezas[pieza].children[1].children[3].children[0].innerText;
                    _pieza.idPieza = docPiezas[pieza].children[1].children[3].children[1].innerText;
                    _pieza.nombreCreador = docPiezas[pieza].children[1].children[3].children[2].innerText;
                    _pieza.relatoHecho = docPiezas[pieza].children[1].children[1].innerText;

                    _pieza.lugar = docCreadores[creador].children[1].children[0].innerText;
                    piezas.push(_pieza);
                }
            }
        }

        feature.properties = {
            'marker-color': '#2727E5',
            'marker-size': 'large',
            'marker-symbol': 'circle',
            'marker-outline-color': '#000',
            'popupContent': 'HELLO??',
            piezas
        }
        geoJson.push(feature);

    }
}
var lugaresLayer = L.mapbox.featureLayer().setGeoJSON(geoJson, {
    onEachFeature: function(feature, featureLayer) {
        //featureLayer.bindPopup(feature.properties.name);
        console.log(featureLayer.getPopup())
        featureLayer.on("mouseover", function() {
            featureLayer.getPopup().update();
        })
    }
}).addTo(mymap);


lugaresLayer.bindTooltip(function (layer) {
    
    var _piezas = layer.feature.properties.piezas;

    layer.on('mouseover', function (e) {
        //repeat();
        this.openTooltip();
    });
    layer.on('mouseout', function (e) {
        this.closeTooltip();
    });
    
    for (var i = 0; i < _piezas.length; ++i) {
        return L.Util.template(_piezas[0]['lugar']);
    }
    
    
})

lugaresLayer.bindPopup(function (layer) {
    //
    var _piezas = layer.feature.properties.piezas;
    
    var finalTXT = '<div > <h3> ' + _piezas[0]['lugar'] + ' </h3> <div class="scroll">  ';
  
        for (var i = 0; i < _piezas.length; ++i) {

            finalTXT += '<img src="' + _piezas[i]['img_s3_key'] + '" class="s3_img_" > '
            finalTXT += '<a href="/piezas/' + _piezas[i]['idPieza'] + '"><h1 class="scroll-content nombre-pieza"> ' + _piezas[i]['titulo'] + ' </h1></a> '
            finalTXT += '<a href="/creadores/' + _piezas[i]['idCreador'] + '" class="scroll-content nombre-creador"> ' + _piezas[i]['nombreCreador'] + ' </a> '
            finalTXT += '<p class="mt-2 relato">' + _piezas[i].relatoHecho + '<a href="/piezas/' + _piezas[i]['idPieza'] + '">' + 'Ver más' + '</a></p>'
            if (i != _piezas.length - 1)
            finalTXT += "<hr>"
            
        }
    
    finalTXT += '</div></div>';
    return L.Util.template(finalTXT);
})

var iLastLoc = -1;

async function repeat() {
    var s3imgs = document.getElementsByClassName("s3_img_");
    //conso
    for (let i = 0; i < s3imgs.length; ++i) {

        if (s3imgs[i])
        {
            if (s3imgs[i].getAttribute("src").indexOf("https") < 0) {
                console.log("loading img");
                var newUrl = await gets3url("/gets3presignedurl", "POST", { data: s3imgs[i].getAttribute("src") });
                s3imgs[i].setAttribute("src", newUrl.data)
            }
        }
        
    }
    setTimeout(repeat, 100);
}

repeat();



// function repeat() {
//     lugaresLayer.bindPopup(function (layer) {
//         //
//         var _piezas = layer.feature.properties.piezas;
        
//         var finalTXT = '<div > <h3> ' + _piezas[0]['lugar'] + ' </h3> <div class="scroll">  ';
      
//             for (var i = 0; i < _piezas.length; ++i) {
    
//                // console.log(_piezas[i]['img_s3_key'])
//                //if (_piezas[i]['img_s3_key'].toString().indexOf("https") < 0);
//                 //setTimeout(repeat, 500);
    
//                 finalTXT += '<img src="' + _piezas[i]['img_s3_key'] + '" class="s3_img" > '
//                 finalTXT += '<a href="/piezas/' + _piezas[i]['idPieza'] + '"><h1 class="scroll-content"> ' + _piezas[i]['titulo'] + ' </h1></a> '
//                 finalTXT += '<a href="/creadores/' + _piezas[i]['idCreador'] + '" class="scroll-content"> ' + _piezas[i]['nombreCreador'] + ' </a> '
//                 finalTXT += '<p class="mt-2 ">' + _piezas[i].relatoHecho + '</p>'
//                 if (i != _piezas.length - 1)
//                 finalTXT += "<hr>"
                
//             }
        
//         finalTXT += '</div></div>';
        
//         // layer.on('mouseover', function (e) {
//         //     console.log("ASD")
//         // });
//         restart();
//         return L.Util.template(finalTXT);
//     })
// }

// async function gets3url(url, method, data) {
//     return new Promise( async (resolve, reject) => 
//     {
//         try {
//             var response = {};
//             response = await fetch(url, {
//                 method,
//                 mode: "cors",
//                 //cache: 'no-cache',
//                 //credentials: 'omit',
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 //redirect: 'follow',
//                 //referrerPolicy: 'no-referrer',
//                 body: JSON.stringify(data)
//             });
//             resolve(response.json());
//         } catch (error) {
//             reject(error);
//         }
//     });
    
// }


// console.log(geoJson[0].properties.piezas)
// for (let i = 0; i < geoJson.length; ++i)
// {
//     var marker = new L.marker([geoJson[i].geometry.coordinates[1], geoJson[i].geometry.coordinates[0]], { opacity: 0.01 });
//     marker.bindTooltip(geoJson[i].properties.piezas[0].lugar, {permanent: false, className: "my-label", offset: [0, 0] });
//     marker.on('mouseover', function (e) {
//         this.openTooltip();
//     });
//     marker.on('mouseout', function (e) {
//         this.closeTooltip();
//     });
//     marker.addTo(mymap);
    
//     console.log(marker)

// }




// get color depending on population density value
// function getColor(d) {
//     return d > 1000 ? '#800026' :
//             d > 500  ? '#BD0026' :
//             d > 200  ? '#E31A1C' :
//             d > 100  ? '#FC4E2A' :
//             d > 50   ? '#FD8D3C' :
//             d > 20   ? '#FEB24C' :
//             d > 10   ? '#FED976' :
//                         '#FFEDA0';
// }



// map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//         labels = [],
//         from, to;

//     for (var i = 0; i < grades.length; i++) {
//         from = grades[i];
//         to = grades[i + 1];

//         labels.push(
//             '<i style="background:' + getColor(from + 1) + '"></i> ' +
//             from + (to ? '&ndash;' + to : '+'));
//     }

//     div.innerHTML = labels.join('<br>');
//     return div;
// };

// legend.addTo(map);




//console.log(geoJson)





// var latLongArr = [];
// var docLatLong = document.getElementsByClassName("latlong");
// var docCreadores = document.getElementsByClassName("creador");
// var docPiezas = document.getElementsByClassName("pieza");

// // var geoJsonC

// for (_latLong in docLatLong)
// {
//     if (docLatLong[_latLong].children)
//     {
//         var lat = docLatLong[_latLong].children[0].innerText;
//         var long = docLatLong[_latLong].children[1].innerText;
//         var id = docLatLong[_latLong].children[2].innerText;
//         var idC = docLatLong[_latLong].children[3].innerText;
//         var ltobj = {lat, long, id}
//         var hasCoord = false;

//         for (let i = 0; i < latLongArr.length; ++i)
//         {
//             if (latLongArr[i]['lat'] == ltobj['lat'] && latLongArr[i]['long'] == ltobj['long'])
//                 hasCoord = true;
//         }
//         if (!hasCoord)
//             latLongArr.push({lat, long, id, idC})
//     }
// }


// var mymap = L.map('mapid').setView([6.2486, -75.5742], 6);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1Ijoic2FkdGFuIiwiYSI6ImNrYmt6ZjVpaDBmMGcydXBpeTQ0YWE1bTEifQ.KG2taHfe7j3bNm0nj2Bgug'
// }).addTo(mymap);

// var markersC = [];
// var markersP = [];



// for (let i = 0; i < latLongArr.length; ++i)
// {
//     var marker = L.marker([latLongArr[i].lat, latLongArr[i].long], {color: 'red'});
//     var markerP = L.marker([latLongArr[i].lat, latLongArr[i].long]);
//     var el = document.createElement('div');
//     el.innerHTML = "Marker1";
//     var popup = new L.Popup({offset: 25})
//     .setText('Construction on the Washington Monument began in 1848.');
//     el.id = 'marker';

//     for (docCreador in docCreadores) {

//         if (docCreadores[docCreador].children != undefined) {
//             if (docCreadores[docCreador].children[1].children[1].children[3].innerText == latLongArr[i].idC) {
//                 marker.bindPopup(docCreadores[docCreador].children[1].innerHTML);
//             }
//         }
//     }

//     for (docPieza in docPiezas) {

//         if (docPiezas[docPieza].children != undefined) {
//             if (docPiezas[docPieza].children[0].children[3].children[0].innerText == latLongArr[i].idC) {
//                 //console.log(docCreadores[docCreador].children);
//                 markerP.bindPopup(docPiezas[docPieza].children[0].innerHTML);
//             }
//         }
//     }
//     markersC.push(marker);
//     markersP.push(markerP);

//     new L.Marker(el, {offset:[-25, -25]})
//     .setLatLng(latLongArr[i].lat, latLongArr[i].long)
//     .setPopup(popup) // sets a popup on this marker
//     .addTo(mymap);
// }

// function RenderPieza(id) {
//     console.log("render pieza", id)
// }

// var bFilterCreadores = false;
// document.getElementById("filter-creadores").addEventListener("click", FilterCreadores);
// document.getElementById("filter-piezas").addEventListener("click", FilterPiezas);
// //FilterCreadores();

// function FilterCreadores() {
//     bFilterCreadores = true;
//     ToggleButton();
//     for (let i = 0; i < markersP.length; ++i) {
//         markersP[i].remove();

//     }
//     for (let i = 0; i < markersC.length; ++i) {
//         markersC[i].addTo(mymap);
//     }
// }

// function FilterPiezas() {
//     bFilterCreadores = false;
//     ToggleButton();
//     for (let i = 0; i < markersP.length; ++i) {
//         markersP[i].addTo(mymap);;

//     }
//     for (let i = 0; i < markersC.length; ++i) {
//         markersC[i].remove();
//     }
// }

// function ToggleButton() {
//     if (!bFilterCreadores) {
//         document.getElementById("filter-creadores").style.backgroundColor = "#CDCDCD";
//         document.getElementById("filter-piezas").style.backgroundColor = "#2727E5";


//     } else {

//         document.getElementById("filter-creadores").style.backgroundColor = "#2727E5";
//         document.getElementById("filter-piezas").style.backgroundColor = "#CDCDCD";


//     }
// }
