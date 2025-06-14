import AuthLayout from '@/components/auth/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of investors building their real estate portfolio"
    >
      <SignupForm />
    </AuthLayout>
  );
}