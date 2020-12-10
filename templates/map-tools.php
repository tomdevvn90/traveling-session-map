<?php
/**
 * Map tools
 */

?>
<div class="map-tools-container">
  <div class="tab-heading">
    <div class="card c1 active" id="c1" data-tab-name="my-travels">
      <h4><?= __( 'My Travels' ) ?></h4>
    </div>
    <div class="card c2" id="c2" data-tab-name="global-trends">
      <h4><?= __( 'Global Trends' ) ?></h4>
    </div>
  </div> <!-- end .tab-heading -->
  <div class="tab-body">
    <div class="__tab-item __my-travels __is-active" data-tab-body-name="my-travels">
      <? load_template( TRSSMAP_DIR . '/templates/my-travels-tab.php', false ) ?>
    </div> <!-- .__my-travels -->

    <div class="__tab-item __global-trends" data-tab-body-name="global-trends">
      <? load_template( TRSSMAP_DIR . '/templates/global-trends-tab.php', false ) ?>
    </div> <!-- .__global-trends -->
  </div>
  <!-- <div class="map-sub-console"  id="map-sub-console">
      <div class="question-box">
          <? tsm_favo_list_search_html() ?>
          <div id="open-panel">
              <h4 id="favorite-title" >Favorites Cities</h4>
              <h5 id="arrow-mobile" class="active" >▼</h5>
          </div>
      </div>
  </div>

  <div class="map-console" id="map-console">
    <h3>Welcome to Traveling Session, the only website featuring real reviews of travel destinations and festivals around the world. Plus expert travel tips and more. Share your thought about a destination using the stars in the User Reviews or register and log in to start sharing reviews of your favorite travel destinations...</h3>
    <h4 >Total Countries You Visited</h4>
    <h5 id="d1">0</h5>
    <h2 id="city">Click on Map or Type below</h2>
    <select name="states" id="example" class="form-control"  multiple="multiple" style="display: none;">
      <? load_template( TRSSMAP_DIR . '/templates/state-options.php', false ); ?>
    </select>

    <button id="saveButton" class="button button4">SAVE</button>
  </div> -->

  <!-- <div class="map-console2" id="map-console2">
    <h3>Welcome to Traveling Session, the only website featuring real reviews of travel destinations and festivals around the world. Plus expert travel tips and more. Share your thought about a destination using the stars in the User Reviews or register and log in to start sharing reviews of your favorite travel destinations...</h3>
    <div id="buttons" class="btn-group flex-wrap"  role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary __btn-disable" value="worldCountriesSum"><img src="<?php echo TRSSMAP_URI; ?>img/icons-07.png">Visited Cities</button>
      <? tsm_favo_list_filter_html() ?>
    </div>
    <h4 id="selectedLayer" >Select a Layer...</h4>
    <div id="Fav-City-List"></div>
  </div> -->
</div> <!-- .map-tools-container -->