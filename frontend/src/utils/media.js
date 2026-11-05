export function parseImagesArray(raw) {
  if (Array.isArray(raw)) {
    return raw.filter(Boolean);
  }
  if (!raw || typeof raw !== 'string') {
    return [];
  }
  const trimmed = raw.trim();
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      return [];
    }
  }
  return trimmed.length > 0 ? [trimmed] : [];
}

export function resolveBuildingPhotos(heroImagesRaw, siteBuildingImages, fallbackImage) {
  const fromRaw = parseImagesArray(heroImagesRaw);
  if (fromRaw.length > 0) return fromRaw;

  const fromSettings = parseImagesArray(siteBuildingImages);
  if (fromSettings.length > 0) return fromSettings;

  return fallbackImage ? [fallbackImage] : [];
}
