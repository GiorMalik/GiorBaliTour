/**
 * Utility function untuk construct image path dengan basePath
 * Digunakan untuk GitHub Pages dimana URL berisi /tessa/
 */

export function getImagePath(imagePath: string): string {
  // Pastikan imagePath dimulai dengan /
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  // Di server-side atau build-time, basePath sudah di-inject oleh Next.js
  // Jadi kita hanya perlu return path apa adanya
  // Next.js akan otomatis menambahkan basePath jika diperlukan
  return normalizedPath;
}
