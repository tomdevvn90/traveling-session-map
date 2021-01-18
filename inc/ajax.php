<?php
/**
 * Ajax
 */

/**
 * Save Map Data 
 * 
 */
function tsm_ajax_save_map_data() {
  # Check use logged
  $userID = get_current_user_id();
  if( empty( $userID ) ) return;

  $CountrySelected = $_POST['data']['CountrySelected'];
  $FavoriteCity = $_POST['data']['FavoriteCity'];

  update_user_meta( $userID, 'CountrySelected', $CountrySelected );
  update_user_meta( $userID, 'FavoriteCity', $FavoriteCity );

  tsm_save_fav_city( $FavoriteCity );
}

add_action( 'wp_ajax_tsm_ajax_save_map_data', 'tsm_ajax_save_map_data' );
add_action( 'wp_ajax_nopriv_tsm_ajax_save_map_data', 'tsm_ajax_save_map_data' );

function tsm_ajax_load_user_map_data() {
  # Check use logged
  $userID = get_current_user_id();
  if( empty( $userID ) ) {
    wp_send_json( [
      'success' => true,
      'data' => false
    ] );
  }

  $data = tsm_load_user_map_data( $userID );
  wp_send_json( [
    'success' => true,
    'data' => $data
  ] );
}

add_action( 'wp_ajax_tsm_ajax_load_user_map_data', 'tsm_ajax_load_user_map_data' );
add_action( 'wp_ajax_nopriv_tsm_ajax_load_user_map_data', 'tsm_ajax_load_user_map_data' );

function tsm_ajax_get_fav_city_by_cat() {
  $Slug = $_POST[ 'data' ][ 'Slug' ];
  $FavCity = tsm_get_fav_city_by_cat( $Slug );

  wp_send_json( [
    'success' => true,
    'data' => $FavCity,
    'top' => tsm_get_top_location_by_cat( $Slug )
  ] );
}

add_action( 'wp_ajax_tsm_ajax_get_fav_city_by_cat', 'tsm_ajax_get_fav_city_by_cat' );
add_action( 'wp_ajax_nopriv_tsm_ajax_get_fav_city_by_cat', 'tsm_ajax_get_fav_city_by_cat' );

function tsm_ajax_get_user_country_selected() {
  wp_send_json( [
    'success' => true,
    'data' => tsm_build_countries_count( tsm_get_user_country_selected() ),
  ] );
}

add_action( 'wp_ajax_tsm_ajax_get_user_country_selected', 'tsm_ajax_get_user_country_selected' );
add_action( 'wp_ajax_nopriv_tsm_ajax_get_user_country_selected', 'tsm_ajax_get_user_country_selected' );