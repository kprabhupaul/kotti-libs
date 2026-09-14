<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/*
 * AJAX: Save Frontend / Backend settings.
 */
function klibs_ajax_save_settings() {

	check_ajax_referer( 'klibs_save_settings', 'nonce' );

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_send_json_error(
			array(
				'message' => 'You are not allowed to do this.',
			),
			403
		);
	}

	$posted = isset( $_POST['klibs'] ) && is_array( $_POST['klibs'] )
		? map_deep( wp_unslash( $_POST['klibs'] ), 'sanitize_text_field' )
		: array();

	$libraries = klibs_get_libraries();

	foreach ( $libraries as $library_id => $library ) {

		$posted_library = isset( $posted[ $library_id ] ) && is_array( $posted[ $library_id ] )
			? $posted[ $library_id ]
			: array();

		$libraries[ $library_id ]['frontend'] = ! empty( $posted_library['frontend'] );
		$libraries[ $library_id ]['backend']  = ! empty( $posted_library['backend'] );
	}

	update_option( 'klibs', $libraries );

	wp_send_json_success(
		array(
			'message' => 'Library settings saved successfully.',
		)
	);
}
add_action( 'wp_ajax_klibs_save_settings', 'klibs_ajax_save_settings' );
