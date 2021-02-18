<?php
/**
 * Favo list search template
 */
?>

<?php forEach( $favo_list_search as $index => $item ) : ?>
  <div class="__fav-item">
    <div class="myGallery">
      <span><?php echo  $item[ 'label' ] ?></span>
      <img src="<?php echo  $item[ 'icon' ] ?>" alt="#">
    </div>
    <div
      id="<?php echo  $item[ 'id' ] ?>"
      class="<?php echo  $item[ 'class' ] ?> __mapbox-geocode-field-container"
      data-item-key="<?php echo  $item[ 'key' ] ?>"
      data-tax-slug="<?php echo  $item[ 'slug' ] ?>"
      data-icon="<?php echo  $item[ 'icon' ] ?>"></div>
  </div>
<?php endforeach; ?>
