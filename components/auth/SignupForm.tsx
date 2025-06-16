'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User, AtSign, Mail, Lock } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { SignupData } from '@/lib/types';
import Link from 'next/link';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAppStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema)
  });
  console.log('Form errors:', errors);

  const onSubmit = async (data: SignupData) => {
    console.log('Form submitted with data:', data); // Add this line
    setIsLoading(true);
    setError('');

    try {
      console.log('Calling signup...'); // Add this line
      await signup(data);
      console.log('Signup successful, redirecting...'); // Add this line
      router.push('/feed');
    } catch (err) {
      console.error('Signup error:', err); // Add this line
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={(e) => {
      console.log('Form submit event triggered');
      handleSubmit(onSubmit)(e);
    }} className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="name"
              {...register('name')}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-white">Username</Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="username"
              {...register('username')}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="Choose a username"
            />
          </div>
          {errors.username && (
            <p className="text-red-400 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="password"
              type="password"
              {...register('password')}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="Create a password"
            />
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>

      <div className="text-center">
        <div className="text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
}