<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/*
 * Get saved default libraries.
 */
function klibs_get_libraries() {

	$libraries = get_option( 'klibs', array() );

	if ( ! is_array( $libraries ) ) {
		return array();
	}

	foreach ( $libraries as $library_id => $library ) {

		if ( ! is_array( $library ) ) {
			unset( $libraries[ $library_id ] );
			continue;
		}

		$libraries[ $library_id ] = array(
			'name'     => isset( $library['name'] ) ? (string) $library['name'] : '',
			'url'      => isset( $library['url'] ) ? esc_url_raw( $library['url'] ) : '',
			'file'     => isset( $library['file'] ) ? (string) $library['file'] : '',
			'frontend' => ! empty( $library['frontend'] ),
			'backend'  => ! empty( $library['backend'] ),
			'type'     => isset( $library['type'] ) && in_array( $library['type'], array( 'js', 'css' ), true ) ? $library['type'] : '',
		);
	}

	uksort(
		$libraries,
		function ( $a, $b ) use ( $libraries ) {
			return strnatcasecmp(
				$libraries[ $a ]['name'] ?? $a,
				$libraries[ $b ]['name'] ?? $b
			);
		}
	);

	return $libraries;
}


/*
 * Add Kotti Libs default libraries on plugin activation.
 */
function klibs_add_default_libraries() {

	// Do not overwrite existing user settings.
	if ( false !== get_option( 'klibs', false ) ) {
		return;
	}

	$defaults = array(
		'fexios' => array(
			'name'     => 'Fexios',
			'url'      => KLIBS_URL . 'default-libraries/fexios.js',
			'file'     => 'default-libraries/fexios.js',
			'frontend' => true,
			'backend'  => true,
			'type'     => 'js',
		),

		'simal-css' => array(
			'name'     => 'Simal CSS',
			'url'      => KLIBS_URL . 'default-libraries/simal.css',
			'file'      => 'default-libraries/simal.css',
			'frontend' => true,
			'backend'  => true,
			'type'     => 'css',
		),

		'simal-js' => array(
			'name'     => 'Simal JS',
			'url'      => KLIBS_URL . 'default-libraries/simal.js',
			'file'     => 'default-libraries/simal.js',
			'frontend' => true,
			'backend'  => true,
			'type'     => 'js',
		),
	);

	add_option( 'klibs', $defaults );
}

/*
 * Register Kotti Libs admin menu.
 */
function klibs_admin_menu() {

	add_menu_page(
		'Kotti Libs',
		'Kotti Libs',
		'manage_options',
		'kotti-libs',
		'klibs_admin_page',
		'dashicons-editor-code',
		66
	);
}
add_action( 'admin_menu', 'klibs_admin_menu' );


/*
 * Enqueue enabled default libraries.
 */
function klibs_enqueue() {

	$libraries = klibs_get_libraries();
	$context   = is_admin() ? 'backend' : 'frontend';

	foreach ( $libraries as $library_id => $library ) {

		if ( empty( $library[ $context ] ) ) {
			continue;
		}

		if ( empty( $library['file'] ) || empty( $library['type'] ) ) {
			continue;
		}

		$file_path = KLIBS_PATH . ltrim( $library['file'], '/\\' );

		if ( ! is_file( $file_path ) ) {
			continue;
		}

		$handle  = 'klibs-' . sanitize_key( $library_id );
		$version = filemtime( $file_path );

		if ( 'js' === $library['type'] ) {
			wp_enqueue_script(
				$handle,
				$library['url'],
				array(),
				$version,
				false
			);
		} elseif ( 'css' === $library['type'] ) {
			wp_enqueue_style(
				$handle,
				$library['url'],
				array(),
				$version
			);
		}
	}
}
add_action( 'wp_enqueue_scripts', 'klibs_enqueue' );
add_action( 'admin_enqueue_scripts', 'klibs_enqueue' );


/*
 * Enqueue admin assets for the plugin settings page.
 */
function klibs_admin_assets( $hook_suffix ) {

	if ( 'toplevel_page_kotti-libs' !== $hook_suffix ) {
		return;
	}

	wp_enqueue_script(
		'klibs-admin',
		KLIBS_URL . 'admin.js',
		array(),
		KLIBS_VERSION,
		true
	);

	wp_localize_script(
		'klibs-admin',
		'klibsAdmin',
		array(
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
			'nonce'   => wp_create_nonce( 'klibs_save_settings' ),
		)
	);
}
add_action( 'admin_enqueue_scripts', 'klibs_admin_assets' );
