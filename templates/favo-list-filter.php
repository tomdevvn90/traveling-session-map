<?php
/**
 * Favorite list filter template
 */

foreach( $favo_list_filter as $index => $item ) :
  ?>
  <button
    type="button"
    class="btn btn-secondary _fav-filter-item __btn-disable"
    value="<?php echo  $item[ 'slug' ] ?>"
    title="<?php echo  $item[ 'label' ] ?>"
    data-tippy-content="<?php echo  $item[ 'label' ] ?>"
    data-color="<?php echo  $item[ 'color' ] ?>" >
    <img src="<?php echo  $item[ 'icon' ] ?>" alt="#">
  </button>
  <?php
endforeach;
