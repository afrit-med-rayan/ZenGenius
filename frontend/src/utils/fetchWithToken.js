export async function fetchWithToken(url, getAccessTokenSilently) {
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
}
