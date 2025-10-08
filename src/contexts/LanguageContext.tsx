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
    'home.hero.title': 'Empowering Farmers with AI & Tradition',
    'home.hero.subtitle': 'Identify crop diseases, get organic solutions, and preserve traditional farming knowledge - all in your language.',
    'home.hero.scan': 'Start Scanning',
    'home.hero.browse': 'Browse Knowledge',
    'home.features.title': 'Everything You Need for Organic Farming',
    'home.features.subtitle': 'Combining AI technology with traditional knowledge to help you grow healthier crops naturally',
    'home.features.disease.title': 'Crop Disease Detection',
    'home.features.disease.desc': 'Upload photos to identify diseases and pests instantly using AI technology',
    'home.features.organic.title': 'Organic Solutions',
    'home.features.organic.desc': 'Get traditional and scientific organic remedies using locally available materials',
    'home.features.knowledge.title': 'Knowledge Database',
    'home.features.knowledge.desc': 'Access integrated wisdom from traditional and modern farming practices',
    'home.features.community.title': 'Community Sharing',
    'home.features.community.desc': 'Connect with fellow farmers, share experiences, and learn together',
    'home.benefits.seasonal': 'Seasonal weather-based guidance',
    'home.benefits.water': 'Water conservation techniques',
    'home.benefits.organic': '100% organic farming methods',
    'home.cta.title': 'Ready to Transform Your Farming?',
    'home.cta.subtitle': 'Join thousands of farmers using AI-powered organic solutions',
    'home.cta.scan': 'Scan Your First Crop',
    'home.learnMore': 'Learn More',
    
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
    'knowledge.title': 'Knowledge Database',
    'knowledge.subtitle': 'Traditional wisdom meets modern science for organic farming',
    'knowledge.search': 'Search farming practices, pest control, seasonal tips...',
    'knowledge.filter.all': 'All Topics',
    'knowledge.filter.pest': 'Pest Control',
    'knowledge.filter.crop': 'Crop Nutrition',
    'knowledge.filter.seasonal': 'Seasonal Tips',
    'knowledge.filter.water': 'Water Management',
    'knowledge.showing': 'Showing',
    'knowledge.articles': 'articles',
    'knowledge.article': 'article',
    'knowledge.readMore': 'Read More →',
    'knowledge.noResults': 'No articles found',
    'knowledge.noResultsDesc': 'Try adjusting your search or filters to find what you\'re looking for',
    'knowledge.help.title': 'Can\'t find what you\'re looking for?',
    'knowledge.help.desc': 'Visit our community forum to ask questions and learn from fellow farmers\' experiences',
    'knowledge.help.button': 'Visit Community Forum',
    
    // Community
    'community.title': 'Community Forum',
    'community.subtitle': 'Share experiences, ask questions, and learn from fellow farmers',
    'community.members': 'Active Members',
    'community.discussions': 'Discussions',
    'community.stories': 'Success Stories',
    'community.newPost': 'Share Your Experience or Ask a Question',
    'community.placeholder': 'Share your farming experience, success story, or ask a question to the community...',
    'community.post': 'Post to Community',
    'community.cancel': 'Cancel',
    'community.like': 'Like',
    'community.comment': 'Comment',
    'community.share': 'Share',
    'community.expert.title': 'Need Expert Advice?',
    'community.expert.desc': 'Connect with agricultural experts and experienced farmers for personalized guidance',
    'community.expert.button': 'Schedule Expert Consultation',
    
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
    'knowledge.title': 'జ్ఞాన డేటాబేస్',
    'knowledge.subtitle': 'సాంప్రదాయ జ్ఞానం ఆధునిక శాస్త్రంతో కలుస్తుంది సేంద్రీయ వ్యవసాయం కోసం',
    'knowledge.search': 'వ్యవసాయ పద్ధతులు, పురుగుల నియంత్రణ, కాలానుగుణ చిట్కాలను శోధించండి...',
    'knowledge.filter.all': 'అన్ని అంశాలు',
    'knowledge.filter.pest': 'పురుగుల నియంత్రణ',
    'knowledge.filter.crop': 'పంట పోషణ',
    'knowledge.filter.seasonal': 'కాలానుగుణ చిట్కాలు',
    'knowledge.filter.water': 'నీటి నిర్వహణ',
    'knowledge.showing': 'చూపిస్తోంది',
    'knowledge.articles': 'వ్యాసాలు',
    'knowledge.article': 'వ్యాసం',
    'knowledge.readMore': 'మరింత చదవండి →',
    'knowledge.noResults': 'వ్యాసాలు కనుగొనబడలేదు',
    'knowledge.noResultsDesc': 'మీరు వెతుకుతున్నది కనుగొనడానికి మీ శోధన లేదా ఫిల్టర్‌లను సర్దుబాటు చేయండి',
    'knowledge.help.title': 'మీరు వెతుకుతున్నది కనుగొనలేకపోయారా?',
    'knowledge.help.desc': 'ప్రశ్నలు అడగడానికి మరియు తోటి రైతుల అనుభవాల నుండి నేర్చుకోవడానికి మా సంఘ వేదికను సందర్శించండి',
    'knowledge.help.button': 'సంఘ వేదికను సందర్శించండి',
    
    // Community
    'community.title': 'సంఘ వేదిక',
    'community.subtitle': 'అనుభవాలను పంచుకోండి, ప్రశ్నలు అడగండి మరియు తోటి రైతుల నుండి నేర్చుకోండి',
    'community.members': 'క్రియాశీల సభ్యులు',
    'community.discussions': 'చర్చలు',
    'community.stories': 'విజయ కథలు',
    'community.newPost': 'మీ అనుభవాన్ని పంచుకోండి లేదా ప్రశ్న అడగండి',
    'community.placeholder': 'మీ వ్యవసాయ అనుభవం, విజయ కథ లేదా సంఘానికి ప్రశ్న పంచుకోండి...',
    'community.post': 'సంఘానికి పోస్ట్ చేయండి',
    'community.cancel': 'రద్దు చేయండి',
    'community.like': 'ఇష్టం',
    'community.comment': 'వ్యాఖ్య',
    'community.share': 'పంచుకోండి',
    'community.expert.title': 'నిపుణుల సలహా అవసరమా?',
    'community.expert.desc': 'వ్యక్తిగత మార్గదర్శకత్వం కోసం వ్యవసాయ నిపుణులు మరియు అనుభవజ్ఞులైన రైతులతో కనెక్ట్ అవ్వండి',
    'community.expert.button': 'నిపుణుల సంప్రదింపును షెడ్యూల్ చేయండి',
    
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
