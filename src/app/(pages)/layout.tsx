import { Header } from '@/components/layout';
import styles from './layout.module.sass';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
}
