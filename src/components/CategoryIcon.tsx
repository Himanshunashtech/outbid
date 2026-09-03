import React from 'react';
import {
  Briefcase,
  Bot,
  Search,
  Megaphone,
  Coins,
  Code,
  Shield,
  HeartPulse,
  Share2,
  Trophy,
  Users,
  GraduationCap,
  Building2,
  ShoppingCart,
  Globe,
  Gamepad2,
  UserCheck,
  CheckSquare,
  Palette,
  PenTool,
  Compass,
  Sparkles,
  Mic,
  Target,
  Plane,
  Home,
  Newspaper,
  Layers,
  Flame
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Bot': return <Bot className={className} />;
    case 'Search': return <Search className={className} />;
    case 'Megaphone': return <Megaphone className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'Trophy': return <Trophy className={className} />;
    case 'Users': return <Users className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'ShoppingCart': return <ShoppingCart className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Gamepad2': return <Gamepad2 className={className} />;
    case 'UserCheck': return <UserCheck className={className} />;
    case 'CheckSquare': return <CheckSquare className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'PenTool': return <PenTool className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Mic': return <Mic className={className} />;
    case 'Target': return <Target className={className} />;
    case 'Plane': return <Plane className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Newspaper': return <Newspaper className={className} />;
    case 'Layers': return <Layers className={className} />;
    default: return <Flame className={className} />;
  }
};
