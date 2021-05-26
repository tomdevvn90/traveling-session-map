<?php
/**
 * Helpers
 *
 */

/**
 * Create map page
 */
function trss_plugin_page_template( $page_template ){
    if ( is_page( 'my-travel-sessions-map' ) ) {
        $page_template = TRSSMAP_DIR . '/templates/traveling-session-map.php';
    }
    return $page_template;
}

/**
 * Add content in head
 */
function trss_plugin_head_import_css_javascript() {
    if ( ! is_page( 'my-travel-sessions-map' ) ) return false;
    ?>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
    <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.1/mapbox-gl-geocoder.css' type='text/css' />
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.css" />
    <link rel="stylesheet" href="<?php echo TRSSMAP_URI; ?>css/style.css" />
    <?php
}

/**
 * Add content in footer
 */
function trss_plugin_footer_import_css_javascript() {
    if ( ! is_page( 'my-travel-sessions-map' ) ) return false;
    ?>
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.js"></script>
    <script src='https://unpkg.com/@turf/turf/turf.min.js'></script>
    <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.1/mapbox-gl-geocoder.min.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script> -->
    <script src="//d3js.org/d3.v4.min.js" charset="utf-8"></script>
    <script src="<?php echo TRSSMAP_URI; ?>dist/js/BsMultiSelect.js"></script>
    <script src="<?php echo TRSSMAP_URI; ?>js/main.js"></script>
    <?php
}

/**
 * Favorite Search Location Template
 *
 */
function tsm_favo_list_search_html() {
    $favo_list_search = [
        [
            'key' => 's0',
            'id' => 'search0',
            'class' => '_s0',
            'icon' => TRSSMAP_URI . 'img/icons-01.png',
            'label' => 'Favorite City for Things to Do',
            'slug' => 'favorite-city-for-things-to-do',
        ],
        [
            'key' => 's1',
            'id' => 'search1',
            'class' => '_s1',
            'icon' => TRSSMAP_URI . 'img/icons-02.png',
            'label' => 'Favorite City for Nightlife',
            'slug' => 'favorite-city-for-nightlife',
        ],
        [
            'key' => 's2',
            'id' => 'search2',
            'class' => '_s2',
            'icon' => TRSSMAP_URI . 'img/icons-03.png',
            'label' => 'Favorite City for Food',
            'slug' => 'favorite-city-for-food',
        ],
        [
            'key' => 's3',
            'id' => 'search3',
            'class' => '_s3',
            'icon' => TRSSMAP_URI . 'img/icons-04.png',
            'label' => 'Most Affordable City',
            'slug' => 'most-affordable-city',
        ],
        [
            'key' => 's4',
            'id' => 'search4',
            'class' => '_s4',
            'icon' => TRSSMAP_URI . 'img/icons-05.png',
            'label' => 'City You Feel the Safest',
            'slug' => 'city-you-feel-the-safest',
        ],
        [
            'key' => 's5',
            'id' => 'search5',
            'class' => '_s5',
            'icon' => TRSSMAP_URI . 'img/icons-06.png',
            'label' => 'Top Bucket List City',
            'slug' => 'top-bucket-list-city',
        ],
    ];

    set_query_var( 'favo_list_search', $favo_list_search );
    load_template( TRSSMAP_DIR . '/templates/favo-list-search.php', false );
}

function tsm_favo_list_filter_html() {
    $favo_list_filter = [
        [
            'icon' => TRSSMAP_URI . 'img/icons-01.png',
            'label' => 'Favorite City for Things to Do',
            'slug' => 'favorite-city-for-things-to-do',
            'color' => '#e45b3e',
        ],
        [
            'icon' => TRSSMAP_URI . 'img/icons-02.png',
            'label' => 'Favorite City for Nightlife',
            'slug' => 'favorite-city-for-nightlife',
            'color' => '#f7a155',
        ],
        [
            'icon' => TRSSMAP_URI . 'img/icons-03.png',
            'label' => 'Favorite City for Food',
            'slug' => 'favorite-city-for-food',
            'color' => '#f7d267',
        ],
        [
            'icon' => TRSSMAP_URI . 'img/icons-04.png',
            'label' => 'Most Affordable City',
            'slug' => 'most-affordable-city',
            'color' => '#2d9384',
        ],
        [
            'icon' => TRSSMAP_URI . 'img/icons-05.png',
            'label' => 'City You Feel the Safest',
            'slug' => 'city-you-feel-the-safest',
            'color' => '#7915d4',
        ],
        [
            'icon' => TRSSMAP_URI . 'img/icons-06.png',
            'label' => 'Top Bucket List City',
            'slug' => 'top-bucket-list-city',
            'color' => '#47d4ec',
        ],
    ];

    set_query_var( 'favo_list_filter', $favo_list_filter );
    load_template( TRSSMAP_DIR . '/templates/favo-list-filter.php', false );
}

