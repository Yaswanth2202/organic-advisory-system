import { useState } from "react";
import { Book, Search, Filter, Leaf, Calendar, Bug, Droplets } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const Knowledge = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "pest", nameKey: "knowledge.filter.pest", icon: Bug, color: "bg-destructive/10 text-destructive" },
    { id: "nutrition", nameKey: "knowledge.filter.crop", icon: Leaf, color: "bg-primary/10 text-primary" },
    { id: "seasonal", nameKey: "knowledge.filter.seasonal", icon: Calendar, color: "bg-accent/10 text-accent" },
    { id: "water", nameKey: "knowledge.filter.water", icon: Droplets, color: "bg-secondary/10 text-secondary" }
  ];

  const knowledgeArticles = [
    {
      id: 1,
      title: "Natural Neem-Based Pest Control",
      category: "pest",
      type: "Traditional + Modern",
      description: "Learn how to prepare and use neem-based organic pesticides combining ancient wisdom with modern techniques",
      readTime: "5 min read",
      content: "Neem has been used for centuries in traditional farming..."
    },
    {
      id: 2,
      title: "Composting Techniques for Rich Soil",
      category: "nutrition",
      type: "Traditional",
      description: "Create nutrient-rich compost using locally available materials following time-tested methods",
      readTime: "7 min read",
      content: "Proper composting enriches soil naturally..."
    },
    {
      id: 3,
      title: "Monsoon Crop Planning Guide",
      category: "seasonal",
      type: "Modern",
      description: "Weather-based planning for optimal crop selection and care during monsoon season",
      readTime: "6 min read",
      content: "Understanding monsoon patterns helps in crop selection..."
    },
    {
      id: 4,
      title: "Drip Irrigation with Local Resources",
      category: "water",
      type: "Traditional + Modern",
      description: "Set up efficient water conservation systems using affordable and locally available materials",
      readTime: "8 min read",
      content: "Water conservation is crucial for sustainable farming..."
    },
    {
      id: 5,
      title: "Turmeric as Natural Fungicide",
      category: "pest",
      type: "Traditional",
      description: "Traditional recipe for turmeric-based antifungal treatment for crops",
      readTime: "4 min read",
      content: "Turmeric's antifungal properties make it ideal..."
    },
    {
      id: 6,
      title: "Organic Fertilizer Preparation",
      category: "nutrition",
      type: "Traditional + Modern",
      description: "Step-by-step guide to creating balanced organic fertilizers from kitchen and farm waste",
      readTime: "6 min read",
      content: "Organic fertilizers improve soil health over time..."
    }
  ];

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('knowledge.title')}</h1>
          <p className="text-muted-foreground text-lg">
            {t('knowledge.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder={t('knowledge.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  size="sm"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {t('knowledge.filter.all')}
                </Button>
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.id ? null : category.id
                      )}
                      size="sm"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {t(category.nameKey)}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {t('knowledge.showing')} {filteredArticles.length} {filteredArticles.length === 1 ? t('knowledge.article') : t('knowledge.articles')}
          </p>
        </div>

        {/* Knowledge Articles Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => {
            const category = categories.find(c => c.id === article.category);
            const Icon = category?.icon || Book;
            
            return (
              <Card 
                key={article.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-3 rounded-lg ${category?.color || 'bg-primary/10'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary">{article.type}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.readTime}</span>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                      {t('knowledge.readMore')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <Card className="p-12 text-center">
            <Book className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">{t('knowledge.noResults')}</h3>
            <p className="text-muted-foreground">
              {t('knowledge.noResultsDesc')}
            </p>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5" />
              {t('knowledge.help.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t('knowledge.help.desc')}
            </p>
            <Button>
              {t('knowledge.help.button')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Knowledge;
