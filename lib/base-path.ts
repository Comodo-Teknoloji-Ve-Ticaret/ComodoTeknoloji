/**
 * Site bir alt dizinde yayınlanırsa (ör. github.io/ComodoTeknoloji) bu önek kullanılır.
 * Link ve router önekleri Next.js ekler; public/ altındaki dosyalara giden düz yollar için asset() kullanın.
 * Alan adı kökünde yayında boştur.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
