// Path to the static manual PDF, served from Vite's public/ dir at the site root.
export const MANUAL_PDF_URL = "/manual.pdf";

// Browser-native PDF viewers (Chrome, Edge, Firefox, Safari) honor the
// #page=N URL fragment on a directly-linked PDF and jump straight there.
export function getManualPageUrl(page: number | string): string {
  return `${MANUAL_PDF_URL}#page=${page}`;
}
