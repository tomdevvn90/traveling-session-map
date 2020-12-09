<?php
/**
 * Shortcodes
 */

 /**
  * My Travel Sessions map
  */
 add_shortcode( 'my_travel_sessions_map', 'my_travel_sessions_map_func' );
 function my_travel_sessions_map_func( $atts, $content = "" ) {
    $output = my_travel_sessions_map_template();
    return $output;
 }
?>
