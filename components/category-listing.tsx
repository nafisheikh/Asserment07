'use client';
import { useMemo,useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '@/components/product-grid';
import type { Product } from '@/types/bazardor';
import { productPrice } from '@/lib/utils';
export default function CategoryListing({products}:{products:Product[]}){const [sort,setSort]=useState('default');const sorted=useMemo(()=>{const list=[...products];if(sort==='asc')list.sort((a,b)=>productPrice(a)-productPrice(b));if(sort==='desc')list.sort((a,b)=>productPrice(b)-productPrice(a));return list},[products,sort]);return <><div className="sort-bar"><span>{products.length} টি পণ্য পাওয়া গেছে</span><label><SlidersHorizontal size={15}/> সাজান <span className="select-wrap"><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="পণ্য সাজান"><option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select><ChevronDown size={15}/></span></label></div><ProductGrid products={sorted}/></>}
