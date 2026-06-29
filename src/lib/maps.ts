export function getMapsEmbedUrl(address: string, apiKey?: string): string {
  const query = encodeURIComponent(address);

  if (apiKey) {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&language=es&zoom=16`;
  }

  return `https://maps.google.com/maps?q=${query}&hl=es&z=16&output=embed`;
}

export function getMapsDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function getMapsSearchUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
