import React from 'react';
import Header from '@app/components/Navbar'; // Adjust the import path as necessary
import HeroSection from '@app/components/HeroSection';
import Features from '@app/components/Features';
import Footer from '@app/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landing Page',
};

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;