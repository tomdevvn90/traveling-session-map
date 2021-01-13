<?php 
/**
 * Map tool brand template 
 */

?>
<div class="ss-head-entry">
  <a class="ss-brand" href="<?= get_site_url() ?>">
    <img 
      style="width: 60%; margin: 0 auto; display: block;" 
      src="<?= TRSSMAP_URI . '/img/traveling-logo-dark.png' ?>" 
      alt="logo" />
  </a>

  <!-- Login button -->
  <? if( ! is_user_logged_in() ) { ?>
    <nav class="ss-login-nav">
      <a 
        class="ss-login"
        href="<?= get_site_url() ?>/login/" 
        data-show-youzer-login="true">
        <div class="tdb-menu-item-text"><?= __( 'Login' ) ?></div>
      </a> / 
      <a 
        href="<?= get_site_url() ?>/profile/register/">
        <div class="tdb-menu-item-text"><?= __( 'Register' ) ?></div>
      </a>
    </nav>
  <? } ?>
</div>