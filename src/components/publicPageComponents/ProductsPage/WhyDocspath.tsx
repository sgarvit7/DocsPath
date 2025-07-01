import React from 'react';
import { 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Shield, 
  ThumbsUp,
  Settings
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}


const WhyDocsPath: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {

  const features: Feature[] = [
    {
      title: "Real-Time Analytics & Smart Dashboards",
      description: "Get comprehensive insights instantly and make data-backed decisions—all from a clean, intuitive interface.",
      icon: <BarChart3 className="w-8 h-8 text-teal-600" />,
      position: 'top-left'
    },
    {
      title: "Lightning-Fast Setup & Seamless Integration",
      description: "Onboard in minutes, not months. Connect with your existing tools and infrastructure without disruption.",
      icon: <Zap className="w-8 h-8 text-teal-600" />,
      position: 'top-right'
    },
    {
      title: "Built to Scale with You",
      description: "From startups to superspecialties, our platform evolves with your growth—no need to change systems.",
      icon: <TrendingUp className="w-8 h-8 text-teal-600" />,
      position: 'bottom-left'
    },
    {
      title: "Uncompromising Security & Privacy",
      description: "HIPAA & GDPR compliant. Role-based access, bank-grade encryption, and total control over data sharing.",
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      position: 'center'
    },
    {
      title: "Customizable. Reliable. Always On.",
      description: "99.9% uptime. Flexible modules tailored to your exact needs. Premium support, 24/7.",
      icon: <Settings className="w-8 h-8 text-teal-600" />,
      position: 'bottom-right'
    }
  ];

  const FeatureCard: React.FC<{ feature: Feature; className?: string }> = ({ 
    feature, 
    className = "" 
  }) => (
    <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
    } ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          {feature.icon}
        </div>
        <div>
          <h3 className={`text-lg font-semibold mb-2 leading-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {feature.title}
          </h3>
          <p className={`text-sm leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );

  const DoctorAvatar: React.FC = () => (
    <div className="relative">
      {/* Doctor illustration placeholder */}
      <div className={`w-48 h-48 rounded-full flex items-center justify-center shadow-xl ${
        darkMode ? 'bg-gray-700 border-4 border-gray-600' : 'bg-white border-4 border-teal-100'
      }`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-600 rounded-full mx-auto mb-2 flex items-center justify-center">
            <ThumbsUp className="w-8 h-8 text-white" />
          </div>
          <div className={`text-sm font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Healthcare Professional
          </div>
          <div className="text-xs text-teal-600 mt-1">
            Approved & Recommended
          </div>
        </div>
      </div>
      
      {/* Thumbs up indicators */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
        <ThumbsUp className="w-4 h-4 text-white" />
      </div>
      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
        <ThumbsUp className="w-4 h-4 text-white" />
      </div>
    </div>
  );

  return (
    <div className={`py-16 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="bg-teal-600 py-8 mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center">
            Why DocsPath?
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Grid layout for desktop */}
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Top Left */}
            <div className="col-span-4">
              <FeatureCard feature={features[0]} />
            </div>
            
            {/* Top Right */}
            <div className="col-span-4 col-start-9">
              <FeatureCard feature={features[1]} />
            </div>
            
            {/* Center Doctor */}
            <div className="col-span-4 col-start-5 row-start-2 flex justify-center">
              <DoctorAvatar />
            </div>
            
            {/* Bottom Left */}
            <div className="col-span-4 row-start-3">
              <FeatureCard feature={features[2]} />
            </div>
            
            {/* Center Bottom */}
            <div className="col-span-4 col-start-5 row-start-3">
              <FeatureCard feature={features[3]} />
            </div>
            
            {/* Bottom Right */}
            <div className="col-span-4 col-start-9 row-start-3">
              <FeatureCard feature={features[4]} />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          <div className="flex justify-center mb-8">
            <DoctorAvatar />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-100 rounded-full opacity-15"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-teal-300 rounded-full opacity-10"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-20"></div>
      </div>
    </div>
  );
};

export default WhyDocsPath;