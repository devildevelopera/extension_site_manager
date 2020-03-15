<?php
// $servername = "localhost";
// $username = "josef";
// $password = "Mp8s2_t7";
// $dbname = "chromedb";
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chromedb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn -> set_charset("utf8mb4");

$comid = $_POST['comid'];
$firmenname = $_POST['firmenname'];
$strasse = $_POST['strasse'];
$plz = $_POST['plz'];
$ort = $_POST['ort'];
$vorname = $_POST['vorname'];
$nachname = $_POST['nachname'];
$gender = $_POST['gender'];
$titel = $_POST['titel'];
$optradio = $_POST['optradio'];
$web = $_POST['web'];

$updatesql = "UPDATE `company` SET
`firmenname` = '$firmenname',
`strasse` = '$strasse', 
`plz` = '$plz', 
`ort` = '$ort', 
`vorname` = '$vorname',
`nachname` = '$nachname', 
`gender` = '$gender',
`titel` = '$titel', 
`optradio` = '$optradio',
`web` = '$web'
WHERE comid=$comid";

$updateresult = $conn->query($updatesql);

if($updateresult) {
    echo "success";
} else {
    echo "error";
}

$conn->close();
?>