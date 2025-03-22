import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiSearch, FiCode, FiDatabase, FiCpu } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: <FiSearch className="h-6 w-6" />,
      title: 'Intelligent HTML Extraction',
      description: 'Extract content from any webpage with precision using our sophisticated content density algorithm.',
    },
    {
      icon: <FiCode className="h-6 w-6" />,
      title: 'API Integration',
      description: 'Connect to APIs and extract structured data with support for pagination and complex JSON paths.',
    },
    {
      icon: <FiDatabase className="h-6 w-6" />,
      title: 'Recursive Crawling',
      description: 'Explore website structures by following links with configurable depth and filtering options.',
    },
    {
      icon: <FiCpu className="h-6 w-6" />,
      title: 'AI-Powered Analysis',
      description: 'Process extracted data with OpenAI to generate insights, summaries, and actionable recommendations.',
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <motion.section 
        className="py-20 md:py-28"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div 
          className="container px-4 md:px-6 mx-auto text-center"
          variants={fadeInUp}
        >
          <motion.div
            className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
            variants={fadeInUp}
          >
            Introducing AetherForge Web Scraping
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-aether-primary via-aether-accent to-aether-secondary animate-gradient-shift bg-300%"
            variants={fadeInUp}
          >
            Extract Web Data with <br className="hidden md:inline" />
            Intelligence & Precision
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl mx-auto mb-8 text-lg text-muted-foreground"
            variants={fadeInUp}
          >
            Our advanced web scraping technology combines powerful agents with an intuitive interface, enabling you to extract valuable data from any website with ease.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <button 
              onClick={() => router.push('/web-scraping-agent')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Web Scraping Agent
            </button>
            
            <button 
              onClick={() => router.push('/scrape')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
            >
              Start Scraping
            </button>
            
            <button 
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-muted/30 transition-colors"
            >
              View Dashboard
            </button>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Feature Grid */}
      <motion.section 
        className="py-16 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeInUp}
          >
            Powerful Scraping Capabilities
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Call to Action */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to extract web data?</h2>
            <p className="text-muted-foreground mb-8">
              Start extracting valuable insights from websites with AetherForge's powerful scraping technology.
            </p>
            <button 
              onClick={() => router.push('/scrape')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Start Your First Scraping Task
            </button>
          </motion.div>
        </div>
      </motion.section>
    </MainLayout>
  );
} 