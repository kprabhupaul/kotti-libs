<?php
/**
 * Plugin Name:       Kotti Libs
 * Plugin URI:        https://github.com/kprabhupaul/kottilibs
 * Description:       Manage and enqueue CSS and JavaScript libraries on the WordPress frontend and backend.
 * Version:           1.0.1
 * Requires at least: 6.0
 * Requires PHP:      8.1
 * Author:            Pratap Kumar Kotti
 * Author URI:        https://github.com/kprabhupaul
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       kotti-libs
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'KLIBS_VERSION', '1.0.1' );
define( 'KLIBS_PATH', plugin_dir_path( __FILE__ ) );
define( 'KLIBS_URL', plugin_dir_url( __FILE__ ) );

require_once KLIBS_PATH . 'functions.php';
require_once KLIBS_PATH . 'ajax-callbacks.php';
require_once KLIBS_PATH . 'pages.php';
register_activation_hook( __FILE__, 'klibs_add_default_libraries' );
