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
  let FavCityFilterCache = {}
  let FavCityListContainer = null
  
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
     * Set
     */
    FavCityListContainer = $( '#Fav-City-List' )

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

    /**
     * Load map data init
     */
    await LoadInit()

    /**
     * Filter 
     */
    $( '._fav-filter-item' ).on( 'click', FavCityFilter )

    /**
     * Hide loader
     */
    $( '.loader' ).hide()
  }

  Map.on( 'load', MapInit )

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
      // console.log( FavoriteCity )
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
   * Changed tab is My Travels
   */
  const isMyTravelsTabHandle = () => {
    Map.setLayoutProperty( 'WorldCountries', 'visibility' )

    $( '.__mapbox-geocode-field-container' ).each( function() {
      let Marker = $( this ).data( 'marker' )
      if( ! Marker ) return 

      $( Marker._element ).css( 'display', 'block' )
    } )

    /**
     * hiden Fav Marker
     */
    FavCityFilterMarker.map( ( Marker ) => {
      $( Marker._element ).css( 'display', 'none' )
    } )

    $( '.mapboxgl-popup' ).hide()
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

    /**
     * hiden Fav Marker
     */
    FavCityFilterMarker.map( ( Marker ) => {
      $( Marker._element ).css( 'display', 'block' )
    } )

    $( '.mapboxgl-popup' ).show()
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
    // let el = document.createElement( 'div' )
    // el.className = 'marker'
    // el.style.backgroundImage = `url(${ dataUI.Icon })`
    // el.style.backgroundSize = `100%`
    // el.style.width = 40 + 'px'
    // el.style.height = 40 + 'px'
    let el = BuildMarkerUI( {
      icon: dataUI.Icon,
    } )

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
        '__MakeMarkerDefault:MyFav' ( e, GeocoderData ) { console.log( GeocoderData )
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

    const Result = await $.ajax( {
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