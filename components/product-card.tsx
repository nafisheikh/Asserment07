import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { Product } from '@/types/bazardor';

import {
  bn,
  changeValue,
  productEmoji,
  productName,
  productPrice,
  productSlug,
} from '@/lib/utils';

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const change = changeValue(product);

  const unit =
    product.unit === 'kg'
      ? 'কেজি'
      : product.unit === 'litre'
        ? 'লিটার'
        : product.unit === 'dozen'
          ? 'ডজন'
          : product.unit === 'piece'
            ? 'টি'
            : product.unit || 'কেজি';

  return (
    <Link
      href={`/product/${productSlug(product)}`}
      className="product-card"
      style={{
        animationDelay: `${Math.min(index, 8) * 45}ms`,
      }}
    >
      <div className="product-card-top">
        <div className="product-emoji">
          {productEmoji(product)}
        </div>

        <span
          className={`change-badge ${
            change > 0 ? 'up' : change < 0 ? 'down' : 'flat'
          }`}
        >
          {change > 0 ? '▲' : change < 0 ? '▼' : '—'}{' '}
          {bn(Math.abs(change))}%
        </span>
      </div>

      <div className="product-name">
        {productName(product)}
      </div>

      <div className="product-unit">প্রতি {unit}</div>

      <div className="card-price-row">
        <div>
          <small>আজকের দাম</small>

          <strong>
            {bn(productPrice(product))}
            <span> টাকা</span>
          </strong>
        </div>

        <span className="card-arrow">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}