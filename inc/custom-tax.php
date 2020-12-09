<?php 
/**
 * Custom taxonomy
 */

function tsm_favorite_city_tax() {
  $args = [
    'public' => false,
    'hierarchical' => false,
    'label' => __( 'Category' ),
    'show_ui' => true,
    'show_admin_column' => true,
    'rewrite' => [ 'slug' => 'favorite-city-cat' ],
  ];

  register_taxonomy( 'favorite-city-cat', 'favorite-city', $args );
}

add_action( 'init', 'tsm_favorite_city_tax', 50 );