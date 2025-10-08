import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.scan': 'Crop Scan',
    'nav.knowledge': 'Knowledge',
    'nav.community': 'Community',
    'nav.chat': 'AI Assistant',
    
    // Home Page
    'home.hero.title': 'AI-Powered Organic Advisory',
    'home.hero.subtitle': 'Empowering tribal farmers with traditional wisdom and modern technology',
    'home.hero.cta': 'Start Scanning Crops',
    'home.features.title': 'Key Features',
    'home.features.scan.title': 'Smart Crop Analysis',
    'home.features.scan.desc': 'Upload crop photos for instant disease and pest identification',
    'home.features.organic.title': 'Organic Solutions',
    'home.features.organic.desc': 'Get recommendations using locally available organic materials',
    'home.features.community.title': 'Community Wisdom',
    'home.features.community.desc': 'Share experiences and learn from fellow farmers',
    'home.benefits.title': 'Benefits for Tribal Farmers',
    'home.benefits.preserve': 'Preserve traditional farming knowledge',
    'home.benefits.improve': 'Improve crop yields organically',
    'home.benefits.reduce': 'Reduce dependency on chemicals',
    'home.benefits.connect': 'Connect with farming community',
    
    // Crop Scan
    'scan.title': 'Crop Disease Scanner',
    'scan.subtitle': 'Upload a photo of your crop to identify issues and get organic solutions',
    'scan.upload': 'Upload Crop Photo',
    'scan.capture': 'Capture Photo',
    'scan.analyzing': 'Analyzing crop image...',
    'scan.analysis': 'Analysis Results',
    'scan.solutions': 'Organic Solutions',
    'scan.newScan': 'Scan Another Crop',
    
    // Knowledge Base
    'knowledge.title': 'Organic Farming Knowledge Base',
    'knowledge.subtitle': 'Browse traditional and modern organic farming practices',
    'knowledge.search': 'Search knowledge base...',
    'knowledge.filter.all': 'All Topics',
    'knowledge.filter.pest': 'Pest Control',
    'knowledge.filter.disease': 'Disease Management',
    'knowledge.filter.soil': 'Soil Health',
    'knowledge.filter.seasonal': 'Seasonal Tips',
    'knowledge.readMore': 'Read More',
    
    // Community
    'community.title': 'Farmer Community Forum',
    'community.subtitle': 'Share experiences and learn from fellow farmers',
    'community.newPost': 'Share Your Experience',
    'community.success': 'Success Story',
    'community.question': 'Question',
    'community.tip': 'Farming Tip',
    'community.viewReplies': 'View Replies',
    'community.reply': 'Reply',
    
    // AI Chat
    'chat.title': 'AI Farming Assistant',
    'chat.subtitle': 'Ask questions and upload crop images for expert advice',
    'chat.placeholder': 'Ask about crops, diseases, organic solutions...',
    'chat.send': 'Send',
    'chat.uploadImage': 'Upload Image',
    'chat.thinking': 'Analyzing...',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.scan': 'పంట స్కాన్',
    'nav.knowledge': 'జ్ఞానం',
    'nav.community': 'సంఘం',
    'nav.chat': 'AI సహాయకుడు',
    
    // Home Page
    'home.hero.title': 'AI-ఆధారిత సేంద్రీయ సలహా',
    'home.hero.subtitle': 'సాంప్రదాయ జ్ఞానం మరియు ఆధునిక సాంకేతికతతో గిరిజన రైతులకు సాధికారత',
    'home.hero.cta': 'పంటల స్కానింగ్ ప్రారంభించండి',
    'home.features.title': 'ముఖ్య లక్షణాలు',
    'home.features.scan.title': 'స్మార్ట్ పంట విశ్లేషణ',
    'home.features.scan.desc': 'తక్షణ వ్యాధి మరియు పురుగుల గుర్తింపు కోసం పంట ఫోటోలను అప్‌లోడ్ చేయండి',
    'home.features.organic.title': 'సేంద్రీయ పరిష్కారాలు',
    'home.features.organic.desc': 'స్థానికంగా లభించే సేంద్రీయ పదార్థాలను ఉపయోగించి సిफారసులు పొందండి',
    'home.features.community.title': 'సంఘ జ్ఞానం',
    'home.features.community.desc': 'అనుభవాలను పంచుకోండి మరియు తోటి రైతుల నుండి నేర్చుకోండి',
    'home.benefits.title': 'గిరిజన రైతులకు ప్రయోజనాలు',
    'home.benefits.preserve': 'సాంప్రదాయ వ్యవసాయ జ్ఞానాన్ని సంరక్షించండి',
    'home.benefits.improve': 'సేంద్రీయంగా పంట దిగుబడిని మెరుగుపరచండి',
    'home.benefits.reduce': 'రసాయనాలపై ఆధారపడటం తగ్గించండి',
    'home.benefits.connect': 'వ్యవసాయ సంఘంతో కనెక్ట్ అవ్వండి',
    
    // Crop Scan
    'scan.title': 'పంట వ్యాధి స్కానర్',
    'scan.subtitle': 'సమస్యలను గుర్తించడానికి మరియు సేంద్రీయ పరిష్కారాలను పొందడానికి మీ పంట ఫోటోను అప్‌లోడ్ చేయండి',
    'scan.upload': 'పంట ఫోటో అప్‌లోడ్ చేయండి',
    'scan.capture': 'ఫోటో తీయండి',
    'scan.analyzing': 'పంట చిత్రాన్ని విశ్లేషిస్తోంది...',
    'scan.analysis': 'విశ్లేషణ ఫలితాలు',
    'scan.solutions': 'సేంద్రీయ పరిష్కారాలు',
    'scan.newScan': 'మరో పంటను స్కాన్ చేయండి',
    
    // Knowledge Base
    'knowledge.title': 'సేంద్రీయ వ్యవసాయ జ్ఞాన స్థావరం',
    'knowledge.subtitle': 'సాంప్రదాయ మరియు ఆధునిక సేంద్రీయ వ్యవసాయ పద్ధతులను బ్రౌజ్ చేయండి',
    'knowledge.search': 'జ్ఞాన స్థావరాన్ని శోధించండి...',
    'knowledge.filter.all': 'అన్ని అంశాలు',
    'knowledge.filter.pest': 'పురుగుల నియంత్రణ',
    'knowledge.filter.disease': 'వ్యాధి నిర్వహణ',
    'knowledge.filter.soil': 'నేల ఆరోగ్యం',
    'knowledge.filter.seasonal': 'కాలానుగుణ చిట్కాలు',
    'knowledge.readMore': 'మరింత చదవండి',
    
    // Community
    'community.title': 'రైతు సంఘ వేదిక',
    'community.subtitle': 'అనుభవాలను పంచుకోండి మరియు తోటి రైతుల నుండి నేర్చుకోండి',
    'community.newPost': 'మీ అనుభవాన్ని పంచుకోండి',
    'community.success': 'విజయ కథ',
    'community.question': 'ప్రశ్న',
    'community.tip': 'వ్యవసాయ చిట్కా',
    'community.viewReplies': 'ప్రత్యుత్తరాలను చూడండి',
    'community.reply': 'ప్రత్యుత్తరం',
    
    // AI Chat
    'chat.title': 'AI వ్యవసాయ సహాయకుడు',
    'chat.subtitle': 'నిపుణుల సలహా కోసం ప్రశ్నలు అడగండి మరియు పంట చిత్రాలను అప్‌లోడ్ చేయండి',
    'chat.placeholder': 'పంటలు, వ్యాధులు, సేంద్రీయ పరిష్కారాల గురించి అడగండి...',
    'chat.send': 'పంపండి',
    'chat.uploadImage': 'చిత్రాన్ని అప్‌లోడ్ చేయండి',
    'chat.thinking': 'విశ్లేషిస్తోంది...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
