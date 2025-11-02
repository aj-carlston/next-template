'use client';

import { forwardRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase';
import Card from './Card';
import styles from './Avatar.module.sass';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'rounded' | 'square';
  className?: string;
  showMenu?: boolean;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = 'Avatar', fallback, size = 'md', variant = 'circle', className = '', showMenu = false }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const getFallbackText = () => {
      if (fallback) return fallback;
      if (alt) {
        // Get initials from alt text
        return alt
          .split(' ')
          .map((word) => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
      }
      return '?';
    };

    const handleSignOut = async () => {
      try {
        const supabase = getSupabaseClient();
        await supabase.auth.signOut();
        router.push('/auth');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    const avatarClasses = [
      styles.avatar,
      styles[size],
      styles[variant],
      showMenu ? styles.clickable : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <>
        <div 
          ref={ref} 
          className={avatarClasses}
          onClick={() => showMenu && setIsOpen(!isOpen)}
        >
          {src ? (
            <img src={src} alt={alt} className={styles.image} />
          ) : (
            <span className={styles.fallback}>{getFallbackText()}</span>
          )}
        </div>

        {showMenu && isOpen && (
          <>
            <div className={styles.overlay} onClick={() => setIsOpen(false)} />
            <Card variant="elevated" padding="md" className={styles.menu}>
              <div className={styles.header}>
                <h3>Account</h3>
              </div>

              <div className={styles.menuList}>
                <button className={styles.menuItem} onClick={() => router.push('/profile')}>
                  <span className={styles.menuIcon}>👤</span>
                  <span>Profile</span>
                </button>
                <div className={styles.divider} />
                <button className={`${styles.menuItem} ${styles.danger}`} onClick={handleSignOut}>
                  <span className={styles.menuIcon}>🚪</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </Card>
          </>
        )}
      </>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
