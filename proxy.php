<?php

/**
 * Proxy para a API do Fluig com autenticação OAuth1
 * Hospedagem: Hostinger (PHP)
 *
 * Arquivo deve estar em /proxy.php na raiz do site
 * Exemplo de chamada do frontend:
 *   fetch('/proxy.php?datasetId=cadResultadosKart')
 */

// ─── CONFIGURAÇÃO ────────────────────────────────────────────────────────────
define('FLUIG_BASE_URL', 'https://federacaonacional201538.fluig.cloudtotvs.com.br');
define('OAUTH_CONSUMER_KEY',    'API_Key');
define('OAUTH_CONSUMER_SECRET', 'api_secret');
define('OAUTH_TOKEN',           '449651ad-cd8d-43c3-9d62-10077e069db0');
define('OAUTH_TOKEN_SECRET',    '7192d223-95d7-4a1e-8761-2c1b9efa50285872bb60-a38b-4045-b09b-d3e19d26f944');

// Para debug (descomente para ver logs)
define('DEBUG_MODE', true);
// ─────────────────────────────────────────────────────────────────────────────

// ─── CORS HEADERS ─────────────────────────────────────────────────────────────
$allowedOrigins = [
    'https://maroon-gnu-600298.hostingersite.com',
    'http://localhost:5173',
    'http://localhost:8080',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: " . $allowedOrigins[0]);
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Responde preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ─── VALIDA PARÂMETROS ────────────────────────────────────────────────────────
$datasetId = $_GET['datasetId'] ?? '';
if (empty($datasetId)) {
    http_response_code(400);
    echo json_encode(['error' => 'Parâmetro datasetId é obrigatório.']);
    exit;
}

// ─── MONTA A URL DO FLUIG ─────────────────────────────────────────────────────
$endpoint = FLUIG_BASE_URL . '/dataset/api/v2/dataset-handle/search';
$queryParams = ['datasetId' => $datasetId];

// Repassa parâmetros extras
foreach ($_GET as $key => $value) {
    if ($key !== 'datasetId') {
        $queryParams[$key] = $value;
    }
}

if (DEBUG_MODE) {
    error_log("=== PROXY DEBUG ===");
    error_log("Endpoint: " . $endpoint);
    error_log("Query Params: " . json_encode($queryParams));
}

// ─── GERA ASSINATURA OAUTH1 ───────────────────────────────────────────────────
function oauthSign(string $method, string $url, array $params, string $consumerSecret, string $tokenSecret): array
{
    $oauthParams = [
        'oauth_consumer_key'     => OAUTH_CONSUMER_KEY,
        'oauth_nonce'            => bin2hex(random_bytes(16)),
        'oauth_signature_method' => 'HMAC-SHA1',
        'oauth_timestamp'        => time(),
        'oauth_token'            => OAUTH_TOKEN,
        'oauth_version'          => '1.0',
    ];

    $allParams = array_merge($oauthParams, $params);
    ksort($allParams);

    $paramString = http_build_query($allParams, '', '&', PHP_QUERY_RFC3986);
    $baseString  = strtoupper($method) . '&' . rawurlencode($url) . '&' . rawurlencode($paramString);
    $signingKey = rawurlencode($consumerSecret) . '&' . rawurlencode($tokenSecret);

    $oauthParams['oauth_signature'] = base64_encode(hash_hmac('sha1', $baseString, $signingKey, true));

    return $oauthParams;
}

$oauthParams = oauthSign('GET', $endpoint, $queryParams, OAUTH_CONSUMER_SECRET, OAUTH_TOKEN_SECRET);

// Monta o header Authorization
$authParts = [];
foreach ($oauthParams as $key => $value) {
    $authParts[] = rawurlencode($key) . '="' . rawurlencode($value) . '"';
}
$authHeader = 'OAuth ' . implode(', ', $authParts);

// ─── FAZ A REQUISIÇÃO AO FLUIG ────────────────────────────────────────────────
$fullUrl = $endpoint . '?' . http_build_query($queryParams);

if (DEBUG_MODE) {
    error_log("Full URL: " . $fullUrl);
    error_log("Auth Header: " . substr($authHeader, 0, 50) . "...");
}

$context = stream_context_create([
    'http' => [
        'method'        => 'GET',
        'header'        => "Authorization: $authHeader\r\nAccept: application/json\r\nConnection: close\r\n",
        'timeout'       => 15,
        'ignore_errors' => true,
    ],
    'ssl' => [
        'verify_peer'      => true,
        'verify_peer_name' => true,
    ],
]);

$response = @file_get_contents($fullUrl, false, $context);
$httpHeaders = $http_response_header ?? [];

// Extrai o status HTTP
$statusCode = 502;
foreach ($httpHeaders as $header) {
    if (preg_match('/HTTP\/\d\.\d\s+(\d{3})/', $header, $matches)) {
        $statusCode = (int) $matches[1];
        break;
    }
}

if (DEBUG_MODE) {
    error_log("Response Status: $statusCode");
    error_log("Response: " . substr($response, 0, 200) . "...");
}

http_response_code($statusCode);

// Retorna a resposta
if ($response === false) {
    http_response_code(502);
    echo json_encode([
        'error' => 'Falha ao conectar com o servidor Fluig',
        'url' => $fullUrl,
        'php_error' => error_get_last(),
        'debug' => DEBUG_MODE ? true : false,
    ]);
    exit;
}

// Validação básica da resposta
if (empty($response)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Resposta vazia do servidor Fluig',
        'debug_info' => 'A API Fluig retornou uma resposta vazia',
    ]);
    exit;
}

// Tenta fazer parse da resposta como JSON
$decodedResponse = @json_decode($response, true);

if ($statusCode >= 400) {
    http_response_code($statusCode);
    echo json_encode([
        'error' => 'Erro na API Fluig',
        'status' => $statusCode,
        'response' => $decodedResponse ?? $response,
        'debug' => DEBUG_MODE ? [
            'url' => $fullUrl,
            'raw_response' => substr($response, 0, 500),
        ] : null,
    ]);
    exit;
}

// Success — Echo a resposta como está (JSON válido do Fluig)
echo $response;
$authHeader = 'OAuth ' . implode(', ', $authParts);

// ─── FAZ A REQUISIÇÃO AO FLUIG ────────────────────────────────────────────────
$fullUrl = $endpoint . '?' . http_build_query($queryParams);

$context = stream_context_create([
    'http' => [
        'method'        => 'GET',
        'header'        => "Authorization: $authHeader\r\nAccept: application/json\r\n",
        'timeout'       => 15,
        'ignore_errors' => true,
    ],
    'ssl' => [
        'verify_peer'      => true,
        'verify_peer_name' => true,
    ],
]);

$response    = file_get_contents($fullUrl, false, $context);
$httpHeaders = $http_response_header ?? [];

// Extrai o status HTTP da resposta
$statusCode = 502;
foreach ($httpHeaders as $header) {
    if (preg_match('/HTTP\/\d\.\d\s+(\d{3})/', $header, $matches)) {
        $statusCode = (int) $matches[1];
    }
}

http_response_code($statusCode);

if ($response === false) {
    echo json_encode(['error' => 'Falha ao conectar com o servidor Fluig.']);
    exit;
}

echo $response;
