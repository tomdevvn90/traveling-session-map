<?php 
/**
 * My Travels Tab
 * 
 */

?>
<div class="map-console" id="map-console">
  <p class="short-desc"><?= __( 'Welcome to Traveling Session, the only website featuring real reviews of travel destinations and festivals around the world. Plus expert travel tips and more. Share your thought about a destination using the stars in the User Reviews or register and log in to start sharing reviews of your favorite travel destinations...' ) ?></p>
  <div class="total-countries-group">
    <h4 class="sub-heading"><?= __( 'Total Countries You Visited' ) ?></h4>
    <div id="d1" class="total-states-selected">0</div>
  </div>

  <div class="the-countries-visited-container __is-toggle __is-open">
    <h4 class="sub-heading __toggle-heading __toggle-button-style">
      <span><?= __( 'The Countries Visited' ) ?></span>
      <span class="arrow-toggle"><?= tsm_svg_icon( 'arrow-down' ) ?></span>
    </h4>
    <div class="__toggle-content">
      <label id="city" class="label-field"><?= __( 'Click on Map or Type below' ) ?></label>
      <select name="states" id="Map-State" class="form-control"  multiple="multiple" style="display: none;">
        <? load_template( TRSSMAP_DIR . '/templates/state-options.php', false ); ?>
      </select>
    </div>
  </div>

  <div class="fav-city-container __is-toggle">
    <h4 class="sub-heading __toggle-heading __toggle-button-style">
      <span><?= __( 'Favorites Cities ⭐' ) ?></span> 
      <span class="arrow-toggle"><?= tsm_svg_icon( 'arrow-down' ) ?></span>
    </h4>
    <div class="question-box __toggle-content">
      <? tsm_favo_list_search_html() ?>
    </div>
  </div> 

  <hr style="margin: 16px 0 0 0" />

  <button id="saveButton" class="button button4"><?= __( 'Save' ) ?></button>
</div>