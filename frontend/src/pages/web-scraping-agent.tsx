import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiSearch, FiCode, FiDatabase, FiCpu, FiMonitor, FiRefreshCw, FiDownload } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';

export default function WebScrapingAgentPage() {
  const router = useRouter();

  const capabilities = [
    {
      icon: <FiMonitor className="h-6 w-6" />,
      title: 'Browser Automation',
      description: 'Intelligent navigation through complex websites with JavaScript rendering support.',
    },
    {
      icon: <FiSearch className="h-6 w-6" />,
      title: 'Smart Content Extraction',
      description: 'Intelligent identification and extraction of valuable content using advanced algorithms.',
    },
    {
      icon: <FiRefreshCw className="h-6 w-6" />,
      title: 'Adaptive Scraping',
      description: 'Self-adjusting extraction techniques that adapt to changing website structures.',
    },
    {
      icon: <FiDownload className="h-6 w-6" />,
      title: 'Data Processing',
      description: 'Clean, transform, and export scraped data in various formats (JSON, CSV, etc.).',
    },
    {
      icon: <FiDatabase className="h-6 w-6" />,
      title: 'Structured Data Storage',
      description: 'Automatic organization and storage of extracted information in databases.',
    },
    {
      icon: <FiCpu className="h-6 w-6" />,
      title: 'AI-Enhanced Analysis',
      description: 'Natural language processing to derive insights from unstructured web content.',
    },
  ];

  const useCases = [
    {
      title: 'Market Research',
      description: 'Gather competitor pricing, product information, and market trends automatically.',
    },
    {
      title: 'Content Aggregation',
      description: 'Collect and consolidate news, articles, and information from multiple sources.',
    },
    {
      title: 'Lead Generation',
      description: 'Extract contact information and business details for sales prospecting.',
    },
    {
      title: 'Data Monitoring',
      description: 'Track changes on websites and receive alerts when specific information updates.',
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

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <motion.section 
        className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30"
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
            Introducing
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-aether-primary via-aether-accent to-aether-secondary animate-gradient-shift bg-300%"
            variants={fadeInUp}
          >
            AetherForge Web Scraping Agent
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl mx-auto mb-8 text-lg text-muted-foreground"
            variants={fadeInUp}
          >
            An intelligent, autonomous agent that navigates the web on your behalf, extracting valuable data with precision while respecting website terms of service.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <button 
              onClick={() => router.push('/scrape')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Try the Agent Now
            </button>
            
            <button 
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
            >
              View Sample Results
            </button>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* How It Works */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeInUp}
          >
            How the Web Scraping Agent Works
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Configure</h3>
              <p className="text-muted-foreground">Simply provide the target URL and specify what data you need to extract.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Agent Activation</h3>
              <p className="text-muted-foreground">Our intelligent agent navigates the website, identifying and extracting the requested information.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Results</h3>
              <p className="text-muted-foreground">Receive structured, clean data ready for analysis, export, or integration with other systems.</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center"
            variants={fadeInUp}
          >
            <button 
              onClick={() => router.push('/scrape')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Start Scraping Now
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Capabilities */}
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
            Agent Capabilities
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div 
                key={index}
                className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {capability.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{capability.title}</h3>
                <p className="text-muted-foreground">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Use Cases */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeInUp}
          >
            Common Use Cases
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div 
                key={index}
                className="bg-card p-6 rounded-lg border shadow-sm"
                variants={slideIn}
              >
                <h3 className="text-xl font-medium mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Call to Action */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-muted/30 to-background"
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
            <h2 className="text-3xl font-bold mb-4">Ready to harness the power of autonomous web scraping?</h2>
            <p className="text-muted-foreground mb-8">
              Start extracting valuable insights from websites with AetherForge's intelligent Web Scraping Agent.
            </p>
            <button 
              onClick={() => router.push('/scrape')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Launch Web Scraping Agent
            </button>
          </motion.div>
        </div>
      </motion.section>
    </MainLayout>
  );
} 