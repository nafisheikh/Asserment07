import type { Product } from '@/types/bazardor';

export function bn(value: number | string | undefined): string {
  const n = Number(
    String(value ?? 0)
      .replace(/[০-৯]/g, (d) =>
        String('০১২৩৪৫৬৭৮৯'.indexOf(d))
      )
      .replace(/,/g, '')
  );

  return (Number.isFinite(n) ? n : 0).toLocaleString('bn-BD', {
    maximumFractionDigits: 2,
  });
}

export function numeric(
  value: number | string | undefined
): number {
  return (
    Number(
      String(value ?? 0)
        .replace(/[০-৯]/g, (d) =>
          String('০১২৩৪৫৬৭৮৯'.indexOf(d))
        )
        .replace(/[৳,\s]/g, '')
    ) || 0
  );
}

export function productPrice(p: Product): number {
  return numeric(
    p.today ??
      p.current_price ??
      p.price ??
      p.average_price ??
      p.min_price
  );
}

export function productName(p: Product): string {
  return p.nameBn ?? p.name ?? p.title ?? 'নাম পাওয়া যায়নি';
}

export function productSlug(p: Product): string {
  return String(
    p.slug ??
      p.id ??
      p._id ??
      productName(p).replace(/\s+/g, '-')
  );
}

export function productEmoji(p: Product): string {
  if (p.image) return p.image;
  if (p.emoji) return p.emoji;
  if (p.categoryIcon) return p.categoryIcon;

  const s = `${productName(p)} ${p.category ?? ''}`.toLowerCase();

  if (/চাল|rice/.test(s)) return '🍚';
  if (/ডাল|bean|lentil/.test(s)) return '🫘';
  if (/আলু|potato/.test(s)) return '🥔';
  if (/পেঁয়াজ|পেঁয়াজ|onion/.test(s)) return '🧅';
  if (/মরিচ|chili/.test(s)) return '🌶️';
  if (/মাছ|fish|ইলিশ/.test(s)) return '🐟';
  if (/মুরগি|মাংস|chicken/.test(s)) return '🍗';
  if (/ডিম|egg/.test(s)) return '🥚';
  if (/রসুন|garlic/.test(s)) return '🧄';
  if (/তেল|oil/.test(s)) return '🫙';

  return '🥬';
}

export function changeValue(p: Product): number {
  const change = p.change;

  if (typeof change === 'object' && change !== null) {
    return numeric(change.pct);
  }

  return numeric(p.change_percent ?? change);
}