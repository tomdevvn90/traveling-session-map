<?php 
/**
 * Global trends template 
 */

?>
<div class="map-console2" id="map-console2">
  <p class="short-desc">
    <img 
      style="width: 60%; margin: 0 auto; display: block;" 
      src="<?= TRSSMAP_URI . '/img/traveling-logo-dark.png' ?>" 
      alt="logo" />
  </p>
  <div id="buttons" class="btn-group flex-wrap __fav-citys-filter-buttons"  role="group">
    <button type="button" class="btn btn-secondary __btn-countries-popular" value="WorldCountriesPopular" title="<?= __( 'Visited Cities' ) ?>">
      <img src="<?php echo TRSSMAP_URI; ?>img/icons-07.png">
    </button>
    <? tsm_favo_list_filter_html() ?>
  </div>
  <h4 id="selectedLayer"></h4>
  <div id="Fav-City-List"></div>
</div>