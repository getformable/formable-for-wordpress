<?php 

namespace Formable;

class Admin {
  private $pluginName;
  private $Forms;

  public function __construct($pluginName) {
    $this->pluginName = $pluginName;
    $this->Forms = new Forms();
  }

  public function hooks() {
    add_action('admin_menu', array($this, 'menu'));

    add_action('admin_print_styles', array($this, 'loadAssets'));

    add_action('init', array($this, 'registerSettings'), 1);
    add_action('init', array($this, 'handleTokenReceive'), 2);
    add_action('init', array($this, 'handleFormActions'), 3);
  }

  public function menu() {
    $icon = file_get_contents(__DIR__ . '/icon.svg');

    add_menu_page('Formable', 'Formable', 'manage_options', 'formable', array($this, 'settingsPage'), $icon, 61);
  }

  public function settingsPage() {
    $settings = $this->getSettings();

    if (isset($settings['clientToken'])) {
      $page = new Settings();
      require __DIR__ . '/pages/Settings.php';
      return;
    }

    require __DIR__ . '/pages/Connect.php';
    return;
  }

  public function registerSettings() {
    add_option('formable_settings', '{}');
  }

  static function getSettings() {
    $settings = get_option('formable_settings', '{}');

    return json_decode($settings, true);
  }

  public function sanitize(array $settings) {
    return $settings;
  }

  public function loadAssets() {
    wp_enqueue_style('formable', plugins_url('assets/formable.css', $this->pluginName), array(), FORMABLE_VERSION);
    wp_enqueue_script('formable', plugins_url('assets/formable.js', $this->pluginName), array(), FORMABLE_VERSION, true);
  }

  public function handleTokenReceive() {
    if (isset($_GET['receivedToken'])) {
      $receivedToken = $_GET['receivedToken'];
      self::saveSettings(array('clientToken' => $receivedToken));
    }
  }

  public function handleFormActions() {
    if (isset($_POST['refreshForms'])) {
      $this->Forms->updateForms();
    }

    if (isset($_POST['unlink'])) {
      update_option('formable_settings', '{}');
    }
  }

  static function saveSettings($newSettings) {
    $currentSettings = Admin::getSettings();
    $mergedSettings = array_merge($currentSettings, $newSettings);
    
    update_option('formable_settings', json_encode($mergedSettings));
  }
}
