<?php
/**
 * Map tool brand template
 */

?>
<div class="ss-head-entry">
  <a class="ss-brand" href="<?php echo  get_site_url() ?>">
    <img
      style="width: 60%; margin: 0 auto; display: block;"
      src="<?php echo  TRSSMAP_URI . '/img/traveling-logo-dark.png' ?>"
      alt="logo" />
  </a>

  <!-- Login button -->
  <?php if( ! is_user_logged_in() ) { ?>
    <nav class="ss-login-nav">
      <a
        class="ss-login"
        href="<?php echo  get_site_url() ?>/login/"
        data-show-youzer-login="true">
        <div class="tdb-menu-item-text"><?php echo  __( 'Login' ) ?></div>
      </a> /
      <a
        href="<?php echo  get_site_url() ?>/profile/register/">
        <div class="tdb-menu-item-text"><?php echo  __( 'Register' ) ?></div>
      </a>
    </nav>
  <?php } ?>
</div>
