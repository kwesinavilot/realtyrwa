'use client';

import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import VideoUploader from '@/components/upload/VideoUploader';
import PropertyForm from '@/components/upload/PropertyForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Upload, ArrowLeft } from 'lucide-react';
import { uploadProperty } from '@/lib/data';
import { Property } from '@/lib/types';
import Header from '@/components/shared/Header';

type UploadStep = 'upload' | 'form' | 'success';

function UploadPageContent() {
  const [currentStep, setCurrentStep] = useState<UploadStep>('upload');
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedProperty, setUploadedProperty] = useState<Property | null>(null);
  const router = useRouter();

  const handleVideoSelect = (file: File) => {
    setSelectedVideo(file);
    setCurrentStep('form');
  };

  const handleRemoveVideo = () => {
    setSelectedVideo(null);
    setCurrentStep('upload');
  };

  const handleFormSubmit = async (formData: any) => {
    if (!selectedVideo) return;

    setIsSubmitting(true);

    try {
      const propertyData = {
        ...formData,
        videoUrl: URL.createObjectURL(selectedVideo),
        thumbnail: `https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800`,
        availableShares: formData.totalShares,
        roi: formData.expectedROI,
        isPublic: true,
      };

      const property = await uploadProperty(propertyData);
      setUploadedProperty(property);
      setCurrentStep('success');
    } catch (error) {
      console.error('Failed to upload property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
    setSelectedVideo(null);
  };

  const handleViewProperty = () => {
    if (uploadedProperty) {
      router.push(`/property/${uploadedProperty.id}`);
    }
  };

  const handleUploadAnother = () => {
    setCurrentStep('upload');
    setSelectedVideo(null);
    setUploadedProperty(null);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  List Your Property
                </h1>
                <p className="text-slate-400">
                  Upload a video and property details to start receiving investments
                </p>
              </div>

              {currentStep === 'form' && (
                <Button
                  variant="outline"
                  onClick={handleBackToUpload}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Upload
                </Button>
              )}
            </div>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-8">
              {[
                { key: 'upload', label: 'Upload Video', icon: Upload },
                { key: 'form', label: 'Property Details', icon: Upload },
                { key: 'success', label: 'Complete', icon: CheckCircle },
              ].map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.key;
                const isCompleted =
                  (currentStep === 'form' && step.key === 'upload') ||
                  (currentStep === 'success' && step.key !== 'success');

                return (
                  <div key={step.key} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${isActive
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : isCompleted
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-slate-600 text-slate-400'
                      }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`ml-3 text-sm font-medium ${isActive || isCompleted ? 'text-white' : 'text-slate-400'
                      }`}>
                      {step.label}
                    </span>
                    {index < 2 && (
                      <div className={`w-16 h-0.5 ml-8 ${isCompleted ? 'bg-green-500' : 'bg-slate-600'
                        }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 'upload' && (
              <VideoUploader
                onVideoSelect={handleVideoSelect}
                selectedVideo={selectedVideo}
                onRemoveVideo={handleRemoveVideo}
              />
            )}

            {currentStep === 'form' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <PropertyForm
                    onSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                  />
                </div>

                <div className="space-y-6">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Video Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedVideo && (
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <video
                            src={URL.createObjectURL(selectedVideo)}
                            controls
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <h3 className="text-white font-semibold mb-4">Tips for Success</h3>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li>• Keep videos under 60 seconds for maximum engagement</li>
                        <li>• Show the property's best features and unique selling points</li>
                        <li>• Include neighborhood highlights and amenities</li>
                        <li>• Use good lighting and stable camera work</li>
                        <li>• Add captions or voice-over to explain key details</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentStep === 'success' && uploadedProperty && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4">
                    Property Listed Successfully!
                  </h2>

                  <p className="text-slate-400 mb-8">
                    Your property "{uploadedProperty.title}" has been listed and is now available for investment.
                  </p>

                  <div className="space-y-4">
                    <Button
                      onClick={handleViewProperty}
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      size="lg"
                    >
                      View Property Page
                    </Button>

                    <Button
                      onClick={handleUploadAnother}
                      variant="outline"
                      className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                      size="lg"
                    >
                      Upload Another Property
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <UploadPageContent />
    </ProtectedRoute>
  );
}