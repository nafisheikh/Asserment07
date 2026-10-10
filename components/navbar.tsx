'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { LogOut, UserRound } from 'lucide-react';
const cats = [{slug:'chal',name:'চাল',icon:'🍚'},{slug:'dal',name:'ডাল',icon:'🫘'},{slug:'sobji',name:'সবজি',icon:'🥬'},{slug:'mosla',name:'মসলা',icon:'🌶️'},{slug:'mach',name:'মাছ',icon:'🐟'},{slug:'tel',name:'তেল',icon:'🫙'}];
export default function Navbar() {
 const path = usePathname(); const router = useRouter(); const { data: session, isPending } = authClient.useSession();
 async function logout(){ await authClient.signOut({ fetchOptions:{ onSuccess:()=>{toast.success('সফলভাবে সাইন আউট হয়েছে'); router.push('/'); router.refresh();} } }); }
 return <header className="site-header"><div className="topbar wrap"><Link href="/" className="brand"><span className="brand-icon">🛒</span><span><strong>বাজার দর<span className="brand-dot">.</span></strong><small>আজ ২৫ আশ্বিন ১৪৩৩ বঙ্গাব্দ</small></span></Link><nav className="desktop-cats" aria-label="পণ্যের বিভাগ"><Link className={path==='/'?'nav-active':''} href="/">হোম</Link>{cats.map(c=><Link key={c.slug} className={path===`/category/${c.slug}`?'nav-active':''} href={`/category/${c.slug}`}>{c.icon} {c.name}</Link>)}</nav><div className="auth-actions">{isPending? <span className="mini-skeleton"/>:session?.user?<><Link className="profile-link" href="/profile"><UserRound size={16}/><span>{session.user.name||'প্রোফাইল'}</span></Link><button className="btn btn-outline btn-small" onClick={logout}><LogOut size={15}/> বের হন</button></>:<><Link className="signin" href="/signin">সাইন ইন</Link><Link className="btn btn-dark btn-small" href="/signup">সাইন আপ <span>↗</span></Link></>}</div></div><div className="mobile-cats wrap">{cats.map(c=><Link key={c.slug} className={path===`/category/${c.slug}`?'nav-active':''} href={`/category/${c.slug}`}>{c.icon} {c.name}</Link>)}</div></header>
}
