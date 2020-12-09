var user_name = jQuery('#map').data('user_name');
var username = user_name; //"joseph";
//console.log('user:'+user_name);
var center = [-53.842, 34.691];
var zoom = 1.95;

/**
 * Global Variables 
 */
let SelectState = null
let CountrySelected = []
let FavoriteCity = {}
let FavCityFilterMarker = []
let WorldCountries_Layer = null
let WorldCountriesSum_Layer = null

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

var currentTime = new Date();
var filename = "file_" + currentTime;

// Function to download data to a file
function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

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

function login() {
  var retrieved = localStorage.getItem(username);
  //console.log("retrieved"); console.log(retrieved);

  //document.getElementsByClassName("mapboxgl-ctrl-geocoder--input").value = "Johnny Bravo";
  //map.setFeatureState({ source: "worldCountries", id: hoveredStateId }, { hover: value });

  if (retrieved == null) {
    // your code here.
  } else {
    var countriesIndexes = retrieved.split("$")[9];
    console.log("countriesIndexes"); console.log(countriesIndexes);
    var countriesIndexesSplit = countriesIndexes.split(",");

    countriesIndexesSplit.forEach(function (element) {
      map.setFeatureState({ source: "worldCountries", id: element }, { hover: true });
    });
  }
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
  var FavSourceName = ["p1", "p2", "p3", "p4", "p5", "p6"];
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
      // console.log( e.result.geometry )
      map.getSource(item).setData(e.result.geometry)
      var resultCoord = e.result.geometry.coordinates
      resultCoord = resultCoord[1] + "," + resultCoord[0]

      if (i !== -1) {
        listPOIcoord[i] = resultCoord;
      }
      
      let FavCity = {
        tax_slug: jQuery( `._${item}` ).data( 'tax-slug' ),
        place_name: e.result.place_name,
        geometry: e.result.geometry
      }
      FavoriteCity[item] = FavCity //e.result.geometry
      map.setLayoutProperty( item, 'visibility' )
    });

    geocoder[i].on( 'clear', ( e ) => {
      delete FavoriteCity[item]
      map.setLayoutProperty( item, 'visibility', 'none' )

      // console.log( FavoriteCity )
    } )
  });

  var listPOI = ["p1", "p2", "p3", "p4", "p5", "p6"];
  var colorPOI = ["#E45B3E", "#F7A155", "#F7D267", "#019384", "#7915D4", "#2BD4EC"];
  var listKeys = ["logA", "timestamp", "user", "password", "p1", "p2", "p3", "p4", "p5", "p6", "countries"];
  var listMapboxLayer = ["p1", "p2", "p3", "p4", "p5", "p6", "worldCountriesSum"];
  var colorPOI1 = ["#E45B3E", "#F7A155", "#F7D267", "#019384", "#7915D4", "#2BD4EC", "#333333"];

  d3.json("/wp-content/plugins/traveling-session-map/data/world-countries5.geojson", function (err, data) {
    if (err) throw err;

    // LOAD SAVED DATA FROM USERS
    // Start read data from book.csv.
    // d3.csv("/wp-content/plugins/traveling-session-map/data/Book.csv", function (err, dataCSV) {
    //   if (err) throw err;

      if (username == "downloaddataset1234") {
        download(JSON.stringify(loadedValues), filename, "txt");
      }

      let dataCSV1 = [];
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

      var passcode = dataCSV1.map(function (d) {
        return d.user;
      });

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

      function finder(search, target) {
        return search.map(function (val, index) {
          return target.filter(function (e) {
            return index === parseInt(e);
          }).length;
        });
      }

      var countedRank = finder(names, reloadStates0);

      // console.log("names"); console.log(names); //names is countries list.
      //console.log("reloadStates0"); console.log(reloadStates0);
      //console.log("countedRank"); console.log(countedRank);

      document.getElementById("d1").innerHTML = reloadStates0.length;

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

      // SAVE BUTTON FUNCTION
      jQuery("#saveButton").click(function () {
        return;
        var dateNow = Date.now();

        listPOIcoord.forEach(function (element, i) {
          //hoverCountries.push(element);
          hoverCountries[i + 3] = element;
        });
        hoverCountries[10] = dateNow;

        hoverCountries[1] = username;

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
        console.log("tudo"); console.log(tudo);

        tudo.forEach(function (item, index) {
          item = parseFloat(item);
          map.setFeatureState({ source: "worldCountries", id: item }, { hover: true });
        });

        var listCountries = [];
        totalIndex.forEach(function (item, index) {
          var state = map.getFeatureState({ source: "worldCountries", id: item }, "hover");

          if (state.hover === true) {
            hoverStatus.push(state.hover);
            listCountries.push(totalIndex[item]);
          }
        });

        var indexHovered = listCountries.join(",");
        console.log("indexHovered"); console.log(indexHovered);

        hoverCountries[9] = indexHovered;

        //set in local storage
        localStorage.setItem(getpass, hoverCountries.join("$"));
        console.log("hoverCountries"); console.log(hoverCountries.join("$"));

        document.getElementById("d1").innerHTML = hoverStatus.length;
      });

      // jQuery(function () {
      //   jQuery("select").bsMultiSelect();
      // });

      //ADD COUNTRIES LEVELS
      map.addSource("worldCountries", {
        type: "geojson",
        data: data,
      });

      WorldCountries_Layer = map.addLayer(
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
      //console.log("pill"); console.log(pill);

      // var midRank = (maxRank - minRank) / 2;
      // console.log(minRank + " + " + maxRank);

      var po = maxRank;

      WorldCountriesSum_Layer = map.addLayer(
        {
          id: "worldCountriesSum",
          type: "fill",
          // source: "worldCountries",
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
        map.on("click", "worldCountries", function (e) { console.log( e )
          var hoverStatus = [];
          totalIndex.forEach(function (item, index) {
            var state = map.getFeatureState({ source: "worldCountries", id: item }, "hover");

            if (state.hover === true) {
              hoverStatus.push(state.hover);
              // console.log(e, item, state)
            }
          });

          if (e.features.length > 0) {
            map.setFeatureState({ source: "worldCountries", id: hoveredStateId }, { hover: value });
          }

          document.getElementById("d1").innerHTML = hoverStatus.length;
        });
      }

      map.on("mousemove", "worldCountries", function (e) { 
        // console.log( e.features )
        map.getCanvas().style.cursor = "pointer";
        hoveredStateId = e.features[0].id;

        var state = map.getFeatureState({ source: "worldCountries", id: hoveredStateId }, "hover");

        var stateVal = state.hover;
        // if (stateVal === false) {
        //   clickCountry(true);
        // } else {
        //   clickCountry(false);
        // }
      });

      const SelectStateHandle = ( option, value ) => {
        const StateID = parseInt( option.value )

        if( value ) { CountrySelected.push( StateID ) } // add
        else { CountrySelected.splice( CountrySelected.indexOf( StateID ) , 1 ) } // remove

        map.setFeatureState( { source: 'worldCountries', id: StateID }, { hover: value } )
        option.selected = value
        UpdateTotalCountriesNumber()
      }

      const LoadDataInit = async () => {
        let Country = []
        let Favorite = {}

        /**
         * load data by localStorage
         */
        const CacheDataMap_String = localStorage.getItem( 'CacheDataMap' )
        if( CacheDataMap_String ) {
          const CacheDataMap = JSON.parse( CacheDataMap_String )
          Country = CacheDataMap.CountrySelected
          Favorite = CacheDataMap.FavoriteCity
        } 

        /**
         * Load data by DB
         */
        const Result = await jQuery.ajax( {
          type: 'POST',
          url: TRSS_MAP_OBJ.ajax_url,
          data: {
            action: 'tsm_ajax_load_user_map_data',
          },
          error ( e ) {
            console.log( e )
          }
        } )

        if( Result.data.CountrySelected ) {
          Country = Result.data.CountrySelected.map( ( StateID ) => { return parseInt( StateID ) } )
        }

        if( Result.data.FavoriteCity ) {
          Favorite = Result.data.FavoriteCity
        }
        
        return { Country, Favorite };
      }

      const LoadInit = async () => {
        // Reset
        // localStorage.removeItem( 'CacheDataMap' )

        const { Country, Favorite } = await LoadDataInit()
        CountrySelected = Country
        FavoriteCity = Favorite

        // Load country selected
        if( CountrySelected.length ) {
          // Update select
          jQuery( 'select[name=states][multiple=multiple]' ).val( CountrySelected ).trigger( 'change' )
          
          // Update map
          CountrySelected.map( ( StateID ) => {  
            map.setFeatureState({ source: 'worldCountries', id: StateID }, { hover: true });
          } )
        }

        // Load favorite
        if( Object.keys( FavoriteCity ).length ) {
          // console.log( FavoriteCity )
          Object.keys( FavoriteCity ).map( ( item ) => {
            jQuery( `._${ item }` ).find( 'input[type=text]' ).val( FavoriteCity[ item ].place_name )
            // console.log( FavoriteCity[ item ].geometry )
            map.getSource( item ).setData( FavoriteCity[ item ].geometry )
          } )
        }
        
        // Update number state selected
        UpdateTotalCountriesNumber()
      }

      /**
       * Update total Countries selected
       */
      const UpdateTotalCountriesNumber = () => {
        document.getElementById( 'd1' ).innerHTML = CountrySelected.length;
      }

      /**
       * Init after Map ready
       */
      const _Init = () => {
        LoadInit()

        SelectState = jQuery( 'select[name=states][multiple=multiple]' ).bsMultiSelect( {
          setSelected: SelectStateHandle
        } );

        jQuery( 'select[name=states][multiple=multiple]' ).on( 'change', () => {
          SelectState.bsMultiSelect( 'Update' )
        } ).trigger( 'change' )
      }

      _Init()

      const SaveDB = async ( data ) => {
        return await jQuery.ajax( {
          type: 'POST',
          url: TRSS_MAP_OBJ.ajax_url,
          data: {
            action: 'tsm_ajax_save_map_data',
            data: data
          },
          error: ( e ) => {
            console.log( e )
          }
        } )
      }

      const Save = async function( e ) {
        e.preventDefault()
        let button = jQuery( this )
        let CacheDataMap = { CountrySelected, FavoriteCity }
        localStorage.setItem( 'CacheDataMap', JSON.stringify( CacheDataMap ) )

        button.text( 'Saving...' )
        const Result = await SaveDB( CacheDataMap )

        button.text( 'SAVE' )
      }

      jQuery( '#saveButton' ).on( 'click', Save )

      /**
       * Select Country
       */
      const SelectCountry = ( e ) => { 
        const StateID = e.features[0].id
        const _inc = CountrySelected.includes( StateID )
        
        if( true == _inc ) {
          CountrySelected.splice( CountrySelected.indexOf( StateID ) , 1 )
          map.setFeatureState( { source: 'worldCountries', id: StateID }, { hover: !_inc } )

          jQuery( 'select[name=states]' ).find( `option[value="${ StateID }"]` ).prop( 'selected', false )
          jQuery( 'select[name=states]' ).trigger( 'change' )
        } else {
          CountrySelected.push( StateID )
          map.setFeatureState( { source: 'worldCountries', id: StateID }, { hover: !_inc } )

          jQuery( 'select[name=states]' ).find( `option[value="${ StateID }"]` ).prop( 'selected', true )
          jQuery( 'select[name=states]' ).trigger( 'change' )
        }

        UpdateTotalCountriesNumber()
      }
      map.on( 'click', 'worldCountries', SelectCountry )

      let FavCityFilterCache = {}
      const DoFavCityFilter = async ( Opts ) => {
        let params = jQuery.extend( {
          Slug: ''
        }, Opts )

        /**
         * Load to from cache
         */
        if( FavCityFilterCache[ params.Slug ] ) {
          return FavCityFilterCache[ params.Slug ]
        }

        const Result = await jQuery.ajax( {
          type: 'POST',
          url: TRSS_MAP_OBJ.ajax_url,
          data: {
            action: 'tsm_ajax_get_fav_city_by_cat',
            data: {...params}
          },
        } )

        FavCityFilterCache[ params.Slug ] = Result;
        
        return Result
      }

      const BuildMarkerUI = ( opts ) => {
        const _opts = jQuery.extend( {
          icon: '',
          size: [ 40, 40 ]
        }, opts )

        let el = document.createElement( 'div' )
        el.className = 'marker'
        el.style.backgroundImage = `url(${ _opts.icon })`
        el.style.backgroundSize = `100%`
        el.style.width = _opts.size[0] + 'px'
        el.style.height = _opts.size[1] + 'px'

        return el
      }

      const FavCityListContainer = jQuery( '#Fav-City-List' )
      const BuildFavCityListUI = ( FavItem, Maker, index ) => { 
        let HtmlInner = `
        <span class="__inc-num">${ index + 1 }</span>
        <div class="fav-entry">
          <h4 class="city-name">${ FavItem._place_name }</h4>
          <div class="entry-meta">
            <div class="__by">by ${ FavItem._user_id.display_name }</div>
            <div class="__geometry">${ FavItem.geometry.coordinates.join( ', ' ) }</div>
          </div>
        </div>`

        let el = jQuery( '<div>', {
          class: '__fav-city-item',
          html: HtmlInner
        } )

        FavCityListContainer.append( el )
      }

      const FavCityShowing = ( data ) => {
        const SourceMap = { s0: 'p1', s1: 'p2', s2: 'p3', s3: 'p4', s4: 'p5', s5: 'p6' }

        data.map( ( item, index ) => {
          let el = BuildMarkerUI( {
            icon: item._icon
          } )

          // create the popup
          let popup = new mapboxgl.Popup({ offset: 20 }).setText( `
          ${ item._place_name } — by ${ item._user_id.display_name }` );

          let Marker = new mapboxgl.Marker( el )
            .setLngLat( item.geometry.coordinates )
            .setPopup( popup )
            .addTo( map )
            
          FavCityFilterMarker.push( Marker )
          BuildFavCityListUI( item, Marker, index )
        } )
        
      }

      const FavCityFilter = async function( e ) {
        e.preventDefault()
        const button = jQuery( this )
        const [ Label, Slug ] = [ button.text(), button.val() ]

        const Result = await DoFavCityFilter( { Slug } )

        if( ! Result.success ) {
          alert( 'Error!' )
          return;
        }
        
        /**
         * Remove avaiable marker old
         */
        if( FavCityFilterMarker.length ) {
          FavCityFilterMarker.map( ( M ) => { M.remove() } )
        }

        /**
         * Clear list fav
         */
        FavCityListContainer.empty()

        /**
         * Add new marker
         */
        FavCityShowing( Result.data )
      }
      jQuery( 'body' ).on( 'click', '._fav-filter-item', FavCityFilter )

      map.on("mouseleave", "worldCountries", function () {
        map.getCanvas().style.cursor = "";
      });
      listMapboxLayer.forEach(function (element) {
        map.setLayoutProperty(element, "visibility", "none");
      });

      const FavMakeVisible = ( visible ) => {

        if( true == visible ) {
          jQuery( '.mapboxgl-popup ' ).show()
          FavCityFilterMarker.map( ( M ) => {
            jQuery( M._element ).show()
          } )
        } else {
          jQuery( '.mapboxgl-popup ' ).hide()
          FavCityFilterMarker.map( ( M ) => {
            jQuery( M._element ).hide()
          } )
        }
      }

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

        FavMakeVisible( false )
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

        FavMakeVisible( true )
      });
    //}); // End read data from book.csv.

    var console2Activated = document.getElementById("map-console2").style.display;
    
    /** 
    jQuery(".btn-secondary").click(function () {
      var clickedLayer = jQuery(this).val();
      var clickedLayerText = jQuery(this).text();

      var layerList = listPOI.push("worldCountriesSum");

      function checkId(id) {
        return id == clickedLayer;
      }
      document.getElementById("selectedLayer").innerHTML = clickedLayerText + " (from all users)";
      document.getElementById("selectedLayer").style.color = colorPOI1[listMapboxLayer.findIndex(checkId)];

      listMapboxLayer.forEach(function (item) {
        if (item == clickedLayer) {
          map.setLayoutProperty(item, "visibility", "visible");
        } else {
          map.setLayoutProperty(item, "visibility", "none");
        }
      });
    });
    */
  });
});
