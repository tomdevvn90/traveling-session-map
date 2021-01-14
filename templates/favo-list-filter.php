<?php 
/**
 * Favorite list filter template 
 */

foreach( $favo_list_filter as $index => $item ) :
  ?>
  <button 
    type="button" 
    class="btn btn-secondary _fav-filter-item __btn-disable" 
    value="<?= $item[ 'slug' ] ?>" 
    title="<?= $item[ 'label' ] ?>"
    data-tippy-content="<?= $item[ 'label' ] ?>"
    data-color="<?= $item[ 'color' ] ?>" >
    <img src="<?= $item[ 'icon' ] ?>" alt="#">
  </button>
  <?php
endforeach;