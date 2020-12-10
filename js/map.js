/**
 * Map 
 */

;( ( w, $ ) => {
  'use strict'

  /**
   * Mapbox token
   */
  mapboxgl.accessToken = 'pk.eyJ1IjoidmluY2Vuem8tbSIsImEiOiJja2RyN3lyaGIxYms3MnJ0YWQzY285b2hjIn0.ABcpXPdCt_vOXrLx0ox1bg'

  /**
   * Global Variables 
   */
  let SelectState = null
  let GeoCoderFields = []
  let CountrySelected = []
  let FavoriteCity = {}
  let FavCityFilterMarker = []
  
  /**
   * Map
   */
  let MapToolsWrap = $( '.map-tools-container' )
  let MapCenter = [-53.842, 34.691];
  let MapZoom = 1.95;
  let MapLayers = [
    {
      id: 'WorldCountries',
      type: 'fill',
      source: 'states',
      layout: {
        'visibility': 'visible'
      },
      paint: {
        "fill-color": ["case", ["boolean", ["feature-state", "hover"], false], "#0071A4", "#ffffff"],
        "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.8, 0.001],
      },
      'fill-opacity': 0.4,
    }
  ]

  let Map = new mapboxgl.Map( {
    container: 'traveling-session-map', 
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: MapCenter,
    zoom: MapZoom,
  } );

  const LoadStateMapData = async () => {
    const Result = await $.get( TRSS_MAP_OBJ.mapbox_world_countries_json_url )
    return JSON.parse( Result )
  }

  const MapInit = async () => {
    /**
     * Hide loader
     */
    $( '.loader' ).hide()

    /**
     * Get data
     */
    const StateData = await LoadStateMapData()
    
    /**
     * Add Source
     */
    Map.addSource( 'states', {
      'type': 'geojson',
      'data': StateData
    } )

    /**
     * Add Map Layer
     */
    MapLayers.forEach( ( param ) => {
      Map.addLayer( { ...param }, 'natural-line-label' )
    } )

    /**
     * Select Country
     */
    const SelectCountry = ( e ) => {
      let StateID = e.features[0].id
      let _inc = CountrySelected.includes( StateID )
        
      if( true == _inc ) {
        CountrySelected.splice( CountrySelected.indexOf( StateID ) , 1 )
        Map.setFeatureState( { source: 'states', id: StateID }, { hover: !_inc } )
      } else {
        CountrySelected.push( StateID )
        Map.setFeatureState( { source: 'states', id: StateID }, { hover: !_inc } )
      }

      $( '#Map-State' ).find( `option[value="${ StateID }"]` ).prop( 'selected', !_inc )
      $( '#Map-State' ).trigger( 'change' )

      UpdateTotalCountriesNumber()
    }
    Map.on( 'click', 'WorldCountries', SelectCountry )
  }

  Map.on( 'load', MapInit )

  /**
   * Map Tools control
   */
  const MapToolsControlTab = () => {
    MapToolsWrap.on( {
      '__onChange:Tab' ( e, func ) {
        MapToolsWrap.onChangeTabCallback = MapToolsWrap.onChangeTabCallback || []
        MapToolsWrap.onChangeTabCallback.push( func )
      }
    } )

    MapToolsWrap.on( 'click', '.tab-heading [data-tab-name]', function( e ) {
      e.preventDefault()
      const Name = $( this ).data( 'tab-name' )

      $( this )
        .addClass( 'active' )
        .siblings() 
        .removeClass( 'active' )

      MapToolsWrap
        .find( `.tab-body .__tab-item[data-tab-body-name=${ Name }]` )
        .addClass( '__is-active' )
        .siblings()
        .removeClass( '__is-active' )

      /**
       * Callback 
       */
      if( MapToolsWrap.onChangeTabCallback && MapToolsWrap.onChangeTabCallback.length ) {
        MapToolsWrap.onChangeTabCallback.map( func => {
          func.call( null, Name )
        } )
      }
    } )

    return MapToolsWrap;
  }

  /**
   * Changed tab is My Travels
   */
  const isMyTravelsTabHandle = () => {
    Map.setLayoutProperty( 'WorldCountries', 'visibility' )

    $( '.__mapbox-geocode-field-container' ).each( function() {
      let Marker = $( this ).data( 'marker' )
      if( ! Marker ) return 

      $( Marker._element ).css( 'display', 'block' )
    } )
  }
 
  /**
   * Changed tab is Global Trends
   */
  const isGlobalTrendsTabHandle = () => {
    Map.setLayoutProperty( 'WorldCountries', 'visibility', 'none' )
    
    $( '.__mapbox-geocode-field-container' ).each( function() {
      let Marker = $( this ).data( 'marker' )
      if( ! Marker ) return 

      $( Marker._element ).css( 'display', 'none' )
    } )
  }

  const SelectMapStateUI = () => {
    SelectState = $( '#Map-State' ).bsMultiSelect( {
      setSelected: SelectStateHandle
    } );

    $( '#Map-State' ).on( 'change', () => {
      SelectState.bsMultiSelect( 'Update' )
    } ).trigger( 'change' )
  }

  const MakeMarker = ( data, dataUI ) => {
    let el = document.createElement( 'div' )
    el.className = 'marker'
    el.style.backgroundImage = `url(${ dataUI.Icon })`
    el.style.backgroundSize = `100%`
    el.style.width = 50 + 'px'
    el.style.height = 50 + 'px'

    return new mapboxgl.Marker( el )
      .setLngLat( data.geometry.coordinates )
      .addTo( Map );
  }

  const GeoCoderFieldHandle = () => {

    const _onResult = ( e, c ) => {
      let Marker = MakeMarker( e.result, {
        Icon: c.data( 'icon' ),
      } )
      let TaxSlug = c.data( 'tax-slug' )
      let Key = c.data( 'item-key' )
      c.data( 'marker', Marker )

      // Save Fav City
      let FavCity = {
        tax_slug: TaxSlug,
        place_name: e.result.place_name,
        geometry: e.result.geometry
      }

      FavoriteCity[Key] = FavCity
    }

    const _onClear = ( e, c ) => {
      let Key = c.data( 'item-key' )
      let Marker = c.data( 'marker' )

      if( ! Marker ) return

      delete FavoriteCity[Key]
      Marker.remove()
    }

    $( '.__mapbox-geocode-field-container' ).each( function() {
      let Container = $( this )
      let Geocoder = new MapboxGeocoder( {
        mapboxgl: mapboxgl,
        accessToken: mapboxgl.accessToken,
        placeholder: 'Enter city',
        types: 'place',
        marker: false,
        limit: 1,
      } );

      $( this ).html( Geocoder.onAdd( Map ) )

      Geocoder.on( 'result', e => { _onResult( e, Container ) } )
      Geocoder.on( 'clear', e => { _onClear( e, Container ) } )

      Container.data( 'geocoder-obj', Geocoder )
      GeoCoderFields.push( Geocoder )
    } )
  }

  /**
   * State select field handle 
   * 
   * @param {*} option 
   * @param {*} value 
   */
  const SelectStateHandle = ( option, value ) => {
    const StateID = parseInt( option.value )

    if( value ) { CountrySelected.push( StateID ) } // add
    else { CountrySelected.splice( CountrySelected.indexOf( StateID ) , 1 ) } // remove

    Map.setFeatureState( { source: 'states', id: StateID }, { hover: value } )
    option.selected = value

    UpdateTotalCountriesNumber()
  }

  /**
   * Update total countries number UI
   */
  const UpdateTotalCountriesNumber = () => {
    $( '#d1' ).html( CountrySelected.length )
  }

  const MapTools = () => {
    MapToolsControlTab()
    SelectMapStateUI()
    GeoCoderFieldHandle()

    /**
     * After change tab handle
     */
    MapToolsWrap.trigger( '__onChange:Tab', [ ( TabName ) => {
      switch( TabName ) {
        case 'my-travels': isMyTravelsTabHandle(); break;
        case 'global-trends': isGlobalTrendsTabHandle(); break;
      }
    } ] )
  }

  const Save = () => {

    const _SaveLocal = async ( button ) => {
      let CacheDataMap = { CountrySelected, FavoriteCity }
      localStorage.setItem( 'CacheDataMap', JSON.stringify( CacheDataMap ) )

      button.text( 'Saving...' )
      await _SaveDB( CacheDataMap )
      button.text( 'SAVE' )
    }

    const _SaveDB = async ( Data ) => {

    }

    $( '#saveButton' ).on( 'click', function( e ) {
      e.preventDefault()
      let button = $( this )

      _SaveLocal( button )
    } )
  }

  /**
   * Ready
   */
  const Ready = () => {
    MapTools()
    Save()
  }

  /**
   * DOM Ready
   */
  $( Ready )

} )( window, jQuery )

module.exports = {}