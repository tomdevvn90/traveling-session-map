<?php
/**
 * Traveling Session Map
 *
 * Plugin Name: Traveling Session Map
 * Plugin URI:  #
 * Description: ...
 * Version:     1.0.0
 * Author:      Tom
 * Author URI:  #Tom
 * License:     MIT
 * Text Domain: trss-map
 */

// if( ! class_exists( 'ACF' ) ) {
//     # Plugin require ACF Custom field
//     add_action( 'admin_notices', function() {
//         $class = 'notice notice-error';
//         $message = __( '<strong>Traveling Session Map</strong> require plugin Advanced Custom Fields (ACF Custom Fields). Provides a set of functions to add extra admin pages to edit ACF fields! get <a href="https://www.advancedcustomfields.com/" target="_blank">ACF Custom Fields here</a>', 'trss-map' );
//         printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), $message );
//     } );
//     return;
// }

{
    /**
     * Define
     */
    define( 'TRSSMAP_DIR', plugin_dir_path( __FILE__ ) );
    define( 'TRSSMAP_URI', plugin_dir_url( __FILE__ ) );
    define( 'TRSSMAP_VER', '1.0.1' );
}

{
    # Core
    require( TRSSMAP_DIR . '/inc/static.php' );
    require( TRSSMAP_DIR . '/inc/helpers.php' );
    require( TRSSMAP_DIR . '/inc/hooks.php' );
    require( TRSSMAP_DIR . '/inc/ajax.php' );
    require( TRSSMAP_DIR . '/inc/shortcodes.php' );
    require( TRSSMAP_DIR . '/inc/custom-post-type.php' );
    require( TRSSMAP_DIR . '/inc/custom-tax.php' );
}

{
    # Template
    require( TRSSMAP_DIR . '/templates/traveling-session-map.php' );
}

if( ! function_exists('trss_map_plugin_links') ) {
    /**
     * Plugin page links
     * @since 1.0.0
     *
     */
    function trss_map_plugin_links( $links ) {
        $plugin_links = array(
            '<a href="'. admin_url( 'admin.php?page=trss-map-general-settings' ) .'">' . __( 'Settings', 'trss-map' ) . '</a>',
            '<a href="#">' . __( 'Docs', 'trss-map' ) . '</a>',
        );
        return array_merge( $plugin_links, $links );
    }
    //add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'trss_map_plugin_links' );
}

register_activation_hook( __FILE__ , 'trss_map_plugin_install');
function trss_map_plugin_install() {
    global $wpdb;

    $the_page_title = 'My Travel Sessions';
    $the_page_name = 'my-travel-sessions-map';

    // the menu entry...
    delete_option("trss_map_plugin_page_title");
    add_option("trss_map_plugin_page_title", $the_page_title, '', 'yes');
    // the slug...
    delete_option("trss_map_plugin_page_name");
    add_option("trss_map_plugin_page_name", $the_page_name, '', 'yes');
    // the id...
    delete_option("trss_map_plugin_page_id");
    add_option("trss_map_plugin_page_id", '0', '', 'yes');

    $the_page = get_page_by_title( $the_page_title );

    if ( ! $the_page ) {
        // Create post object
        $_p = array();
        $_p['post_title'] = $the_page_title;
        $_p['post_content'] = "[my_travel_sessions_map]";
        $_p['post_status'] = 'publish';
        $_p['post_type'] = 'page';
        $_p['comment_status'] = 'closed';
        $_p['ping_status'] = 'closed';

        // Insert the post into the database
        $the_page_id = wp_insert_post( $_p );
    }
    else {
        // the plugin may have been previously active and the page may just be trashed...
        $the_page_id = $the_page->ID;

        //make sure the page is not trashed...
        $the_page->post_status = 'publish';
        $the_page_id = wp_update_post( $the_page );
    }
    delete_option( 'trss_map_plugin_page_id' );
    add_option( 'trss_map_plugin_page_id', $the_page_id );
}

/* Runs on plugin deactivation */
register_deactivation_hook( __FILE__, 'trss_map_plugin_remove') ;
function trss_map_plugin_remove() {
    global $wpdb;

    $the_page_title = get_option( "trss_map_plugin_page_title" );
    $the_page_name = get_option( "trss_map_plugin_page_name" );

    //  the id of our page...
    $the_page_id = get_option( 'trss_map_plugin_page_id' );
    if( $the_page_id ) {
        wp_delete_post( $the_page_id ); // this will trash, not delete
    }
    delete_option("trss_map_plugin_page_title");
    delete_option("trss_map_plugin_page_name");
    delete_option("trss_map_plugin_page_id");
}
