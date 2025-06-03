<?php
header('Content-Type: application/json');

// Configuração do banco de dados
$host = getenv('DB_HOST') ?: 'mysql';
$user = getenv('DB_USER') ?: 'root';
$password = getenv('DB_PASSWORD') ?: 'root';
$dbname = getenv('DB_NAME') ?: 'liveotica';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Receber dados do formulário
    $data = json_decode(file_get_contents('php://input'), true);

    if (
        empty($data['nome']) ||
        empty($data['telefone']) ||
        empty($data['cpf']) ||
        empty($data['tipo_exame']) ||
        empty($data['data_agendamento'])
    ) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Campos obrigatórios ausentes']);
        exit;
    }

    // Inserir dados no banco
    $stmt = $pdo->prepare("
        INSERT INTO agendamentos (nome, telefone, cpf, tipo_exame, data_agendamento, mensagem)
        VALUES (:nome, :telefone, :cpf, :tipo_exame, :data_agendamento, :mensagem)
    ");
    $stmt->execute([
        ':nome' => $data['nome'],
        ':telefone' => $data['telefone'],
        ':cpf' => $data['cpf'],
        ':tipo_exame' => $data['tipo_exame'],
        ':data_agendamento' => $data['data_agendamento'],
        ':mensagem' => $data['mensagem'] ?? ''
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>