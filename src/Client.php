<?php 

namespace Formable;

class Client {
  private $addedScript;

  public function hooks() {
    add_action('init', array($this, 'registerShortcode'), 1);
  }

  public function registerShortcode() {
    add_shortcode('formable', array($this, 'parseShortcode'));
  }

  public function parseShortcode($attrs) {
    $response = '';

    if (!$this->addedScript) {
      $response .= sprintf('<script async type="text/javascript" src="%s/static/embed.js"></script>', FORMABLE_STATIC_URL);
    }

    $mountOn = 'formable_root_' . rand(10000, 80000);

    $obj = sprintf('{ key: "%s", mountOn: "#%s" }', esc_attr($attrs['id']), $mountOn);
    $response .= sprintf('<script type="text/javascript">if (!window.formableForms) { window.formableForms = []; } window.formableForms.push(%s);</script>', $obj);
    $response .= sprintf('<div id="%s"></div>', $mountOn);

    return $response;
  }
}
