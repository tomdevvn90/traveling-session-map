<?php
/**
 * Hooks
 */

  // Add body class
add_filter( 'body_class', function( $classes ) {
    global $post;
    if ( has_shortcode( $post->post_content, 'my_travel_sessions_map' ) ) {
        $classes[] = 'my-travel-sessions-map-sc';
    }
    return $classes;
} );

// Replace content of page template
// add_filter( 'page_template', 'trss_plugin_page_template' );
// Add css js intor head
// add_action('wp_head', 'trss_plugin_head_import_css_javascript');
// Add css js intor footer
// add_action('wp_footer', 'trss_plugin_footer_import_css_javascript');

if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(
        [
            'page_title' 	=> __( 'Travel Map Settings' ),
            'menu_title'	=> __( 'Travel Map Settings' ),
            'menu_slug' 	=> 'travel-map-settings',
            'capability'	=> 'edit_posts',
            'redirect'		=> false
        ]
    );
}