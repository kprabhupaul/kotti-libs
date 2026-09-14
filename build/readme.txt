=== Kotti Libs ===
Contributors: kprabhupaul
Tags: javascript, css, libraries, enqueue
Tested up to: 7.1
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Manage and enqueue CSS and JavaScript libraries on the WordPress frontend and backend.

== Description ==

Kotti Libs is a simple WordPress plugin for managing and enqueueing the included CSS and JavaScript libraries on the WordPress frontend and backend.

The plugin allows you to independently enable or disable each library for:

* Frontend
* Backend

Libraries are loaded from files included with the plugin.

== Included Libraries ==

The plugin currently includes the following default libraries:

* Fexios JS
* Simal CSS
* Simal JS

These libraries are developed and owned by the plugin author.

== Installation ==

1. Install and activate **Kotti Libs** from the WordPress Plugins screen.
2. Go to **Kotti Libs** in the WordPress admin menu.
3. Enable or disable the available libraries for the frontend and backend as required.

== Frequently Asked Questions ==

= What does Kotti Libs do? =

Kotti Libs provides a simple interface for enabling or disabling the included CSS and JavaScript libraries on the WordPress frontend and backend.

= Where are the libraries loaded from? =

The default libraries are included locally within the plugin and are loaded from the plugin's `default-libraries` directory.

= Can I enable a library only on the frontend? =

Yes. Enable the library under **Frontend** and leave **Backend** disabled.

= Can I enable a library only in the WordPress admin area? =

Yes. Enable the library under **Backend** and leave **Frontend** disabled.

= Can I enable a library on both? =

Yes. Both options can be enabled independently.

== Screenshots ==

1. Kotti Libs simple library management page.

== Changelog ==

= 1.0.1 =

* Simplified library enqueueing by treating each included library independently.
* Preserved library settings when the plugin is deactivated and reactivated.
* Default libraries are added only when they are not already saved.

= 1.0.0 =

* Initial release.
* Added frontend and backend library controls.
* Added Fexios and Simal libraries.
