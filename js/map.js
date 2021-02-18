/**
 * Map
 */

import { shadeColor, randomGeo } from './helpers'
import { GetFavCityByCat, GlobalTrendsFilterSetup } from './map-global-trends-func'

/**
 * Tooltip
 */
import tippy from 'tippy.js'

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
  let FavCityFilterCache = {}
  let FavCityListContainer = null
  let CountriesPopular = []

  /**
   * Map
   */
  let MapToolsWrap = $( '.map-tools-container' )
  let MapCenter = [ -53.842, 34.691 ];
  let MapZoom = 1.95;
  let MapLayers = [
    () => {
      let ColorSelected = '#EFAA7B'
      return {
        id: 'WorldCountries',
        type: 'fill',
        source: 'states',
        layout: {
          'visibility': 'visible'
        },
        paint: {
          'fill-color': ['case', ['boolean', ['feature-state', 'hover'], false], ColorSelected, '#ffffff'],
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.8, 0.001],
        },
        'fill-opacity': 0.4,
      }
    },
    ( min, max ) => {

      let OldColorRank = TRSS_MAP_OBJ.map_colors ? TRSS_MAP_OBJ.map_colors.map( item => item.color ) : ["#E45B3E", "#F7A155", "#F7D267", "#019384", "#7915D4", "#2BD4EC", "#333333"]; // ["#E45B3E", "#F7A155", "#F7D267", "#019384", "#7915D4", "#2BD4EC"]
      let FillColorPrimaty = '#EFAA7B'
      let RankStep = OldColorRank.length - 1; // 8

      const ColorRankRender = ( Color, Step, Max ) => {
        let FillColorRank = []
        if( Max <= Step ) {
          for( let i = 1; i <= Step; i++ ) {
            FillColorRank.push( i )
            let ColorRank = (i == 0) ? Color : shadeColor( Color, ((i * 4) * -1) )
            // FillColorRank.push( [ 'to-color', ColorRank ] )
            FillColorRank.push( [ 'to-color', OldColorRank[ i - 1 ] ] )
          }
        } else {
          for( let i = 1; i <= Step; i++ ) {
            FillColorRank.push( (Max / Step) * i )
            let ColorRank = (i == 0) ? Color : shadeColor( Color, ((i * 4) * -1) )
            // FillColorRank.push( [ 'to-color', ColorRank ] )
            FillColorRank.push( [ 'to-color', OldColorRank[ i - 1 ] ] )
          }
        }

        return FillColorRank
      }

      return {
        id: 'WorldCountriesPopular',
        type: 'fill',
        source: 'CountriesPopular',
        layout: {
          'visibility': 'none'
        },
        paint: {
          'fill-color': [ 'interpolate', ['linear'], ['get', 'countedRank'], ...ColorRankRender( FillColorPrimaty, RankStep, max ) ],
          'fill-opacity': [ 'match', ['get', 'countedRank'], [0], 0, .8 ],
        },
        'fill-opacity': 0.4,
      }
    },
  ]

  const MapStyle = {
    streets: 'mapbox://styles/mapbox/streets-v11',
    light: 'mapbox://styles/mapbox/light-v10',
    dark: 'mapbox://styles/mapbox/dark-v10',
    other: 'mapbox://styles/vincenzo-m/ckdr7gxlu0pcq19nluy0jwd3n'
  }

  let Map = new mapboxgl.Map( {
    container: 'traveling-session-map',
    style: MapStyle.light,
    center: MapCenter,
    zoom: MapZoom,
    attributionControl: false,
  } )

  Map.addControl(
    new mapboxgl.AttributionControl( {
      customAttribution: '<a href="https://travelingsession.com/" target="_blank";">© My Travel Sessions</a>',
    } )
  )

  /**
   * Have issue reset all script apply for layer
   */
  const SwitchMapStyle = ( Style ) => {
    Map.setStyle( Style )
  }

  const LoadStateMapData = async () => {
    const Result = await $.get( TRSS_MAP_OBJ.mapbox_world_countries_json_url )
    return JSON.parse( Result )
  }

  const LoadUserCountriesSelected = async () => {
    const Result = await $.ajax( {
      type: 'POST',
      url: TRSS_MAP_OBJ.ajax_url,
      data: {
        action: 'tsm_ajax_get_user_country_selected'
      },
      error ( e ) {
        alert( 'Internal Error: Please reload page!' )
        console.log( e )
      }
    } )

    return Result
  }

  const CountriesPopularHandle = async ( StateData ) => {
    /**
     * Get Countries Popular
     */
    const { success, data } = await LoadUserCountriesSelected()
    CountriesPopular = data

    let CountriesPopularSource = {
      'type': 'FeatureCollection',
      'features': []
    }

    /**
     * Set countedRank
     */
    StateData.features.map( ( State ) => {

      if( CountriesPopular[ parseInt( State.id ) ] ) {
        let properties = State.properties
        let geometry = State.geometry
        properties.countedRank = CountriesPopular[ parseInt( State.id ) ] || 0

        CountriesPopularSource.features.push( {
          id: State.id,
          type: 'Feature',
          properties,
          geometry
        } )
      }
    } )

    Map.addSource( 'CountriesPopular', {
      'type': 'geojson',
      'data': CountriesPopularSource
    } )

    /**
     * Countries Popular layer
     */
    Map.addLayer( MapLayers[ 1 ]( 0, Math.max( ...Object.values( CountriesPopular ) ) ), 'natural-line-label' )
  }

  const MapInit = async () => {
    /**
     * Set
     */
    FavCityListContainer = $( '#Fav-City-List' )

    /**
     * Get data
     */
    const StateData = await LoadStateMapData()

    /**
     * Countries Popular Handle
     */
    await CountriesPopularHandle( StateData )

    /**
     * Add Source
     */
    Map.addSource( 'states', {
      'type': 'geojson',
      'data': StateData
    } )

    /**
     * My Favorite Layer
     */
    Map.addLayer( MapLayers[ 0 ](), 'natural-line-label' )
    Map.on( 'click', 'WorldCountries', SelectCountry )

    /**
     * Load map data init
     */
    await LoadInit()

    /**
     * Countries Popular Layer Show/Hide
     */
    $( '.__btn-countries-popular' ).on( 'click', function() {
      $( this ).toggleClass( '__is-active' )
      MapLayerDisplayControl( false, false, $( this ).hasClass( '__is-active' ), true )
    } )

    /**
     * Filter
     */
    // $( '._fav-filter-item' ).on( 'click', FavCityFilter )

    $( '._fav-filter-item' ).each( function() {
      let Button = $( this )
      let TaxName = Button.val()
      GlobalTrendsFilterSetup( { Button, TaxName, Map } )
    } )

    /**
     * Hide loader
     */
    $( '.loader' ).hide()
    $( '#trss-map-page' ).removeClass( '__lock-init' )

    /**
     *
     */
    AutoOpenMapToolDesktop()
  }

  Map.on( 'load', MapInit )

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

  /**
   * Load data init
   */
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
    const Result = await $.ajax( {
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
      $( 'select[name=states][multiple=multiple]' ).val( CountrySelected ).trigger( 'change' )

      // Update map
      CountrySelected.map( ( StateID ) => {
        Map.setFeatureState({ source: 'states', id: StateID }, { hover: true });
      } )
    }

    // Load favorite
    if( Object.keys( FavoriteCity ).length ) {
      Object.keys( FavoriteCity ).map( ( key ) => {
        let data =  FavoriteCity[ key ]
        $( `.__mapbox-geocode-field-container[data-item-key=${ key }]` ).trigger( '__MakeMarkerDefault:MyFav', [ data ] )
      } )
    }

    // Update number state selected
    UpdateTotalCountriesNumber()
  }

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
   * Map layers display control
   *
   * @param {*} MyCountries
   * @param {*} MyFav
   * @param {*} CountriesPopular
   * @param {*} FavFilter
   */
  const MapLayerDisplayControl = ( MyCountries = true, MyFav = true, CountriesPopular = false, FavFilter = false ) => {
    /**
     * My Contries Selected
     */
    if( MyCountries ) {
      Map.setLayoutProperty( 'WorldCountries', 'visibility' )
    } else {
      Map.setLayoutProperty( 'WorldCountries', 'visibility', 'none' )
    }
    /**
     * End - My Contries Selected
     */

    /**
     * My Favorites
     */
    if( MyFav ) {
      $( '.__mapbox-geocode-field-container' ).each( function() {
        let Marker = $( this ).data( 'marker' )
        if( ! Marker ) return

        $( Marker._element ).css( 'display', 'block' )
      } )
    } else {
      $( '.__mapbox-geocode-field-container' ).each( function() {
        let Marker = $( this ).data( 'marker' )
        if( ! Marker ) return

        $( Marker._element ).css( 'display', 'none' )
      } )
    }
    /**
     * End - My Favorites
     */

    /**
     * Countries Popular
     */
    if( CountriesPopular ) {
      Map.setLayoutProperty( 'WorldCountriesPopular', 'visibility' )
    } else {
      Map.setLayoutProperty( 'WorldCountriesPopular', 'visibility', 'none' )
    }
    /**
     * End - Countries Popular
     */

    /**
     * Fav Filter
     */
    if( FavFilter ) {
      FavCityFilterMarker.map( ( Marker ) => {
        $( Marker._element ).css( 'display', 'block' )
      } )

      $( '.mapboxgl-popup' ).show()
    } else {
      FavCityFilterMarker.map( ( Marker ) => {
        $( Marker._element ).css( 'display', 'none' )
      } )

      $( '.mapboxgl-popup' ).hide()
    }
    /**
     * End - Fav Filter
     */
  }

  /**
   * Changed tab is My Travels
   */
  const isMyTravelsTabHandle = () => {
    MapLayerDisplayControl( true, true, false, false )
  }

  /**
   * Changed tab is Global Trends
   */
  const isGlobalTrendsTabHandle = () => {
    let CountriesPopular = $( '.__btn-countries-popular' ).hasClass( '__is-active' )
    MapLayerDisplayControl( false, false, CountriesPopular, true )
  }

  const SelectMapStateUI = () => {
    SelectState = w.jQuery( '#Map-State' ).bsMultiSelect( {
      setSelected: SelectStateHandle
    } );

    $( '#Map-State' ).on( 'change', () => {
      SelectState.bsMultiSelect( 'Update' )
    } ).trigger( 'change' )
  }

  const MakeMarker = ( data, dataUI ) => {
    let el = BuildMarkerUI( {
      icon: dataUI.Icon,
    } )
    // console.log( randomGeo( data.geometry.coordinates ) )
    let Geo = randomGeo( data.geometry.coordinates.map( ( num ) => { return parseFloat( num ) } ) )
    return new mapboxgl.Marker( el )
      .setLngLat( Geo )
      .addTo( Map )
  }

  const GeoCoderFieldHandle = () => {

    const _onResult = ( e, c ) => {
      let Marker = MakeMarker( e.result, {
        Icon: c.data( 'icon' ),
      } )
      let TaxSlug = c.data( 'tax-slug' )
      let Key = c.data( 'item-key' )
      let OldMarker = c.data( 'marker' )

      if( OldMarker ) OldMarker.remove()
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

      Container.on( {
        '__MakeMarkerDefault:MyFav' ( e, GeocoderData ) {
          // console.log( GeocoderData )
          let _Marker = MakeMarker( GeocoderData, {
            Icon: Container.data( 'icon' )
          } )
          Container.data( 'marker', _Marker )
          Container.find( 'input.mapboxgl-ctrl-geocoder--input' ).val( GeocoderData.place_name )
        }
      } )

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
   * Filter Fav City
   */
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

    const  Result = await GetFavCityByCat( params.Slug )
    FavCityFilterCache[ params.Slug ] = Result
    return Result
  }

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

    let el = $( '<div>', {
      class: '__fav-city-item',
      html: HtmlInner
    } )

    FavCityListContainer.append( el )
  }

  const BuildMarkerUI = ( opts ) => {
    const _opts = $.extend( {
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

  const FavCityShowing = ( data ) => {

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
        .addTo( Map )

      FavCityFilterMarker.push( Marker )
      BuildFavCityListUI( item, Marker, index )
    } )
  }

  const FavCityFilter = async function( e ) {

    e.preventDefault()
    let button = $( this )
    let [ Slug ] = [ button.val() ]

    button
      .addClass( '__is-active' )
      .siblings()
      .not( '.__btn-countries-popular' )
      .removeClass( '__is-active' )

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

      button.text( 'SAVING...' )
      await _SaveDB( CacheDataMap )
      button.text( 'SAVE' )
    }

    const _SaveDB = async ( Data ) => {
      return await $.ajax( {
        type: 'POST',
        url: TRSS_MAP_OBJ.ajax_url,
        data: {
          action: 'tsm_ajax_save_map_data',
          data: Data
        },
        error: ( e ) => {
          alert( 'Internal Error: Please try again!' )
          console.log( e )
        }
      } )
    }

    $( '#saveButton' ).on( 'click', function( e ) {
      e.preventDefault()
      let button = $( this )

      _SaveLocal( button )
    } )
  }

  const ToggleMapTools = () => {
    $( '.__toggle-map-tool' ).on( 'click', function( e ) {
      e.preventDefault()
      let self = $( this )

      self.toggleClass( 'active' )

      if( self.hasClass( 'active' ) ) {
        $( '#trss-map-page' ).addClass( '__map-tools-show' )
      } else {
        $( '#trss-map-page' ).removeClass( '__map-tools-show' )
      }
    } )
  }

  const AutoOpenMapToolDesktop = () => {

    if( $( w ).innerWidth() <= 980 ) return
    $( '.__toggle-map-tool' ).addClass( 'active' )
    $( '#trss-map-page' ).addClass( '__map-tools-show' )
  }

  const DoTooltip = () => {
    tippy( '.__fav-citys-filter-buttons > .btn', {
      zIndex: 99999,
      placement: 'bottom', // https://atomiks.github.io/tippyjs/v6/all-props/#offset
      arrow: true,
      theme: 'material',
      onCreate ( instance ) {
        /**
         * Remove title attr
         */
        $( instance.reference ).removeAttr( 'title' )
      }
    } )
  }

  /**
   * Ready
   */
  const Ready = () => {
    MapTools()
    Save()
    ToggleMapTools()
    DoTooltip()
  }

  /**
   * DOM Ready
   */
  $( Ready )

  /**
   * Browser load completed
   */
  $( w ).on( 'load', () => {

  } )

} )( window, jQuery )

module.exports = {}
