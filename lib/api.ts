import type { Category, Product } from '@/types/bazardor';
const BASES = [process.env.BAZARDOR_API_URL, 'https://api.abcz.workers.dev/api/bazardor', 'https://api.api-store.workers.dev/api/bazardor' ].filter(Boolean) as string[];
function unwrap<T>(json: any): T {
  let value = json?.data ?? json?.products ?? json?.categories ?? json;
  if (value && !Array.isArray(value) && typeof value === 'object') value = value.products ?? value.categories ?? value.data ?? value;
  return value as T;
}
async function fetchApi<T>(path: string): Promise<T> {
  for (const base of [...new Set(BASES)]) {
    try { const res = await fetch(`${base}${path}`, { next: { revalidate: 60 } }); if (!res.ok) continue; const json = await res.json(); const data = unwrap<T>(json); if (data) return data; } catch { /* try next API mirror */ }
  }
  throw new Error('বাজার দর API এখন পাওয়া যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।');
}
export async function getProducts(): Promise<Product[]> { const data = await fetchApi<Product[]>('/products'); return Array.isArray(data) ? data : []; }
export async function getProduct(slug: string): Promise<Product | null> {
 try { const data = await fetchApi<Product | Product[]>(`/products/${encodeURIComponent(slug)}`); if (Array.isArray(data)) return data[0] ?? null; return data && typeof data === 'object' ? data : null; }
 catch { const all = await getProducts().catch(() => []); return all.find(p => String(p.id ?? p._id ?? p.slug) === slug || p.slug === slug) ?? null; }
}
export async function getCategories(): Promise<Category[]> { const data = await fetchApi<Category[]>('/categories'); return Array.isArray(data) ? data : []; }
export async function getCategoryProducts(slug: string): Promise<Product[]> { try { const data = await fetchApi<Product[]>(`/products?category=${encodeURIComponent(slug)}`); return Array.isArray(data) ? data : []; } catch { return (await getProducts().catch(() => [])).filter(p => p.category === slug || p.category_name === slug); } }
