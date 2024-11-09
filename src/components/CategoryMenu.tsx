import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Layout, 
  Server, 
  Shield, 
  Cloud,
  Brain,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Radio,
  ChevronLeft
} from 'lucide-react';

interface Subcategory {
  name: string;
  description: string;
}

interface Category {
  name: string;
  icon: React.ElementType;
  description: string;
  subcategories: Subcategory[];
}

const categories: Category[] = [
  { 
    name: 'Frontend & UI', 
    icon: Layout, 
    description: 'Web UI development and design',
    subcategories: [
      { name: 'React', description: 'React ecosystem and components' },
      { name: 'Vue', description: 'Vue.js framework and tools' },
      { name: 'UI Libraries', description: 'Component libraries and design systems' },
      { name: 'CSS Frameworks', description: 'Styling and layout frameworks' },
      { name: 'Web Components', description: 'Custom elements and web components' },
      { name: 'State Management', description: 'State management solutions' }
    ]
  },
  { 
    name: 'Backend & APIs', 
    icon: Server, 
    description: 'Server-side development',
    subcategories: [
      { name: 'Node.js', description: 'Node.js frameworks and tools' },
      { name: 'Python', description: 'Python backend frameworks' },
      { name: 'API Design', description: 'RESTful and GraphQL APIs' },
      { name: 'Microservices', description: 'Microservice architecture' },
      { name: 'Authentication', description: 'Auth systems and security' },
      { name: 'Databases', description: 'Database systems and ORMs' }
    ]
  },
  { 
    name: 'DevOps & Cloud', 
    icon: Cloud, 
    description: 'Infrastructure and deployment',
    subcategories: [
      { name: 'Docker', description: 'Containerization and orchestration' },
      { name: 'Kubernetes', description: 'Container orchestration' },
      { name: 'CI/CD', description: 'Continuous integration and deployment' },
      { name: 'Monitoring', description: 'System monitoring and logging' },
      { name: 'Cloud Services', description: 'AWS, Azure, and GCP tools' },
      { name: 'Infrastructure', description: 'Infrastructure as code' }
    ]
  },
  { 
    name: 'AI & ML', 
    icon: Brain, 
    description: 'Artificial Intelligence and Machine Learning',
    subcategories: [
      { name: 'Deep Learning', description: 'Neural networks and frameworks' },
      { name: 'NLP', description: 'Natural language processing' },
      { name: 'Computer Vision', description: 'Image and video processing' },
      { name: 'MLOps', description: 'ML operations and deployment' },
      { name: 'Data Science', description: 'Data analysis and visualization' },
      { name: 'AI Tools', description: 'AI development tools' }
    ]
  },
  { 
    name: 'IoT & Embedded', 
    icon: Radio, 
    description: 'Internet of Things and embedded systems',
    subcategories: [
      { name: 'Arduino', description: 'Arduino development' },
      { name: 'Raspberry Pi', description: 'Raspberry Pi projects' },
      { name: 'Sensors', description: 'Sensor integration' },
      { name: 'Protocols', description: 'IoT protocols and standards' },
      { name: 'Edge Computing', description: 'Edge device development' },
      { name: 'Home Automation', description: 'Smart home projects' }
    ]
  },
  { 
    name: 'Cybersecurity', 
    icon: Shield, 
    description: 'Security and protection',
    subcategories: [
      { name: 'Penetration Testing', description: 'Security testing tools' },
      { name: 'Cryptography', description: 'Encryption and security' },
      { name: 'Network Security', description: 'Network protection' },
      { name: 'Security Tools', description: 'Security utilities' },
      { name: 'Threat Detection', description: 'Threat analysis tools' },
      { name: 'Authentication', description: 'Auth systems and protocols' }
    ]
  },
];

interface CategoryMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Component({ isOpen, onToggle }: CategoryMenuProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg md:hidden"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        <aside className="w-80 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
            <div className="flex items-center">
              <Code2 className="w-6 h-6 mr-2 text-primary" />
              <h2 className="text-xl font-bold">Categories</h2>
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle category menu"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isExpanded = expandedCategories.includes(category.name);
                return (
                  <div key={category.name} className="rounded-lg border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full flex items-center p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Icon className="w-5 h-5 mr-3 text-primary" />
                      <span className="flex-1 font-medium">{category.name}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
                        <Link
                          to={`/category/${encodeURIComponent(category.name)}`}
                          className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
                        >
                          <Sparkles className="w-4 h-4 mr-2 text-primary" />
                          View All
                        </Link>
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.name}
                            to={`/category/${encodeURIComponent(category.name)}/${encodeURIComponent(subcategory.name)}`}
                            className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
                          >
                            <ChevronRight className="w-4 h-4 mr-2" />
                            {subcategory.name}
                            <span className="ml-auto text-xs text-gray-400">
                              {subcategory.description}
                            </span>
                          </Link>
                        ))}
                        <p className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                          {category.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Powered by GitHub API</span>
              <Link to="/" className="hover:text-primary transition-colors">
                GitXplore
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.5);
        }
      `}</style>
    </>
  );
}