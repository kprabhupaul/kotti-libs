<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/*
 * Main Kotti Libs page.
 */
function klibs_admin_page() {

	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$libraries = klibs_get_libraries();
	?>

	<div class="wrap">

		<h1>Kotti Libs</h1>

		<form method="post" id="klibs-settings-form">

			<table class="widefat striped" style="margin-top:20px;">

				<thead>
					<tr>
						<th>Name</th>
						<th style="width:100px; text-align:center;">Frontend</th>
						<th style="width:100px; text-align:center;">Backend</th>
					</tr>
				</thead>

				<tbody>

					<?php foreach ( $libraries as $library_id => $library ) : ?>

						<tr>

							<td>
								<?php echo esc_html( $library['name'] ); ?>
							</td>

							<td style="text-align:center;">
								<input
									type="checkbox"
									name="klibs[<?php echo esc_attr( $library_id ); ?>][frontend]"
									value="1"
									<?php checked( $library['frontend'] ); ?>
								>
							</td>

							<td style="text-align:center;">
								<input
									type="checkbox"
									name="klibs[<?php echo esc_attr( $library_id ); ?>][backend]"
									value="1"
									<?php checked( $library['backend'] ); ?>
								>
							</td>

						</tr>

					<?php endforeach; ?>

					<?php if ( empty( $libraries ) ) : ?>

						<tr>
							<td colspan="3">No default libraries found.</td>
						</tr>

					<?php endif; ?>

				</tbody>

			</table>

			<p>
				<button
					type="submit"
					class="button button-primary"
					id="klibs-save-button"
				>
					Save Changes
				</button>
			</p>

		</form>

	</div>

	<?php
}
