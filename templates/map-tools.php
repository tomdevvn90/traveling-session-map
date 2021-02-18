<?php
/**
 * Map tools
 */

?>
<div class="map-tools-container">
  <div class="__toggle-map-tool">
    <span>
      <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path d="m17 12c0 .2-.06.4-.17.55l-5 7.5c-.18.27-.48.45-.83.45h-3c-.55 0-1-.45-1-1 0-.2.06-.4.17-.55l4.63-6.95-4.63-6.95c-.11-.15-.17-.35-.17-.55 0-.55.45-1 1-1h3c.35 0 .65.18.83.45l5 7.5c.11.15.17.35.17.55z"/></svg>
    </span>
  </div> <!-- .__toggle-map-tool -->
  <div class="tab-heading">
    <div class="card c1 active" id="c1" data-tab-name="my-travels">
      <h4><?php echo __( 'My Travels' ) ?></h4>
    </div>
    <div class="card c2" id="c2" data-tab-name="global-trends">
      <h4><?php echo __( 'Global Trends' ) ?></h4>
    </div>
  </div> <!-- end .tab-heading -->
  <div class="tab-body">
    <div class="__tab-item __my-travels __is-active" data-tab-body-name="my-travels">
      <?php load_template( TRSSMAP_DIR . '/templates/my-travels-tab.php', false ) ?>
    </div> <!-- .__my-travels -->

    <div class="__tab-item __global-trends" data-tab-body-name="global-trends">
      <?php load_template( TRSSMAP_DIR . '/templates/global-trends-tab.php', false ) ?>
    </div> <!-- .__global-trends -->
  </div>
</div> <!-- .map-tools-container -->
