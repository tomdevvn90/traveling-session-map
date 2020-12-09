<?php 
/**
 * Custom Post Type Register
 * 
 */

/**
 * Register custom posttype Favorite City
 * 
 */
function tsm_favorite_city_cpt() {
  $args = [
    'public' => true,
    'label' => __( 'Favorite City' ),
    'menu_icon' => 'dashicons-location-alt',
    'supports'=> [ 'title', 'author', 'thumbnail' ],
  ];
  register_post_type( 'favorite-city', $args );
}

add_action( 'init', 'tsm_favorite_city_cpt' );