/**
 * Search Favorite City
 *
 * @param array $args
 */
function tms_search_fav_city( $args = [] ) {
    $args = [
        'post_type' => 'favorite-city',
        'meta_query' => [
            'relation' => 'AND',
            [
                'key' => 's_key',
                'value' => $args[ 's_key' ],
            ],
            [
                'key' => 'user_id',
                'value' => $args[ 'user_id' ],
            ],
        ],
    ];
    $posts = get_posts( $args );
    return count( $posts ) ? $posts[0] : false;
}

/**
 * Inser new favorite
 *
 * @param string $skey
 * @param array $data
 */
function tsm_insert_post_fav( $skey, $data ) {
    $userID = get_current_user_id();

    $postID = wp_insert_post( [
        'post_title' => sprintf( '%s | %s', $userID, $data[ 'place_name' ] ),
        'post_status' => 'publish',
        'post_author' => $userID,
        'post_type' => 'favorite-city',
    ] );

    $term = get_term_by( 'slug', $data[ 'tax_slug' ], 'favorite-city-cat' );
    wp_set_post_terms( $postID, [ $term->term_id ], 'favorite-city-cat' );

    update_field( 's_key', $skey, $postID );
    update_field( 'user_id', $userID, $postID );
    update_field( 'place_name', $data[ 'place_name' ], $postID );
    update_field( 'coordinates', [
        'longitude' => $data[ 'geometry' ][ 'coordinates' ][ 0 ],
        'latitude' => $data[ 'geometry' ][ 'coordinates' ][ 1 ],
    ], $postID );

    return $postID;
}

/**
 * Update favorite
 *
 * @param int $post_id
 * @param array $data
 */
function tsm_update_post_fav( $postID, $data ) {
    $userID = get_current_user_id();

    wp_update_post( [
        'ID' => $postID,
        'post_title' => sprintf( '%s | %s', $userID, $data[ 'place_name' ] ),
    ] );

    update_field( 'place_name', $data[ 'place_name' ], $postID );
    update_field( 'coordinates', [
        'longitude' => $data[ 'geometry' ][ 'coordinates' ][ 0 ],
        'latitude' => $data[ 'geometry' ][ 'coordinates' ][ 1 ],
    ], $postID );

    return $postID;
}

/**
 * Save Favorite City
 */
function tsm_save_fav_city( $data ) {
    if( ! $data && count( $data ) <= 0 ) return;
    $userID = get_current_user_id();

    # Insert or Update Fav
    array_map( function( $key, $item ) use ( $userID ) {
        $result = tms_search_fav_city( [
            's_key' => $key,
            'user_id' => $userID
        ] );

        if( false == $result ) {
            # Add new
            tsm_insert_post_fav( $key, $item );
        } else {
            # Edit
            tsm_update_post_fav( $result->ID, $item );
        }
    }, array_keys( $data ), array_values( $data ) );

    # Remove plate not exits
    $removeItems = $result = array_diff( ['s0', 's1', 's2', 's3', 's4', 's5'], array_keys( $data ) );

    if( count( $removeItems ) ) {
        array_map( function( $skey ) use ( $userID ) {
            $result = tms_search_fav_city( [
                's_key' => $skey,
                'user_id' => $userID
            ] );

            if( $result ) {
                wp_delete_post( $result->ID, true );
            }
        }, $removeItems );
    }
}

/**
 * Get user map data
 *
 * @param int $userID
 */
function tsm_load_user_map_data( $userID ) {
    return [
        'CountrySelected' => get_user_meta( $userID, 'CountrySelected', true ),
        'FavoriteCity' => get_user_meta( $userID, 'FavoriteCity', true ),
    ];
}

/**
 * Get Favorite City by cat
 *
 * @param string $slug
 */
