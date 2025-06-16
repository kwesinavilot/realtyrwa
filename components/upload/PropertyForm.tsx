'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, DollarSign, Users, TrendingUp, Loader2 } from 'lucide-react';

const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  owner: z.string().min(1, 'Owner name is required'),
  totalValue: z.number().positive('Total value must be positive'),
  sharePrice: z.number().positive('Share price must be positive'),
  totalShares: z.number().positive('Total shares must be positive'),
  riskLevel: z.enum(['Low', 'Medium', 'High']),
  expectedROI: z.string().min(1, 'Expected ROI is required'),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  isSubmitting: boolean;
}

export default function PropertyForm({ onSubmit, isSubmitting }: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      riskLevel: 'Medium',
      expectedROI: '12%'
    }
  });

  const totalValue = watch('totalValue');
  const sharePrice = watch('sharePrice');
  const totalShares = totalValue && sharePrice ? Math.floor(totalValue / sharePrice) : 0;

  const handleFormSubmit = (data: PropertyFormData) => {
    onSubmit({
      ...data,
      totalShares: totalShares,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Property Title</Label>
                <Input
                  id="title"
                  {...register('title')}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Modern Manhattan Loft"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="location"
                    {...register('location')}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                    placeholder="New York, NY"
                  />
                </div>
                {errors.location && (
                  <p className="text-red-400 text-sm">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                placeholder="Describe your property's unique features, location benefits, and investment potential..."
              />
              {errors.description && (
                <p className="text-red-400 text-sm">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner" className="text-white">Property Owner</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="owner"
                  {...register('owner')}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                  placeholder="Your Name or Company"
                />
              </div>
              {errors.owner && (
                <p className="text-red-400 text-sm">{errors.owner.message}</p>
              )}
            </div>

            {/* Financial Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="totalValue" className="text-white">Total Property Value</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="totalValue"
                    type="number"
                    {...register('totalValue', { valueAsNumber: true })}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                    placeholder="500000"
                  />
                </div>
                {errors.totalValue && (
                  <p className="text-red-400 text-sm">{errors.totalValue.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sharePrice" className="text-white">Price Per Share</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="sharePrice"
                    type="number"
                    {...register('sharePrice', { valueAsNumber: true })}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                    placeholder="100"
                  />
                </div>
                {errors.sharePrice && (
                  <p className="text-red-400 text-sm">{errors.sharePrice.message}</p>
                )}
              </div>
            </div>

            {/* Calculated Shares */}
            {totalShares > 0 && (
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Total shares available: </span>
                  <span className="font-semibold text-white">{totalShares.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="expectedROI" className="text-white">Expected ROI</Label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="expectedROI"
                    {...register('expectedROI')}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                    placeholder="12%"
                  />
                </div>
                {errors.expectedROI && (
                  <p className="text-red-400 text-sm">{errors.expectedROI.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskLevel" className="text-white">Risk Level</Label>
                <Select
                  onValueChange={(value) => setValue('riskLevel', value as 'Low' | 'Medium' | 'High')}
                  defaultValue="Medium"
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="Low" className="text-green-400">Low Risk</SelectItem>
                    <SelectItem value="Medium" className="text-yellow-400">Medium Risk</SelectItem>
                    <SelectItem value="High" className="text-red-400">High Risk</SelectItem>
                  </SelectContent>
                </Select>
                {errors.riskLevel && (
                  <p className="text-red-400 text-sm">{errors.riskLevel.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Listing Property...
                </>
              ) : (
                'List Property'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}