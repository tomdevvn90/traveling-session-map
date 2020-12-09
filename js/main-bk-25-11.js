var username = "joseph";

var center = [-53.842, 34.691];
var zoom = 1.95;

mapboxgl.accessToken = "pk.eyJ1IjoidmluY2Vuem8tbSIsImEiOiJja2RyN3lyaGIxYms3MnJ0YWQzY285b2hjIn0.ABcpXPdCt_vOXrLx0ox1bg";
const map = new mapboxgl.Map({
  attributionControl: false,
  container: "map",
  style: "mapbox://styles/vincenzo-m/ckdr7gxlu0pcq19nluy0jwd3n",
  center: center,
  maxZoom: 8,
  minZoom: 1,
  zoom: zoom,
  bearing: 0,
  pitch: 0,
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

var loadedValues = [],
  keys = Object.keys(localStorage),
  i = keys.length;

function allStorage() {
  while (i--) {
    var item = localStorage.getItem(keys[i]).split("$");
    if (item[0] == "logA") {
      loadedValues.push(item);
    } else {
    }
  }

  //console.log(loadedValues);
  return loadedValues;
}

allStorage();

var userPass = ["", ""];

function login() {
  // userPass[0] = document.getElementById("field_email").value;
  // userPass[1] = document.getElementById("field_password").value;

  // var retrieved = localStorage.getItem(userPass[0] + userPass[1]);
  var retrieved = localStorage.getItem(username);

  //document.getElementsByClassName("mapboxgl-ctrl-geocoder--input").value = "Johnny Bravo";

  //map.setFeatureState({ source: "worldCountries", id: hoveredStateId }, { hover: value });
  console.log(retrieved);
  var countriesIndexes = retrieved.split("$")[9];
  console.log(countriesIndexes);
  var countriesIndexesSplit = countriesIndexes.split(",");

  countriesIndexesSplit.forEach(function (element) {
    map.setFeatureState({ source: "worldCountries", id: element }, { hover: true });
  });
}

//MAPBOX SET OPTIONS
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-right");

map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

map.addControl(
  new mapboxgl.AttributionControl({
    customAttribution: '© <a href="https://www.deepmoire.com/" target="_blank";">DeepMoiré</a>',
  })
);

document.getElementById("map-console2").style.display = "none";

//PUT THE PANEL DOWN WHEN CLICKING THE DOUBLE-ARROW ICON
if (jQuery(window).width() < 500) {
  document.getElementById("arrow-mobile").innerHTML = "▼";

  jQuery("#arrow-mobile").click(function (e) {
    e.preventDefault();
    if (this.className == "active") {
      this.className = "";
      document.getElementById("arrow-mobile").innerHTML = "▼";
      document.getElementById("mobile").style.bottom = "5%";
    } else {
      this.className = "active";
      document.getElementById("arrow-mobile").innerHTML = "▲";
      document.getElementById("mobile").style.bottom = "-250px";
    }
  });
} else {
  document.getElementById("arrow-mobile").innerHTML = "▼";

  jQuery("#arrow-mobile").click(function (e) {
    e.preventDefault();
    if (this.className == "active") {
      this.className = "";
      document.getElementById("arrow-mobile").innerHTML = "▲";
      document.getElementById("map-sub-console").style.top = "430px";
    } else {
      this.className = "active";
      document.getElementById("arrow-mobile").innerHTML = "▼";
      document.getElementById("map-sub-console").style.top = "60px";
    }
  });
}

//POP-UP OPTIONS
var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
  // anchor: 'bottom-left',
  // offset: [linearOffset, -linearOffset]
});

var hoveredStateId = null;

