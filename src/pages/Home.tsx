import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Book, Users, Leaf, Sun, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farmer.jpg";
import cropScanIcon from "@/assets/crop-scan-icon.jpg";
import organicIcon from "@/assets/organic-solutions-icon.jpg";
import communityIcon from "@/assets/community-icon.jpg";

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "Crop Disease Detection",
      description: "Upload photos to identify diseases and pests instantly using AI technology",
      image: cropScanIcon,
      link: "/scan"
    },
    {
      icon: Leaf,
      title: "Organic Solutions",
      description: "Get traditional and scientific organic remedies using locally available materials",
      image: organicIcon,
      link: "/scan"
    },
    {
      icon: Book,
      title: "Knowledge Database",
      description: "Access integrated wisdom from traditional and modern farming practices",
      image: null,
      link: "/knowledge"
    },
    {
      icon: Users,
      title: "Community Sharing",
      description: "Connect with fellow farmers, share experiences, and learn together",
      image: communityIcon,
      link: "/community"
    }
  ];

  const benefits = [
    { icon: Sun, text: "Seasonal weather-based guidance" },
    { icon: Droplets, text: "Water conservation techniques" },
    { icon: Leaf, text: "100% organic farming methods" }
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
                Empowering Farmers with AI & Tradition
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Identify crop diseases, get organic solutions, and preserve traditional farming knowledge - all in your language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/scan">
                    <Camera className="mr-2 w-5 h-5" />
                    Start Scanning
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/knowledge">
                    <Book className="mr-2 w-5 h-5" />
                    Browse Knowledge
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <benefit.icon className="w-5 h-5 text-primary" />
                    <span>{benefit.text}</span>
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
            Everything You Need for Organic Farming
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining AI technology with traditional knowledge to help you grow healthier crops naturally
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
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon className="w-16 h-16 text-primary" />
                    )}
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={feature.link}>
                      Learn More
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
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers using AI-powered organic solutions
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/scan">
              <Camera className="mr-2 w-5 h-5" />
              Scan Your First Crop
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
