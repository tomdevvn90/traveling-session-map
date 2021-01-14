<?php 
/**
 * Global trends template 
 */

?>
<div class="map-console2" id="map-console2">
  <? load_template( TRSSMAP_DIR . '/templates/map-tool-brand.php', false ) ?>
  <br />
  <div class="mess-style __info-text">
    <span class="mess-icon"><img src="<?= TRSSMAP_URI . '/img/information-button.svg' ?>" alt="" /></span>
    <?= __( 'Click the icon to see the trends for that category on the map' ) ?>
  </div>
  <div id="buttons" class="btn-group flex-wrap __fav-citys-filter-buttons"  role="group">
    <button type="button" class="btn btn-secondary __btn-countries-popular" value="WorldCountriesPopular" title="<?= __( 'Visited Cities' ) ?>" data-tippy-content="<?= __( 'Visited Cities' ) ?>">
      <img src="<?php echo TRSSMAP_URI; ?>img/icons-07.png">
    </button>
    <? tsm_favo_list_filter_html() ?>
  </div>
  <h4 id="selectedLayer"></h4>
  <div id="Fav-City-List"></div>
</div> 