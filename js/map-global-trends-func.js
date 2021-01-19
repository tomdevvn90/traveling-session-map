/**
 * Golobal trends helpers
 */

export const GetFavCityByCat = async ( Tax ) => {
  return await $.ajax( {
    type: 'POST',
    url: TRSS_MAP_OBJ.ajax_url,
    data: {
      action: 'tsm_ajax_get_fav_city_by_cat',
      data: {
        Slug: Tax
      }
    },
  } )
}

export const BuildFavTopLocation = ( Locations ) => {
  let Template = Locations.map( ( item, index ) => {
    return `<li>  
      <span>${ index + 1 }. </span>  
      <label title="${ Object.values( item.coordinates ).join() }">${ item.place_name }</label>
    </li>`
  } ).join( '' )
  
  return `
  <h4 class="top-global-trends-heading">Top Global Trends</h4>
  <ul class="tsm-top-fav-list">
    ${ Template }
  </ul>`
}

export const GlobalTrendsFilterSetup = async ( { Button, TaxName, Map } ) => {
  const Result = await GetFavCityByCat( TaxName )
  const Color = Button.data( 'color' )
  
  if( true != Result.success || Result.data.length == 0 ) return 

  let SourceID = `source-${ TaxName }`
  let Source = {
    type: 'FeatureCollection',
    features: []
  }

  let TopList = Result.top.length ? BuildFavTopLocation( Result.top ) : ''

  Result.data.map( ( item ) => {
    Source.features.push( {
      type: 'Feature',
      properties: {},
      geometry: item.geometry
    } )
  } )

  /**
   * Add Source
   */
  Map.addSource( SourceID, {
    'type': 'geojson',
    'data': Source
  } )

  Map.addLayer( {
    id: `${ TaxName }-heat`,
    type: 'heatmap',
    source: SourceID,
    maxzoom: 9,
    layout: {
      'visibility': 'none'
    },
    paint: {
      'heatmap-weight': [ 'interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1 ],
      'heatmap-intensity': [ 'interpolate', ['linear'], ['zoom'], 0, 1, 9, 3 ],
      'heatmap-color': [ 'interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(33,102,172,0)', 0.2, 'rgb(103,169,207)', 0.4, 'rgb(209,229,240)', 0.6, 'rgb(253,219,199)', 0.8, 'rgb(239,138,98)', 1, 'rgb(178,24,43)' ],
      'heatmap-radius': [ 'interpolate', ['linear'], ['zoom'], 0, 2, 9, 20 ],
      'heatmap-opacity': [ 'interpolate', ['linear'], ['zoom'], 7, 1, 9, 0 ]
    }
  }, 'waterway-label' )

  Map.addLayer( {
    id: `${ TaxName }-point`,
    type: 'circle',
    source: SourceID,
    // minzoom: 7,
    layout: {
      'visibility': 'none'
    },
    paint: {
      'circle-color': Color, // '#990033',
      'circle-stroke-color': 'white',
      'circle-stroke-width': 1,
    }
  }, 'waterway-label' )

  Button.removeClass( '__btn-disable' ) 
  
  Button.on( {
    '__show:heatmap' () {
      Map.setLayoutProperty( `${ TaxName }-heat`, 'visibility' )
      Map.setLayoutProperty( `${ TaxName }-point`, 'visibility' )

      $( '#Fav-City-List' ).html( TopList )
    },
    '__hide:heatmap' () {
      Map.setLayoutProperty( `${ TaxName }-heat`, 'visibility', 'none' )
      Map.setLayoutProperty( `${ TaxName }-point`, 'visibility', 'none' )
    }
  } )
  
  Button.on( 'click', function() {
    let self = $( this )
    $( '#Fav-City-List' ).empty()

    self
      .toggleClass( '__is-active' )
      .siblings()
      .not( '.__btn-countries-popular' )
      .removeClass( '__is-active' )

    $( '._fav-filter-item' ).each( function() {

      if( $( this ).hasClass( '__is-active' ) ) {
        $( this ).trigger( '__show:heatmap' )
      } else {
        $( this ).trigger( '__hide:heatmap' )
      }
    } )
  } )
}