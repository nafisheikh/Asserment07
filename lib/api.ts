
import type { Category, Product } from '@/types/bazardor';

const BASE_URL = 'https://openapi.programming-hero.com/api/bazardor';

function unwrap<T>(json: any): T {
  let value = json?.data ?? json;

  for (let i = 0; i < 4; i++) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      break;
    }

    if (value.products !== undefined) {
      value = value.products;
      continue;
    }

    if (value.categories !== undefined) {
      value = value.categories;
      continue;
    }

    if (value.product !== undefined) {
      value = value.product;
      continue;
    }

    if (value.category !== undefined) {
      value = value.category;
      continue;
    }

    if (value.data !== undefined) {
      value = value.data;
      continue;
    }

    break;
  }

  return value as T;
}

async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `BazarDor API request failed: ${response.status}`
    );
  }

  const json = await response.json();
  return unwrap<T>(json);
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchApi<Product[]>('/products');

  return Array.isArray(data) ? data : [];
}

export async function getProduct(
  slug: string
): Promise<Product | null> {
  try {
    const data = await fetchApi<Product | Product[]>(
      `/products/${encodeURIComponent(slug)}`
    );

    if (Array.isArray(data)) {
      return data[0] ?? null;
    }

    return data && typeof data === 'object' ? data : null;
  } catch {
    const products = await getProducts().catch(() => []);

    return (
      products.find(
        (product) =>
          String(
            product.id ?? product._id ?? product.slug
          ) === slug ||
          product.slug === slug
      ) ?? null
    );
  }
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchApi<Category[]>('/categories');

  return Array.isArray(data) ? data : [];
}

export async function getCategoryProducts(
  slug: string
): Promise<Product[]> {
  try {
    const data = await fetchApi<Product[]>(
      `/products?category=${encodeURIComponent(slug)}`
    );

    return Array.isArray(data) ? data : [];
  } catch {
    const products = await getProducts().catch(() => []);

    return products.filter((product) => {
      const category = product.category;

      if (typeof category === 'string') {
        return (
          category === slug ||
          product.category_name === slug
        );
      }

      return false;
    });
  }
}
