# Formable for WordPress

Plugin which allows WordPress users to connect their WordPress install to Formable.

[Formable](https://www.getformable.com) is a service which allows for easy form building and embedding. You'll need an account to make use of this plugin on WordPress.

## Installation

[Read the full installation guide](https://www.getformable.com/support/wordpress-plugin) which is available on Formable's support page.

1. Download latest plugin zip.
2. Extract to `/wp-content/plugins`.
3. Click "Formable" in the left menu bar in your WordPress admin.
4. Choose "Connect to Formable".
5. Accept.
6. Party!

## Usage

On the settings page after connecting, you'll see the list of forms you created on Formable. A shortcode will be shown which you can use in posts and pages.

## Development

You'll need node and npm installed.

### Building

1. Extract contents of repository in a folder.
2. Run `npm run build` to build `sass` and `js` source.

### Watching

1. `npm run webpack:dev` to run JavaScript building in watch mode.
2. `npm run sass:dev` to run Sass building in watch mode.

### Changing API and static content URLs

Place the following in your `wp-config.php` to overwrite the URLs in PHP (The URLs are examples).

```
define('FORMABLE_API_URL', 'http://localhost:9191');
define('FORMABLE_STATIC_URL', 'http://localhost:9090');
```

You can adjust the URL passed defined in webpack's config by adding a simple env param.

`npm run webpack -- --env.appUrl=http://localhost:9090`

`npm run webpack:dev -- --env.appUrl=http://localhost:9090`