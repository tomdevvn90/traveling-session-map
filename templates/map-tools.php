<?php
/**
 * Map tools
 */

?>
<div class="map-tools-container">
  <div class="__toggle-map-tool">
    <span></span>
    <span></span>
    <span></span>
  </div> <!-- .__toggle-map-tool -->
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
</div> <!-- .map-tools-container -->