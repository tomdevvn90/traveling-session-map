<?php 
/**
 * Favorite list filter template 
 */

foreach( $favo_list_filter as $index => $item ) :
  ?>
  <button type="button" class="btn btn-secondary _fav-filter-item" value="<?= $item[ 'slug' ] ?>"><img src="<?= TRSSMAP_URI ?>img/<?= $item[ 'icon' ] ?>"><?= $item[ 'label' ] ?></button>
  <?php
endforeach;