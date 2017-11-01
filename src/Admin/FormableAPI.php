<?php

namespace Formable;

class FormableAPI {
  private $apiUrl = FORMABLE_API_URL;
  private $clientToken;

  public function __construct() {
    $settings = Admin::getSettings();

    if (isset($settings['clientToken'])) {
      $this->clientToken = $settings['clientToken'];
    }
  }

  private function url($endpoint) {
    $join = strstr($endpoint, '?') ? '&' : '?';

    return $this->apiUrl . $endpoint . $join . 'token=' . $this->clientToken;
  }

  private function getJson($url) {
    $response = wp_remote_get($this->url($url));

    if (isset($response['body'])) {
      $responseObj = json_decode($response['body']);

      if ($responseObj->success) {
        return $responseObj->data;
      }

      throw new Error($responseObj.message);
    }

    throw new Error('No response body');
  }

  public function getForms() {
    $response = $this->getJson('/forms/list');

    return $response->forms;
  }
}
