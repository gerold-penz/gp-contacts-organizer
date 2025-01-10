
async function fetchNextcloudData(accessToken: string) {
  const response = await fetch("https://<nextcloud-domain>/ocs/v2.php/apps/files/api/v1", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Fehler bei der API-Anfrage: ${response.statusText}`);
  }

  return await response.json();
}
