import fetch from 'node-fetch';

const buildHeaders = (allowOrigin) => ({
  'Access-Control-Allow-Origin': allowOrigin,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
});

const getAllowOrigin = (event, allowedOrigins) => {
  const origin = event.headers.Origin || event.headers.origin;

  return allowedOrigins.includes(origin) ? origin : '';
};

exports.handler = async (event) => {
  const apiKey = process.env.DEEPL_API_KEY;
  const { text, source, target } = JSON.parse(event.body || '{}');

  const endpoint = 'https://api-free.deepl.com/v2/translate';
  const allowedOrigins = [
    'https://ruan-moraes.github.io',
    'http://127.0.0.1:5500',
  ];

  const allowOrigin = getAllowOrigin(event, allowedOrigins);

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: buildHeaders(allowOrigin),
      body: '',
    };
  }

  try {
    const response = await fetch(
      `${endpoint}?auth_key=${apiKey}&text=${encodeURIComponent(
        text
      )}&source_lang=${source}&target_lang=${target}`
    );

    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: buildHeaders(allowOrigin),
      body: response.ok ? JSON.stringify(data) : `${response.statusText}`,
    };
  } catch (error) {
    console.error('Erro interno no servidor:', error);
    
    return {
      statusCode: 500,
      headers: buildHeaders(allowOrigin),
      body: JSON.stringify({ error: 'Erro interno no servidor' }),
    };
  }
};
