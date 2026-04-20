import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Dashboard from '@/components/Dashboard';
import DocumentUpload from '@/components/DocumentUpload';
import DocumentVerify from '@/components/DocumentVerify';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Dashboard />
        <DocumentUpload />
        <DocumentVerify />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

