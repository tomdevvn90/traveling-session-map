<?php 
/**
 * Global trends template 
 */

?>
<div class="map-console2" id="map-console2">
  <p class="short-desc"><?= __( 'Welcome to Traveling Session, the only website featuring real reviews of travel destinations and festivals around the world. Plus expert travel tips and more. Share your thought about a destination using the stars in the User Reviews or register and log in to start sharing reviews of your favorite travel destinations...' ) ?></p>
  <div id="buttons" class="btn-group flex-wrap __fav-citys-filter-buttons"  role="group">
    <button type="button" class="btn btn-secondary __btn-countries-popular" value="WorldCountriesPopular" title="<?= __( 'Visited Cities' ) ?>">
      <img src="<?php echo TRSSMAP_URI; ?>img/icons-07.png">
    </button>
    <? tsm_favo_list_filter_html() ?>
  </div>
  <h4 id="selectedLayer"></h4>
  <div id="Fav-City-List"></div>
</div>