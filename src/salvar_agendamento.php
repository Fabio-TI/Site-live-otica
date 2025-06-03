<?php
header('Content-Type: application/json');

// Configuração do banco de dados
$mysqlUrl = getenv('MYSQL_URL');
if (!$mysqlUrl) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Variável MYSQL_URL não definida']);
    exit;
}

// Extrai os dados da URL do banco de dados
$parts = parse_url($mysqlUrl);

$host = $parts['host'];
$username = $parts['user'];
$password = isset($parts['pass']) ? $parts['pass'] : '';
$dbname = ltrim($parts['path'], '/');

try {
    // Conecta ao banco de dados usando as credenciais extraídas
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Lê os dados do formulário via POST
    $data = json_decode(file_get_contents('php://input'), true);

    // Valida campos obrigatórios
    if (empty($data['nome']) || empty($data['telefone']) || empty($data['cpf']) || empty($data['tipo_exame']) || empty($data['data_agendamento'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Campos obrigatórios ausentes']);
        exit;
    }

    // Prepara a inserção no banco
    $stmt = $pdo->prepare("INSERT INTO agendamentos (
        nome, telefone, cpf, tipo_exame, data_agendamento, mensagem
    ) VALUES (
        :nome, :telefone, :cpf, :tipo_exame, :data_agendamento, :mensagem
    )");

    // Executa a inserção
    $stmt->execute([
        ':nome' => $data['nome'],
        ':telefone' => $data['telefone'] ?? null,
        ':cpf' => $data['cpf'] ?? null,
        ':tipo_exame' => $data['tipo_exame'] ?? null,
        ':data_agendamento' => $data['data_agendamento'] ?? null,
        ':mensagem' => $data['mensagem'] ?? null
    ]);

    // Resposta de sucesso
    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}