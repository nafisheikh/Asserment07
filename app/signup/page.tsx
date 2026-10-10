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

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setBusy(true);

    try {
      await authClient.signUp.email({
        name: name.trim(),
        email,
        password,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Account created. Please sign in.');
            router.push('/signin');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || 'Could not create account');
          },
        },
      });
    } catch {
      toast.error('Could not create account');
    } finally {
      setBusy(false);
    }
  }

  async function social(provider: 'google' | 'github') {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: '/',
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message || 'Social login is unavailable');
          },
        },
      });
    } catch {
      toast.error('Social login is unavailable');
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-art">
        <div className="auth-art-mark">🛒</div>
        <div className="section-kicker">A better shopping experience</div>
        <h2>
          Shop smart,
          <br />
          <span>save more.</span>
        </h2>
        <p>Stay updated with market prices from today.</p>
        <div className="auth-produce">🥕 🍅 🧄 🫘 🥚</div>
      </div>

      <div className="auth-panel">
        <Link href="/" className="auth-back">
          ← Back to home
        </Link>

        <div className="auth-heading">
          <span className="auth-icon">
            <ShoppingBasket size={23} />
          </span>
          <h1>Create an account</h1>
          <p>Start your journey with BazarDor</p>
        </div>

        <form onSubmit={submit} className="auth-form">
          <label>
            Your name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              minLength={2}
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
            />
          </label>

          <button
            type="submit"
            className="btn btn-dark auth-submit"
            disabled={busy}
          >
            {busy ? 'Creating account...' : 'Sign up'}
            <ArrowRight size={17} />
          </button>
        </form>

        <div className="auth-divider">
          <span>Or sign up with</span>
        </div>

        <div className="social-row">
          <button type="button" onClick={() => social('google')}>
            <Chrome size={17} />
            Google
          </button>
          <button type="button" onClick={() => social('github')}>
            <Github size={17} />
            GitHub
          </button>
        </div>

        <p className="auth-switch">
          Already have an account? <Link href="/signin">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
