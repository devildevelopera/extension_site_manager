<?php
// $servername = "localhost";
// $username = "josef";
// $password = "Mp8s2_t7";
// $dbname = "chromedb";
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "laravel_excel";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn -> set_charset("utf8mb4");

$sql = "SELECT * FROM records ORDER BY 'firmenname'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = mysqli_fetch_array($result)){
        $id = $row['id'];
        $firmenname = $row['firmenname'];
        $strasse = $row['strasse'];
        $plz = $row['plz'];
        $ort = $row['ort'];
        $titel = $row['titel'];
        $vorname = $row['vorname'];
        $nachname = $row['nachname'];
        $web = $row['web'];
        $anrede = $row['anrede'];
        $freifeld_1 = $row['freifeld_1'];
    
        $return_arr[] = array("id" => $id,
                        "firmenname" => $firmenname,
                        "strasse" => $strasse,
                        "plz" => $plz,
                        "ort" => $ort,
                        "titel" => $titel,
                        'vorname' => $vorname,
                        'nachname' => $nachname,
                        'web' => $web,
                        'anrede' => $anrede,
                        'freifeld_1' => $freifeld_1);
    }
    echo json_encode($return_arr);
} else {
    echo "0 results";
}
$conn->close();
?>