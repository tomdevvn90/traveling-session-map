<?php 
/**
 * Favo list search template  
 */
?>

<? forEach( $favo_list_search as $index => $item ) : ?>
  <div class="__fav-item">
    <div class="myGallery">
      <span><?= $item[ 'label' ] ?></span>
      <img src="<?= $item[ 'icon' ] ?>" alt="#">
    </div> 
    <div 
      id="<?= $item[ 'id' ] ?>" 
      class="<?= $item[ 'class' ] ?> __mapbox-geocode-field-container" 
      data-item-key="<?= $item[ 'key' ] ?>" 
      data-tax-slug="<?= $item[ 'slug' ] ?>"
      data-icon="<?= $item[ 'icon' ] ?>"></div>
  </div>
<? endforeach; ?>