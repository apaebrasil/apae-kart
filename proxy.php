<?php

/**
 * Proxy para a API do Fluig com autenticação OAuth1
 * Hospedagem: Hostinger (PHP)
 *
 * Coloque este arquivo na raiz do seu site ou em /api/fluig-proxy.php
 * Exemplo de chamada do frontend:
 *   fetch('/api/fluig-proxy.php?datasetId=cadResultadosKart')
 */

// ─── CONFIGURAÇÃO ────────────────────────────────────────────────────────────
define('FLUIG_BASE_URL', 'https://federacaonacional201538.fluig.cloudtotvs.com.br');
define('OAUTH_CONSUMER_KEY',    'API_Key');
define('OAUTH_CONSUMER_SECRET', 'api_secret');
define('OAUTH_TOKEN',           '449651ad-cd8d-43c3-9d62-10077e069db0');
define('OAUTH_TOKEN_SECRET',    '7192d223-95d7-4a1e-8761-2c1b9efa50285872bb60-a38b-4045-b09b-d3e19d26f944');
// ─────────────────────────────────────────────────────────────────────────────

// Origens permitidas (coloque o domínio do seu frontend)
$allowedOrigins = [
    'https://maroon-gnu-600298.hostingersite.com',
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

// ─── MONTA A URL DO FLUIG ────────────────────────────────────────────────────
$datasetId = $_GET['datasetId'] ?? '';
if (empty($datasetId)) {
    http_response_code(400);
    echo json_encode(['error' => 'Parâmetro datasetId é obrigatório.']);
    exit;
}

$endpoint = FLUIG_BASE_URL . '/dataset/api/v2/dataset-handle/search';
$queryParams = ['datasetId' => $datasetId];

// Repassa filtros extras enviados pelo frontend (ex: fields, constraints)
foreach ($_GET as $key => $value) {
    if ($key !== 'datasetId') {
        $queryParams[$key] = $value;
    }
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

    // Une os parâmetros OAuth com os parâmetros da query
    $allParams = array_merge($oauthParams, $params);
    ksort($allParams);

    // Monta a base string
    $paramString = http_build_query($allParams, '', '&', PHP_QUERY_RFC3986);
    $baseString  = strtoupper($method) . '&' . rawurlencode($url) . '&' . rawurlencode($paramString);

    // Chave de assinatura
    $signingKey = rawurlencode($consumerSecret) . '&' . rawurlencode($tokenSecret);

    // Gera a assinatura HMAC-SHA1
    $oauthParams['oauth_signature'] = base64_encode(hash_hmac('sha1', $baseString, $signingKey, true));

    return $oauthParams;
}

$oauthParams = oauthSign(
    'GET',
    $endpoint,
    $queryParams,
    OAUTH_CONSUMER_SECRET,
    OAUTH_TOKEN_SECRET
);

// Monta o header Authorization
$authParts = [];
foreach ($oauthParams as $key => $value) {
    $authParts[] = rawurlencode($key) . '="' . rawurlencode($value) . '"';
}
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
