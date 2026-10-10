'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { ArrowRight, Chrome, Github, ShoppingBasket } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [socialBusy, setSocialBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('ইমেইল ও পাসওয়ার্ড লিখুন');
      return;
    }

    setBusy(true);

    try {
      await authClient.signIn.email({
        email: email.trim(),
        password,
        fetchOptions: {
          onSuccess: () => {
            toast.success('সফলভাবে লগইন হয়েছে!');
            router.push('/');
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || 'লগইন করা যায়নি'
            );
          },
        },
      });
    } catch {
      toast.error('লগইন করা যায়নি। আবার চেষ্টা করুন।');
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

          <h1>লগইন করুন</h1>
          <p>আপনার BazarDor অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-dark auth-submit"
            disabled={busy || socialBusy}
          >
            {busy ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
            <ArrowRight size={17} />
          </button>
        </form>

        <div className="auth-divider">
          <span>অথবা লগইন করুন</span>
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
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/signup">নতুন অ্যাকাউন্ট তৈরি করুন</Link>
        </p>
      </section>
    </main>
  );
}
