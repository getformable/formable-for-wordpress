<?php

namespace Formable;

class Settings {
  public $forms;
  public $lastUpdated;

  public function __construct() {
    $formsInstance = new Forms();

    $this->forms = $formsInstance->getForms();
    $this->lastUpdated = time_elapsed_string($formsInstance->getLastUpdated());
  }
}
