<?php

namespace Formable;

class Settings {
  public $forms;
  public $lastUpdated;

  public function __construct() {
    $formsInstance = new Forms();

    $this->forms = $formsInstance->getForms();
    $this->lastUpdated = Helpers::timeElapsedString($formsInstance->getLastUpdated());
  }
}
