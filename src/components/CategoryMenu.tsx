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
  X,
  ChevronRight,
  Sparkles,
  Radio,
  Smartphone,
  Database,
  Globe,
  Terminal,
  Zap,
  Cpu
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
      { name: 'Angular', description: 'Angular framework and ecosystem' },
      { name: 'Svelte', description: 'Svelte framework and tooling' },
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
      { name: 'Ruby', description: 'Ruby on Rails and related tools' },
      { name: 'Java', description: 'Java backend frameworks and tools' },
      { name: 'Go', description: 'Go language backend development' },
      { name: 'PHP', description: 'PHP frameworks and tools' },
      { name: 'API Design', description: 'RESTful and GraphQL APIs' },
      { name: 'Microservices', description: 'Microservice architecture' }
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
      { name: 'Infrastructure as Code', description: 'Terraform, Ansible, and more' },
      { name: 'Serverless', description: 'Serverless architectures and frameworks' },
      { name: 'Networking', description: 'Cloud networking and SDN' }
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
      { name: 'Reinforcement Learning', description: 'RL algorithms and frameworks' },
      { name: 'AI Ethics', description: 'Ethical AI development' },
      { name: 'AI Tools', description: 'AI development tools and platforms' }
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
      { name: 'Home Automation', description: 'Smart home projects' },
      { name: 'Industrial IoT', description: 'IIoT applications' },
      { name: 'Wearables', description: 'Wearable technology development' }
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
      { name: 'Authentication', description: 'Auth systems and protocols' },
      { name: 'Blockchain Security', description: 'Securing blockchain applications' },
      { name: 'IoT Security', description: 'Securing IoT devices and networks' }
    ]
  },
  { 
    name: 'Mobile Development', 
    icon: Smartphone, 
    description: 'Mobile app development',
    subcategories: [
      { name: 'React Native', description: 'Cross-platform React Native development' },
      { name: 'Flutter', description: 'Google\'s UI toolkit for mobile' },
      { name: 'iOS', description: 'Native iOS development' },
      { name: 'Android', description: 'Native Android development' },
      { name: 'Xamarin', description: 'Cross-platform C# mobile development' },
      { name: 'Ionic', description: 'Hybrid mobile app development' },
      { name: 'Progressive Web Apps', description: 'PWA development' },
      { name: 'Mobile UI/UX', description: 'Mobile user interface design' }
    ]
  },
  { 
    name: 'Databases', 
    icon: Database, 
    description: 'Database systems and data storage',
    subcategories: [
      { name: 'SQL', description: 'Relational database management' },
      { name: 'NoSQL', description: 'Non-relational databases' },
      { name: 'Graph Databases', description: 'Graph-based data models' },
      { name: 'Data Warehousing', description: 'Large-scale data storage' },
      { name: 'ORM', description: 'Object-Relational Mapping tools' },
      { name: 'Database Performance', description: 'Optimization and tuning' },
      { name: 'Data Modeling', description: 'Database design and modeling' },
      { name: 'Database Security', description: 'Securing database systems' }
    ]
  },
  { 
    name: 'Web3 & Blockchain', 
    icon: Globe, 
    description: 'Decentralized web technologies',
    subcategories: [
      { name: 'Ethereum', description: 'Ethereum blockchain development' },
      { name: 'Smart Contracts', description: 'Decentralized application logic' },
      { name: 'DeFi', description: 'Decentralized finance projects' },
      { name: 'NFTs', description: 'Non-fungible token development' },
      { name: 'Crypto Wallets', description: 'Cryptocurrency wallet development' },
      { name: 'Consensus Algorithms', description: 'Blockchain consensus mechanisms' },
      { name: 'Decentralized Storage', description: 'Distributed storage solutions' },
      { name: 'Blockchain Interoperability', description: 'Cross-chain communication' }
    ]
  },
  { 
    name: 'Programming Languages', 
    icon: Terminal, 
    description: 'Various programming languages',
    subcategories: [
      { name: 'JavaScript', description: 'JavaScript language and ecosystem' },
      { name: 'Python', description: 'Python language and libraries' },
      { name: 'Java', description: 'Java language and JVM ecosystem' },
      { name: 'C++', description: 'C++ language and tools' },
      { name: 'Rust', description: 'Rust language and ecosystem' },
      { name: 'Go', description: 'Go language and tools' },
      { name: 'TypeScript', description: 'TypeScript language and tooling' },
      { name: 'Kotlin', description: 'Kotlin language and Android development' }
    ]
  },
  { 
    name: 'Game Development', 
    icon: Zap, 
    description: 'Game design and development',
    subcategories: [
      { name: 'Unity', description: 'Unity game engine development' },
      { name: 'Unreal Engine', description: 'Unreal Engine game development' },
      { name: 'Godot', description: 'Godot engine projects' },
      { name: 'WebGL', description: 'Web-based 3D graphics' },
      { name: 'Game AI', description: 'Artificial intelligence in games' },
      { name: 'Game Physics', description: 'Physics engines for games' },
      { name: 'VR/AR Games', description: 'Virtual and augmented reality games' },
      { name: 'Game Networking', description: 'Multiplayer game networking' }
    ]
  },
  { 
    name: 'Low-Level & Embedded', 
    icon: Cpu, 
    description: 'Low-level programming and embedded systems',
    subcategories: [
      { name: 'Embedded C', description: 'C for embedded systems' },
      { name: 'Assembly', description: 'Assembly language programming' },
      { name: 'FPGA', description: 'Field-Programmable Gate Array development' },
      { name: 'Microcontrollers', description: 'Programming microcontrollers' },
      { name: 'RTOS', description: 'Real-Time Operating Systems' },
      { name: 'Device Drivers', description: 'Developing device drivers' },
      { name: 'Firmware', description: 'Firmware development' },
      { name: 'Bare Metal', description: 'Programming without an OS' }
    ]
  }
];

interface CategoryMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function CategoryMenu({ isOpen, onToggle }: CategoryMenuProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className={`fixed inset-y-0 left-0 transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out z-30 w-80 bg-white dark:bg-gray-800 shadow-lg`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <Code2 className="w-6 h-6 mr-2 text-primary" />
          &lt;/&gt; Categories
        </h2>
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close category menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-64px)] custom-scrollbar">
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
                        <span className="flex-1">{subcategory.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}