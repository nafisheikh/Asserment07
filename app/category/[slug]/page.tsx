import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getCategoryProducts } from '@/lib/api';
import CategoryListing from '@/components/category-listing';
export const revalidate=60;
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const [categories,products]=await Promise.all([getCategories().catch(()=>[]),getCategoryProducts(slug).catch(()=>[])]); const category=categories.find(c=>String(c.slug??c.id)===slug); if(!category&&!products.length) notFound(); return <main className="page-shell wrap"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>{category?.name??category?.title??slug}</span></div><div className="category-hero"><div className="category-big-icon">{category?.icon??category?.emoji??'🧺'}</div><div><div className="section-kicker">বিভাগ অনুযায়ী বাজার</div><h1>{category?.name??category?.title??'পণ্যের বিভাগ'}</h1><p>এই বিভাগের সব পণ্যের আজকের দাম তুলনা করুন।</p></div></div><CategoryListing products={products}/></main> }
