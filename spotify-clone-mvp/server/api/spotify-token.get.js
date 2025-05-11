import axios from 'axios';

export default defineEventHandler(async (event) => {
  const code = getQuery(event).code;
  const config = useRuntimeConfig();
  const clientId = config.SPOTIFY_CLIENT_ID;
  const clientSecret = config.SPOTIFY_CLIENT_SECRET;
  const redirectUri = config.public.SPOTIFY_REDIRECT_URI;

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (err) {
    setResponseStatus(event, 400);
    return { error: err.message };
  }
}); 