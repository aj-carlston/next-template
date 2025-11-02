import type { Metadata } from 'next';
import '../globals.sass';

export const metadata: Metadata = {
  title: 'Sign In - Optivo',
  description: 'Sign in to your account',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
