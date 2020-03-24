<?php
// $servername = "db000445.mydbserver.com";
// $username = "p547650";
// $password = "!j41,Xiireyhbh";
// $dbname = "usr_p547650_1";
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usr_p547650_1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn -> set_charset("utf8mb4");

$id = $_POST['id'];
$firmenname = $_POST['firmenname'];
$strasse = $_POST['strasse'];
$plz = $_POST['plz'];
$ort = $_POST['ort'];
$vorname = $_POST['vorname'];
$nachname = $_POST['nachname'];
$anrede = $_POST['anrede'];
$titel = $_POST['titel'];
$freifeld_1 = $_POST['freifeld_1'];
$freifeld_2 = $_POST['freifeld_2'];
$web = $_POST['web'];

if(!$id){
    $updatesql = "INSERT INTO `records` (`firmenname`, `strasse`, `plz`, `ort`, `vorname`, `nachname`, `anrede`, `titel`, `freifeld_1`, `freifeld_2`, `web`)
                VALUES ('$firmenname', '$strasse', '$plz', '$ort', '$vorname', '$nachname', '$anrede', '$titel', '$freifeld_1', '$freifeld_2', '$web')";
} else {
    $updatesql = "UPDATE `records` SET
    `firmenname` = '$firmenname',
    `strasse` = '$strasse', 
    `plz` = '$plz', 
    `ort` = '$ort', 
    `vorname` = '$vorname',
    `nachname` = '$nachname', 
    `anrede` = '$anrede',
    `titel` = '$titel', 
    `freifeld_1` = '$freifeld_1',
    `freifeld_2` = '$freifeld_2',
    `web` = '$web'
    WHERE id=$id";
}

$updateresult = $conn->query($updatesql);

if($updateresult) {
    echo "success";
} else {
    echo "error";
}

$conn->close();
?>