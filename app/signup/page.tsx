'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { ArrowRight, Chrome, Github, ShoppingBasket } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [socialBusy, setSocialBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error('নাম কমপক্ষে ২ অক্ষরের হতে হবে');
      return;
    }

    if (!email.trim()) {
      toast.error('ইমেইল ঠিকানা লিখুন');
      return;
    }

    if (password.length < 8) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
      return;
    }

    setBusy(true);

    try {
      await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        fetchOptions: {
          onSuccess: () => {
            toast.success('অ্যাকাউন্ট তৈরি হয়েছে। এবার লগইন করুন।');
            router.push('/signin');
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || 'অ্যাকাউন্ট তৈরি করা যায়নি'
            );
          },
        },
      });
    } catch {
      toast.error('অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setBusy(false);
    }
  }

  async function handleSocialLogin(
    provider: 'google' | 'github'
  ) {
    setSocialBusy(true);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: '/',
        fetchOptions: {
          onError: (ctx) => {
            toast.error(
              ctx.error.message || 'সোশ্যাল লগইন করা যায়নি'
            );
            setSocialBusy(false);
          },
        },
      });
    } catch {
      toast.error('সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।');
      setSocialBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-art">
        <div className="auth-art-mark">🛒</div>
        <div className="section-kicker">আপনার বিশ্বস্ত বাজার</div>

        <h2>
          বাজার করুন,
          <br />
          <span>সাশ্রয় করুন।</span>
        </h2>

        <p>প্রতিদিনের বাজারদর জানুন সহজেই।</p>
        <div className="auth-produce">🥕 🍅 🧄 🫘 🥚</div>
      </section>

      <section className="auth-panel">
        <Link href="/" className="auth-back">
          ← হোম পেজে ফিরে যান
        </Link>

        <div className="auth-heading">
          <span className="auth-icon">
            <ShoppingBasket size={23} />
          </span>

          <h1>নতুন অ্যাকাউন্ট তৈরি করুন</h1>
          <p>BazarDor-এর সঙ্গে আপনার যাত্রা শুরু করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            আপনার নাম
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="সম্পূর্ণ নাম লিখুন"
              autoComplete="name"
              minLength={2}
              required
            />
          </label>

          <label>
            ইমেইল ঠিকানা
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              autoComplete="email"
              required
            />
          </label>

          <label>
            পাসওয়ার্ড
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-dark auth-submit"
            disabled={busy || socialBusy}
          >
            {busy ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
            <ArrowRight size={17} />
          </button>
        </form>

        <div className="auth-divider">
          <span>অথবা নিবন্ধন করুন</span>
        </div>

        <div className="social-row">
          <button
            type="button"
            disabled={busy || socialBusy}
            onClick={() => handleSocialLogin('google')}
          >
            <Chrome size={17} />
            Google
          </button>

          <button
            type="button"
            disabled={busy || socialBusy}
            onClick={() => handleSocialLogin('github')}
          >
            <Github size={17} />
            GitHub
          </button>
        </div>

        <p className="auth-switch">
          আগেই অ্যাকাউন্ট আছে?{' '}
          <Link href="/signin">লগইন করুন</Link>
        </p>
      </section>
    </main>
  );
}
