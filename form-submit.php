<?php
// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Connect to MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sentient";
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute MySQL query
$stmt = $conn->prepare("INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);
$stmt->execute();

// Close MySQL connection
$stmt->close();
$conn->close();

// Redirect to contact.html
header('Location: contact.html');
exit;
?>