map.on("load", function () {
  //CREATE MULTIPLE GEOCODERS WITH CUSTOM ICONS
  var geocoder = [];
  var sourceName = ["s0", "s1", "s2", "s3", "s4", "s5"];
  var listPOIcoord = ["", "", "", "", "", ""];

  sourceName.forEach(function (item, i) {
    geocoder[i] = new MapboxGeocoder({
      mapboxgl: mapboxgl,
      accessToken: mapboxgl.accessToken,
      placeholder: "Enter city",
      types: "place",
      marker: false,
      // marker: {
      //   color: colorList[i],
      // },
      limit: 1,
    });

    document.getElementById("search" + i).appendChild(geocoder[i].onAdd(map));

    map.addSource(item, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });

    var numberIco = i + 1;

    map.loadImage("/wp-content/plugins/traveling-session-map/img/icons-0" + numberIco + ".png", function (error, image) {
      if (error) throw error;
      map.addImage(item, image);

      map.addLayer({
        id: item,
        type: "symbol",
        source: item,
        layout: {
          "icon-image": item,
          "icon-size": 0.4,
          "icon-allow-overlap": true,
          "icon-ignore-placement": false,
        },
      });
    });

    geocoder[i].on("result", function (e) {
      map.getSource(item).setData(e.result.geometry);
      var resultCoord = e.result.geometry.coordinates;
      resultCoord = resultCoord[1] + "," + resultCoord[0];

      if (i !== -1) {
        listPOIcoord[i] = resultCoord;
      }

      //listPOIcoord[i].push(resultCoord);
    });
  });

  var listPOI = ["p1", "p2", "p3", "p4", "p5", "p6"];
  var colorPOI = ["#E45B3E", "#F7A155", "#F7D267", "#019384", "#7915D4", "#2BD4EC"];
  var listKeys = ["logA", "timestamp", "user", "password", "p1", "p2", "p3", "p4", "p5", "p6", "countries"];

  d3.json("/wp-content/plugins/traveling-session-map/data/world-countries5.geojson", function (err, data) {
    if (err) throw err;

    // LOAD SAVED DATA FROM USERS
    d3.csv("/wp-content/plugins/traveling-session-map/data/Book.csv", function (err, dataCSV) {
      if (err) throw err;

      let dataCSV1 = [];
      // console.log(loadedValues);
      dataCSV1 = loadedValues.map((obj, index) => ({
        logA: obj[0],
        user: obj[1],
        password: obj[2],
        p1: obj[3],
        p2: obj[4],
        p3: obj[5],
        p4: obj[6],
        p5: obj[7],
        p6: obj[8],
        countries: obj[9],
        timestamp: obj[10],
      }));

      // console.log(dataCSV1);

      var passcode = dataCSV1.map(function (d) {
        return d.user;
      });

      // console.log(passcode);
      //CREATE MULTIPLE HEATMAPS

      listPOI.forEach((element, index) => {
        let coord = dataCSV1.map(function (d) {
          return d[element];
        });

        let pointCoord = [];

        for (var i = 0; i < coord.length; i++) {
          if (coord[i].length > 0) {
            var split = coord[i].split(","); // just split once
            var voA = parseFloat(split[1]); // before the dot
            var voB = parseFloat(split[0]); // after the dot
            pointCoord.push([voA, voB]);
          } else {
          }
        }

        var multiPt = turf.multiPoint(pointCoord);

        map.addSource(element, {
          type: "geojson",
          data: multiPt,
        });

        map.addLayer({
          id: element,
          type: "heatmap",
          source: element,
          // maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            // "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": ["interpolate", ["linear"], ["heatmap-density"], 0, "rgba(33,102,172,0)", 0.2, "#ffffff", 1, colorPOI[index]],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
          },
        });
      });

      var reloadState = dataCSV1.map(function (d) {
        return d.countries.split(",");
      });

      var names = data.features.map(function (d) {
        return d.properties.ADMIN;
      });

      var reloadStates0 = reloadState.flat();
      //var reloadStates0 = ["Aruba", "France"];

      function finder(search, target) {
        return search.map(function (val, index) {
          return target.filter(function (e) {
            return index === parseInt(e);
          }).length;
        });
      }

      var countedRank = finder(names, reloadStates0);

      // console.log(names);
      // console.log(reloadStates0);
      // console.log(countedRank);

      data.features = data.features.map(function (d, index) {
        d.properties.countedRank = countedRank[index];
        return d;
      });

      var totalIndex = data.features.map(function (d) {
        return d.id;
      });

      var admin = data.features.map(function (d) {
        return d.properties.ADMIN;
      });

      var hoverCountries = ["logA", "", "", "", "", "", "", "", "", "", ""];

      // jQuery("#saveButton").click(function () {

      // });

      // SAVE BUTTON FUNCTION
      jQuery("#saveButton").click(function () {
        var dateNow = Date.now();

        listPOIcoord.forEach(function (element, i) {
          //hoverCountries.push(element);
          hoverCountries[i + 3] = element;
        });
        hoverCountries[10] = dateNow;

        hoverCountries[1] = username;
        hoverCountries[2] = userPass[1];

        // var getpass = hoverCountries[1] + hoverCountries[2];
        var getpass = hoverCountries[1];

        var all = jQuery(".badge span")
          .map(function () {
            return this.innerHTML;
          })
          .get();

        var gigio = all.filter((e) => e !== "×");

        var hoverStatus = [];

        var tudo = [];
        gigio.forEach(function (item, index) {
          var value = jQuery('.option[data-country="' + item + '"]').val();

          tudo.push(value);
        });
        console.log(tudo);

        tudo.forEach(function (item, index) {
          item = parseFloat(item);
          map.setFeatureState({ source: "worldCountries", id: item }, { hover: true });
        });

        var listCountries = [];
        totalIndex.forEach(function (item, index) {
          var state = map.getFeatureState({ source: "worldCountries", id: item }, "hover");

          if (state.hover === true) {
            hoverStatus.push(state.hover);
            //hoverCountries.push(admin[item]);
            listCountries.push(totalIndex[item]);
          }
        });

        var indexHovered = listCountries.join(",");
        console.log(indexHovered);

        hoverCountries[9] = indexHovered;

        //set in local storage
        localStorage.setItem(getpass, hoverCountries.join("$"));
        console.log(hoverCountries.join("$"));

        document.getElementById("d1").innerHTML = hoverStatus.length;
      });

      jQuery(function () {
        jQuery("select").bsMultiSelect();
      });

      //ADD COUNTRIES LEVELS
      map.addSource("worldCountries", {
        type: "geojson",
        data: data,
      });

      map.addLayer(
        {
          id: "worldCountries",
          type: "fill",
          source: "worldCountries",
          layout: {},
          paint: {
            "fill-color": ["case", ["boolean", ["feature-state", "hover"], false], "#0071A4", "#ffffff"],
            "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.8, 0.001],
          },
        },
        "natural-line-label"
      );

      var maxRank = d3.max(data.features, function (d) {
        return d.properties.countedRank;
      });

      var minRank = d3.min(data.features, function (d) {
        return d.properties.countedRank;
      });

      var pill = data.features.map(function (d) {
        return d.properties.countedRank;
      });

      var midRank = (maxRank - minRank) / 2;
      //console.log(minRank + " + " + maxRank);
      var po = maxRank;

      // console.log(pill);

      map.addLayer(
        {
          id: "worldCountriesSum",
          type: "fill",
          source: "worldCountries",
          layout: {},
          paint: {
            "fill-color": ["interpolate", ["linear"], ["get", "countedRank"], 0, "#EFAA7B", po, "#F35132"],
            "fill-opacity": ["match", ["get", "countedRank"], [0], 0, 1],
          },
        },
        "natural-line-label"
      );

      //LOADING CIRCLE ICON
      map.on("data", function (e) {
        if (e.dataType === "source" && e.sourceId === "worldCountries") {
          document.getElementById("loader").style.visibility = "hidden";
        }
      });

      totalIndex.forEach(function (item, index) {
        map.setFeatureState({ source: "worldCountries", id: item }, { hover: false });
      });

      login();

      //CHANGE FEATURE HOVER VALUE ON CLICKING IN MAP
      function clickCountry(value) {
        map.on("click", "worldCountries", function (e) {
          var hoverStatus = [];
          totalIndex.forEach(function (item, index) {
            var state = map.getFeatureState({ source: "worldCountries", id: item }, "hover");

            if (state.hover === true) {
              hoverStatus.push(state.hover);
            }
          });

          if (e.features.length > 0) {
            map.setFeatureState({ source: "worldCountries", id: hoveredStateId }, { hover: value });
          }

          document.getElementById("d1").innerHTML = hoverStatus.length;
        });
      }

      map.on("mousemove", "worldCountries", function (e) {
        map.getCanvas().style.cursor = "pointer";
        hoveredStateId = e.features[0].id;

        var state = map.getFeatureState({ source: "worldCountries", id: hoveredStateId }, "hover");

        var stateVal = state.hover;
        if (stateVal === false) {
          clickCountry(true);
        } else {
          clickCountry(false);
        }
      });

      map.on("mouseleave", "worldCountries", function () {
        map.getCanvas().style.cursor = "";
      });
      listMapboxLayer.forEach(function (element) {
        map.setLayoutProperty(element, "visibility", "none");
      });

      jQuery(".c1").click(function (e) {
        e.preventDefault();
        document.getElementById("map-console").style.display = "block";
        document.getElementById("map-console2").style.display = "none";
        document.getElementById("map-sub-console").style.display = "block";
        listMapboxLayer.forEach(function (element) {
          map.setLayoutProperty(element, "visibility", "none");
        });
        map.setLayoutProperty("worldCountries", "visibility", "visible");
        sourceName.forEach(function (item) {
          map.setLayoutProperty(item, "visibility", "visible");
        });
      });
      jQuery(".c2").click(function (e) {
        e.preventDefault();
        document.getElementById("map-console").style.display = "none";
        document.getElementById("map-console2").style.display = "block";
        document.getElementById("map-sub-console").style.display = "none";
        map.setLayoutProperty("worldCountries", "visibility", "none");
        sourceName.forEach(function (item) {
          map.setLayoutProperty(item, "visibility", "none");
        });
        map.setLayoutProperty("worldCountriesSum", "visibility", "visible");
      });
    });

    var console2Activated = document.getElementById("map-console2").style.display;

    var listMapboxLayer = ["p1", "p2", "p3", "p4", "p5", "p6", "worldCountriesSum"];
    var colorPOI = ["#E45B3E", "#F7A155", "#F7D267", "#019384", "#7915D4", "#2BD4EC", "#333333"];

    jQuery(".btn-secondary").click(function () {
      var clickedLayer = jQuery(this).val();
      var clickedLayerText = jQuery(this).text();

      var layerList = listPOI.push("worldCountriesSum");

      function checkId(id) {
        return id == clickedLayer;
      }
      document.getElementById("selectedLayer").innerHTML = clickedLayerText + " (from all users)";
      document.getElementById("selectedLayer").style.color = colorPOI[listMapboxLayer.findIndex(checkId)];

      listMapboxLayer.forEach(function (item) {
        if (item == clickedLayer) {
          map.setLayoutProperty(item, "visibility", "visible");
        } else {
          map.setLayoutProperty(item, "visibility", "none");
        }
      });
    });
  });
});
