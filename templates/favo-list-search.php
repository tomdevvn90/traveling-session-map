<?php 
/**
 * Favo list search template  
 */
?>

<? forEach( $favo_list_search as $index => $item ) : ?>
  <div class="myGallery"><img src="<?php echo TRSSMAP_URI; ?>img/<?= $item[ 'icon' ] ?>"><span><?= $item[ 'label' ] ?></span></div>
  <div id="<?= $item[ 'id' ] ?>" class="<?= $item[ 'class' ] ?>" data-tax-slug="<?= $item[ 'slug' ] ?>"></div>
<? endforeach; ?>