<?php
/**
 * My Travels Tab
 *
 */

?>
<div class="map-console" id="map-console">
  <?php load_template( TRSSMAP_DIR . '/templates/map-tool-brand.php', false ) ?>

  <div class="total-countries-group">
    <h4 class="sub-heading"><?php echo  __( 'Total Countries You Visited' ) ?></h4>
    <div id="d1" class="total-states-selected">0</div>
  </div>

  <div class="the-countries-visited-container __is-toggle __is-open">
    <h4 class="sub-heading __toggle-heading __toggle-button-style">
      <span><?php echo  __( 'The Countries Visited' ) ?></span>
      <span class="arrow-toggle"><?php echo  tsm_svg_icon( 'arrow-down' ) ?></span>
    </h4>
    <div class="__toggle-content">
      <label id="city" class="label-field"><?php echo  __( 'Click on Map or Type below' ) ?></label>
      <select name="states" id="Map-State" class="form-control"  multiple="multiple" style="display: none;">
        <?php load_template( TRSSMAP_DIR . '/templates/state-options.php', false ); ?>
      </select>
    </div>
  </div>

  <div class="fav-city-container __is-toggle">
    <h4 class="sub-heading __toggle-heading __toggle-button-style">
      <span><?php echo  __( 'Favorites Cities ⭐' ) ?></span>
      <span class="arrow-toggle"><?php echo  tsm_svg_icon( 'arrow-down' ) ?></span>
    </h4>
    <div class="question-box __toggle-content">
      <?php tsm_favo_list_search_html() ?>
    </div>
  </div>

  <hr style="margin: 16px 0 0 0" />

  <button id="saveButton" class="button button4"><?php echo  __( 'Save' ) ?></button>
</div> <!-- #map-console -->
