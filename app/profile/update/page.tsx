
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session?.user.name) {
      setName(session.user.name);
    }

    if (!isPending && !session) {
      toast.error('আগে সাইন ইন করুন');
      router.replace('/signin');
    }
  }, [session, isPending, router]);

  async function update(e: React.FormEvent) {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error('নাম কমপক্ষে ২ অক্ষরের দিন');
      return;
    }

    setBusy(true);

    try {
      await authClient.updateUser({
        name: name.trim(),
        fetchOptions: {
          onSuccess: () => {
            toast.success('প্রোফাইল আপডেট হয়েছে');
            router.push('/profile');
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || 'আপডেট করা যায়নি'
            );
          },
        },
      });
    } catch {
      toast.error('আপডেট করা যায়নি');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page-shell wrap profile-page">
      <Link href="/profile" className="back-link">
        <ArrowLeft size={16} />
        প্রোফাইলে ফিরে যান
      </Link>

      <div className="section-kicker">অ্যাকাউন্ট সেটিংস</div>
      <h1>ব্যক্তিগত তথ্য আপডেট</h1>
      <p className="page-lead">
        আপনার প্রোফাইলে প্রদর্শিত নাম পরিবর্তন করুন।
      </p>

      <form className="update-form" onSubmit={update}>
        <label>
          আপনার নাম
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            required
            minLength={2}
          />
        </label>

        <button className="btn btn-dark" disabled={busy}>
          <Save size={17} />
          {busy ? 'আপডেট হচ্ছে...' : 'তথ্য আপডেট করুন'}
        </button>
      </form>
    </main>
  );
}
