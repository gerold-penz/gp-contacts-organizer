async function refreshAccessToken(refreshToken: string) {
  const response = await fetch("https://<nextcloud-domain>/index.php/apps/oauth2/api/v1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.NEXTCLOUD_CLIENT_ID,
      client_secret: process.env.NEXTCLOUD_CLIENT_SECRET,
      refresh_token: refreshToken,
    }),
  });

  const tokens = await response.json();
  if (!response.ok) {
    throw new Error("Token-Erneuerung fehlgeschlagen");
  }
  return tokens;
}
