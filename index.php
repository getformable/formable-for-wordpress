<?php
/**
 * @package Formable
 * @version 1.0
 */
/*
Plugin Name: Formable
Plugin URI: http://wordpress.org/plugins/formable/
Description: Integrate Formable into WordPress
Author: Gaya Kessler
Version: 1.0
Author URI: https://www.getformable.com
*/

namespace Formable;

define('FORMABLE_VERSION', '1.0.0');
if (!defined('FORMABLE_API_URL')) { define('FORMABLE_API_URL', 'https://api.getformable.com'); }
if (!defined('FORMABLE_STATIC_URL')) { define('FORMABLE_STATIC_URL', 'https://app.getformable.com'); }

function bootstrap() {
  if(is_admin()) {
    if(!defined('DOING_AJAX') || !DOING_AJAX) {
      $admin = new Admin(__FILE__);
      $admin->hooks();
    }
  }

  $client = new Client();
  $client->hooks();
}

require __DIR__ . '/vendor/autoload.php';

add_action('plugins_loaded', 'Formable\\bootstrap', 10);
