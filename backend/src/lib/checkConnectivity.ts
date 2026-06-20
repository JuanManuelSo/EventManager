export async function checkConnectivity(): Promise<boolean> {
  try {
    const res = await fetch("https://res.cloudinary.com", {
      method: "HEAD",
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