function tsm_get_fav_city_by_cat( $slug = '' ) {
    if( empty( $slug ) ) return [];

    $term = get_term_by( 'slug', $slug, 'favorite-city-cat' );
    $icon = get_field( 'icon', 'favorite-city-cat_' . $term->term_id );

    $args = [
        'post_type' => 'favorite-city',
        'numberposts' => -1,
        'tax_query' => [
            [
                'taxonomy' => 'favorite-city-cat',
                'field' => 'slug',
                'terms' => $slug,
            ]
        ]
    ];

    $result = get_posts( $args );

    return count( $result ) ? array_map( function( $item ) use ( $slug, $icon ) {
        $postID = $item->ID;
        $coordinates = get_field( 'coordinates', $postID );

        $item->_s_key = get_field( 's_key', $postID );
        $item->_user_id = get_field( 'user_id', $postID );
        $item->_place_name = get_field( 'place_name', $postID );
        $item->_icon = $icon;

        $item->geometry = [
            'coordinates' => array_values( $coordinates ),
            'type' => 'Point'
        ];

        return $item;
    }, $result ) : [];
}

function tsm_svg_icon( $name ) {
    $icons = require( TRSSMAP_DIR . '/inc/svg.php' );
    return ( $icons[ $name ] ) ? $icons[ $name ] : __( 'Not support icon "' . $name . '"!' );
}

function tsm_get_user_country_selected() {
    $result = get_users( [
        'meta_key' => 'CountrySelected',
        'meta_compare' => 'EXISTS'
    ] );

    if( count( $result ) ) {
        return array_map( function( $u ) {
            return [
                'uid' => $u->ID,
                'country_ids' => get_user_meta( $u->ID, 'CountrySelected', true ),
            ];
        }, $result );
    } else {
        return [];
    }
}

function tsm_build_countries_count( $data = [] ) {
    $countries_count = [];
    if( count( $data ) <= 0 ) return $countries_count;

    foreach( $data as $item ) {
        if( $item[ 'country_ids' ] ) {
            foreach( $item[ 'country_ids' ] as $cid ) {
                if( $countries_count[ $cid ] ) {
                    $countries_count[ $cid ] += 1;
                } else {
                    $countries_count[ $cid ] = 1;
                }
            }
        }
    }

    return $countries_count;
}

function tms_custom_query_group_by_filter( $groupby ) {
    global $wpdb;
    $groupby = 'place_name';
    return $groupby;
}

function tms_custom_request_filter($sql, $query) {
    global $wpdb;
    $sql = str_replace($wpdb->posts.'.*',$wpdb->posts.'.*, '.$wpdb->postmeta.'.meta_value AS place_name,COUNT(*) AS total_vote',$sql);
    return $sql;
}

function tms_custom_posts_orderby($orderby_statement) {
    $orderby_statement = "total_vote DESC";
    return $orderby_statement;
}

/**
 * Get location by category
 *
 * @param String $cat_slug
 * @return
 */
function tsm_get_top_location_by_cat( $cat_slug = '' ) {

    add_filter( 'posts_request', 'tms_custom_request_filter', 10, 2 );
    add_filter( 'posts_groupby', 'tms_custom_query_group_by_filter' );
    add_filter('posts_orderby', 'tms_custom_posts_orderby');

    $term = get_term_by('slug', $cat_slug, 'favorite-city-cat');
    $result = new WP_Query( [
        'post_type' => 'favorite-city',
        'post_status' => 'publish',
        'posts_per_page' => 3,
        'meta_key' => 'place_name',
        // 'fields' => 'ids'   ,
        'tax_query' => [
            [
                'taxonomy' => 'favorite-city-cat',
                'field' => 'term_id',
                'terms' => $term->term_id,
            ]
        ]
    ] );

    remove_filter( 'posts_request', 'tms_custom_request_filter', 10, 2 );
    remove_filter('posts_groupby', 'tms_custom_query_group_by_filter');
    remove_filter('posts_orderby', 'tms_custom_posts_orderby');
    wp_reset_query();

    if( count( $result->posts ) <= 0 ) { return []; }
    return array_map( function( $p ) {
        return [
            'ID' => $p->ID,
            'place_name' => get_field( 'place_name', $p->ID ),
            'coordinates' => get_field( 'coordinates', $p->ID ),
        ];
    }, $result->posts );
}

add_action( 'init', function() { return;
    $result = tsm_get_top_location_by_cat( 'city-where-you-spend-the-least' );
    echo '<pre>';
    print_r( $result );
    echo '</pre>';
}, 100 );
