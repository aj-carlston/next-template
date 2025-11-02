'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import styles from './not-found.module.sass';

export default function NotFoundClient() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Card variant="elevated" padding="lg" className={styles.card}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.message}>
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className={styles.actions}>
            <Button variant="primary" onClick={() => router.back()}>
              Go Back
            </Button>
            <Button variant="secondary" onClick={() => router.push('/home')}>
              Go Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
