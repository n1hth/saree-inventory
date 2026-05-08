import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Mail, Key, ArrowRight } from 'lucide-react';

export function Login() {
  const { signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      fontFamily: 'var(--font-family)'
    }}>
      {/* Premium Header/Brand Area */}
      <div style={{
        padding: 'var(--spacing-xl) var(--spacing-lg) 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '1.2rem',
          letterSpacing: '2px',
          marginBottom: 'var(--spacing-md)'
        }}>
          LV
        </div>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 300, 
          letterSpacing: '-0.5px',
          color: 'var(--color-text-main)',
          marginBottom: '8px'
        }}>
          Lumina Lux
        </h1>
        <p style={{ 
          color: 'var(--color-text-muted)', 
          fontSize: '0.95rem',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Inventory Management
        </p>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'var(--spacing-xl) var(--spacing-md)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '380px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-lg)'
        }}>
          {error && (
            <div style={{
              color: 'var(--color-danger)',
              fontSize: '0.9rem',
              textAlign: 'center',
              padding: '12px',
              border: '1px solid var(--color-danger)',
              borderRadius: 'var(--radius-sm)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 44px',
                  borderRadius: '0',
                  border: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: 'transparent',
                  fontSize: '1rem'
                }}
              />
              <Mail size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 44px',
                  borderRadius: '0',
                  border: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: 'transparent',
                  fontSize: '1rem'
                }}
              />
              <Key size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-bg)',
                padding: '16px',
                marginTop: 'var(--spacing-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.9rem',
                borderBottom: '1px solid transparent',
                paddingBottom: '2px',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--color-text-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            color: 'var(--color-border)'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>OR</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          </div>

          <button
            onClick={signInWithGoogle}
            type="button"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              color: 'var(--color-text-main)',
              border: '1px solid var(--color-border)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontWeight: 500,
              fontSize: '1rem'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
