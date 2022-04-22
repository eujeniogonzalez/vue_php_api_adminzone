<?php

$htmlfiles = glob("../../*.html");

$response = [];

foreach ($htmlfiles as $file) {
    $response[] = basename($file);
}

echo json_encode($response);

