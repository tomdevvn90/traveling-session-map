/**
 * Toggle UI Script
 */

;( ( w, $ ) => {
  'use trict'

  const ToggleUI = function( el, opts ) {
    const _self = $( el )
    const _opts = $.extend( {

    }, opts )

    let isHandle = false

    _self.on( {
      '__open:ToggleUI' ( e ) {
        _self.find( '.__toggle-content' ).stop( true, true ).slideDown( 'slow', () => {
          _self.addClass( '__is-open' )
          isHandle = false
        } )
      },
      '__close:ToggleUI' ( e ) {
        _self.find( '.__toggle-content' ).stop( true, true ).slideUp( 'slow', () => {
          _self.removeClass( '__is-open' )
          isHandle = false
        } )
      }
    } )

    _self.on( 'click', '.__toggle-heading', function( e ) {
      e.preventDefault()
      if( isHandle == true ) return 
      
      if( _self.hasClass( '__is-open' ) ) {
        _self.trigger( '__close:ToggleUI' )
      } else {
        console.log( 'is close' )
        _self.trigger( '__open:ToggleUI' )
      }

      isHandle = true
    } )
  }

  const Ready = () => {
    $( '.__is-toggle' ).each( function() {
      new ToggleUI( this )
    } )
  }

  $( Ready )

} )( window, jQuery )

module.exports = {}