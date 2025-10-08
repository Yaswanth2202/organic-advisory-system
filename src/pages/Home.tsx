import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Book, Users, Leaf, Sun, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-farmer.jpg";
import cropScanIcon from "@/assets/crop-scan-icon.jpg";
import organicIcon from "@/assets/organic-solutions-icon.jpg";
import communityIcon from "@/assets/community-icon.jpg";

const Home = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Camera,
      titleKey: "home.features.disease.title",
      descKey: "home.features.disease.desc",
      image: cropScanIcon,
      link: "/scan"
    },
    {
      icon: Leaf,
      titleKey: "home.features.organic.title",
      descKey: "home.features.organic.desc",
      image: organicIcon,
      link: "/scan"
    },
    {
      icon: Book,
      titleKey: "home.features.knowledge.title",
      descKey: "home.features.knowledge.desc",
      image: null,
      link: "/knowledge"
    },
    {
      icon: Users,
      titleKey: "home.features.community.title",
      descKey: "home.features.community.desc",
      image: communityIcon,
      link: "/community"
    }
  ];

  const benefits = [
    { icon: Sun, textKey: "home.benefits.seasonal" },
    { icon: Droplets, textKey: "home.benefits.water" },
    { icon: Leaf, textKey: "home.benefits.organic" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/scan">
                    <Camera className="mr-2 w-5 h-5" />
                    {t('home.hero.scan')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/knowledge">
                    <Book className="mr-2 w-5 h-5" />
                    {t('home.hero.browse')}
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <benefit.icon className="w-5 h-5 text-primary" />
                    <span>{t(benefit.textKey)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
              <img
                src={heroImage}
                alt="Tribal farmer examining organic crops"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('home.features.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
              >
                <CardHeader>
                  <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {feature.image ? (
                      <img 
                        src={feature.image} 
                        alt={t(feature.titleKey)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon className="w-16 h-16 text-primary" />
                    )}
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    {t(feature.titleKey)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t(feature.descKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={feature.link}>
                      {t('home.learnMore')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/scan">
              <Camera className="mr-2 w-5 h-5" />
              {t('home.cta.scan')}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
