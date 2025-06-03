<?php
$host = "mysql"; // <-- ALTERADO PARA O NOME DO CONTAINER DO MYSQL
$user = "root";
$password = "root"; // Senha definida em docker-compose.yml
$dbname = "liveotica";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
