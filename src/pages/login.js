import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginSuccess,
  loginFailure,
  selectIsAuthenticated,
  selectCoordinator,
  selectLoginError,
  logout
} from '../redux/slices/authSlice';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Loader2,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const coordinator = useSelector(selectCoordinator);
  const loginError = useSelector(selectLoginError);

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('kiotfest2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  // If already authenticated, allow redirecting
  useEffect(() => {
    if (isAuthenticated && router.query.redirect) {
      router.push(router.query.redirect);
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!username.trim() || !password.trim()) {
      setLocalError('Please enter username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      dispatch(loginSuccess(data));
      const targetUrl = router.query.redirect || '/admin';
      router.push(targetUrl);
    } catch (err) {
      setLocalError(err.message);
      dispatch(loginFailure(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Coordinator Login | KIOT FEST 2026</title>
        <meta name="description" content="Coordinator and faculty authentication portal for KIOT Fest 2026." />
      </Head>

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md fest-glass rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-glow-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Coordinator Authentication</span>
            </div>
            <h1 className="text-2xl font-black text-white">Event Coordinator Portal</h1>
            <p className="text-xs text-slate-400">
              Sign in with your authorized faculty/student credentials to create and manage fest events.
            </p>
          </div>

          {/* Already Logged In Banner */}
          {isAuthenticated ? (
            <div className="p-4 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-center space-y-3">
              <p className="text-xs text-indigo-300">
                You are currently signed in as <span className="font-bold text-white">{coordinator?.name || coordinator?.username}</span> (
                {coordinator?.role || 'Coordinator'})
              </p>
              <div className="flex gap-2">
                <Link
                  href="/admin"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center justify-center space-x-1"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Error Message */}
              {(localError || loginError) && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{localError || loginError}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Coordinator Username / Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. admin or cse_coordinator"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Security Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-glow-primary transition flex items-center justify-center space-x-2 touch-target"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In as Coordinator</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Demo Credentials Helper Box for Students */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1 text-slate-400">
                <p className="font-bold text-slate-300 flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Workshop Demo Credentials:</span>
                </p>
                <div className="font-mono text-slate-300 pl-4 space-y-0.5">
                  <p>Username: <span className="text-amber-300 font-bold">admin</span></p>
                  <p>Password: <span className="text-emerald-400 font-bold">kiotfest2026</span></p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
