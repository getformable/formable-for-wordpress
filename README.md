# Formable for WordPress

Plugin which allows WordPress users to connect their WordPress install to Formable.

[Formable](https://www.getformable.com) is a service which allows for easy form building and embedding. You'll need an account to make use of this plugin on WordPress.

## Installation

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