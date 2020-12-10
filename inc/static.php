<?php
/**
 * Static
 */

if( ! function_exists( 'trss_map_scripts' ) ) {
    /**
     * Scripts
     */
    function trss_map_scripts() {

        # CSS
        // wp_enqueue_style( 'trss-map-style', TRSSMAP_URI . 'css/style.css', false, TRSSMAP_VER );
        wp_enqueue_style( 'tsm-style', TRSSMAP_URI . 'dist/tsm.css', false, TRSSMAP_VER );

        # JS
        wp_enqueue_script( 'trss-map-js', TRSSMAP_URI . 'js/traveling-session-map.frontend.bundle.js', ['jquery'], TRSSMAP_VER, true );
        // wp_enqueue_script( 'trss-map-bsmultil-select-js', TRSSMAP_URI . 'dist/js/BsMultiSelect.js', ['jquery'], TRSSMAP_VER, true );
        
        # PHP data
        wp_localize_script( 'trss-map-js', 'TRSS_MAP_OBJ', apply_filters( 'trss_map/js_object', [
            'ajax_url' => admin_url( 'admin-ajax.php' ),
            'mapbox_world_countries_json_url' => TRSSMAP_URI . '/data/world-countries5.geojson',
            'uid' => get_current_user_id(),
        ] ) );
    }

    add_action( 'wp_enqueue_scripts', 'trss_map_scripts' );
}
