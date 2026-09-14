# Kotti Libs
Manage and enqueue CSS and JavaScript libraries on the WordPress frontend and backend.

## About

**Kotti Libs** is a lightweight WordPress plugin for managing a collection of CSS and JavaScript libraries from a single admin page.

The plugin keeps library management simple: you can enable or disable each included library independently for the WordPress frontend and backend.

## Features

- Simple WordPress admin interface
- Enable or disable libraries on the frontend
- Enable or disable libraries in the WordPress backend
- Local, bundled library assets
- Versioning of bundled assets using the file modification time to help prevent stale browser caches
- Lightweight and focused on library management

## Included Libraries

Kotti Libs currently includes these author-owned libraries:

- **Fexios** — JavaScript library
- **Simal CSS** — CSS library
- **Simal JS** — JavaScript library

These libraries are developed and owned by the plugin author.

## How It Works

After activating the plugin for the first time, Kotti Libs adds the included default libraries with frontend and backend loading enabled. Your saved settings are preserved when the plugin is deactivated and activated again.

After activating the plugin:

1. Open **Kotti Libs** from the WordPress admin menu.
2. Enable the libraries you want to use on the **Frontend**.
3. Enable the libraries you want to use in the **Backend**.
4. Save the settings.

Enabled libraries are automatically enqueued in the appropriate WordPress context.

## Requirements

- WordPress 6.0 or later
- PHP 8.1 or later

## Plugin Structure

```text
kotti-libs/
├── kotti-libs.php
├── functions.php
├── pages.php
├── ajax-callbacks.php
├── uninstall.php
└── default-libraries/
    ├── fexios.js
    ├── simal.css
    └── simal.js
```

## Development

This project is developed as a WordPress plugin and is intended to keep library management simple, predictable, and easy to maintain.

The repository contains the development source of Kotti Libs. Releases can be packaged and distributed as a standard WordPress plugin ZIP.

## License

Kotti Libs is licensed under the [MIT License](LICENSE).

## Author

**Pratap Kumar Kotti**

- GitHub: https://github.com/kprabhupaul

## Links

- Plugin URI: https://github.com/kprabhupaul/kottilibs
