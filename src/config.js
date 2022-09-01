let baseUrl = 'http://localhost:5000/api/';
let url = 'http://localhost:5000/';
REACT_APP_youtubeApiKey = 'GOOGLE_API_KEY_REDACTED';
REACT_APP_channelId = 'UCPOjsSGMJg3Zwo-RjUoV3oA';

if (window.location.host === 'orientator-dev.falconweb.app') {
  baseUrl = 'https://orientator-api-dev.falconweb.app/api/';
  url = 'https://orientator-api-dev.falconweb.app/';
} else if (window.location.host === 'orientator-qa.falconweb.app') {
  baseUrl = 'https://orientator-qa.falconweb.app/api/';
  url = 'https://orientator-qa.falconweb.app/';
} else if (window.location.host === 'orientator-staging.falconweb.app') {
  baseUrl = 'https://orientator-api-staging.falconweb.app/api/';
  url = 'https://orientator-api-staging.falconweb.app/';
} else if (window.location.host === 'orientator.com') {
  baseUrl = 'https://api.orientator.com/api/';
  url = 'https://api.orientator.com/';
}

module.exports = { baseUrl, url };
