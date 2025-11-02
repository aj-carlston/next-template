'use client';

import { useRouter, usePathname } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import styles from './Header.module.sass';

// Easy configuration - just add new pages here!
const NAV_ITEMS = [
  { label: 'Home', path: '/home' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Settings', path: '/settings' },
] as const;

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>✨</div>
          <span className={styles.logoText}>Optivo</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.path}
                className={`${styles.navButton} ${isActive ? styles.active : ''}`}
                onClick={() => router.push(item.path)}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Avatar 
            alt="User Account" 
            size="md" 
            showMenu={true}
          />
        </div>
      </div>
    </header>
  );
}
