<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$deletefile = "../../" . $_POST["name"];

if (file_exists($deletefile)) {
    unlink($deletefile);
} else {
    header("HTTP/1.0 400 Bad Request");
}