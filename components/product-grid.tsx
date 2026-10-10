import ProductCard from '@/components/product-card';
import type { Product } from '@/types/bazardor';
export function ProductSkeleton(){return <div className="product-grid">{Array.from({length:8},(_,i)=><div className="skeleton-card" key={i}><div className="sk sk-emoji"/><div className="sk sk-line"/><div className="sk sk-short"/><div className="sk sk-price"/></div>)}</div>}
export default function ProductGrid({ products }: {products:Product[]}) { if(!products.length) return <div className="empty-state"><span>🧺</span><h3>এখনো কোনো পণ্য পাওয়া যায়নি</h3><p>অন্য বিভাগ থেকে পণ্য দেখুন।</p></div>; return <div className="product-grid">{products.map((p,i)=><ProductCard key={String(p.id??p._id??p.slug??p.name)+i} product={p} index={i}/>)}</div> }
