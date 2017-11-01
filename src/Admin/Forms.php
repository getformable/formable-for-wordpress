<?php

namespace Formable;

class Forms {
  private $FormableAPI;
  
  public function __construct() {
    $this->FormableAPI = new FormableAPI();
  }

  private function saveForms($forms) {
    Admin::saveSettings(array(
      'forms' => $forms,
      'lastUpdated' => date('c'),
    ));
  }

  public function getForms() {
    $settings = Admin::getSettings();
    
    // get and save forms if not present
    if (isset($settings['clientToken']) && !isset($settings['forms'])) {
      $forms = $this->updateForms();

      // refresh settings
      $settings = Admin::getSettings();
    } 
    
    if (isset($settings['forms'])) {
      return $settings['forms'];
    }

    return [];
  }

  public function updateForms() {
    $settings = Admin::getSettings();

    if (isset($settings['clientToken'])) {
      $forms = $this->FormableAPI->getForms();
      $this->saveForms($forms);

      return $forms;
    }

    throw new Error('Could not update forms');
  }

  public function getLastUpdated() {
    $settings = Admin::getSettings();

    if (isset($settings['lastUpdated'])) {
      return $settings['lastUpdated'];
    }

    return '';
  }
}
