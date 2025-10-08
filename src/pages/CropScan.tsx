import { useState, useRef } from "react";
import { Camera, Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const CropScan = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload or capture a crop image first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-crop', {
        body: { image: selectedImage }
      });

      if (error) throw error;

      setResult(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "Crop condition identified successfully"
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScan = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('scan.title')}</h1>
          <p className="text-muted-foreground text-lg">
            {t('scan.subtitle')}
          </p>
        </div>

        {/* Upload Section */}
        {!selectedImage && (
          <Card className="border-2 border-dashed border-primary/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{t('scan.upload')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t('scan.subtitle')}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="camera-input"
                  />
                  <Button 
                    size="lg" 
                    onClick={() => document.getElementById('camera-input')?.click()}
                  >
                    <Camera className="mr-2 w-5 h-5" />
                    {t('scan.capture')}
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-input"
                  />
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <Upload className="mr-2 w-5 h-5" />
                    {t('scan.upload')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Preview and Analysis */}
        {selectedImage && !result && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{t('scan.upload')}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={resetScan}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedImage} 
                    alt="Crop to analyze" 
                    className="w-full h-auto max-h-96 object-contain bg-muted"
                  />
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="animate-spin mr-2 w-5 h-5" />
                      {t('scan.analyzing')}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 w-5 h-5" />
                      {t('scan.analysis')}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            <Card className="border-2 border-primary">
              <CardHeader className="bg-primary/5">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{t('scan.analysis')}</CardTitle>
                  </div>
                  <Button variant="outline" size="icon" onClick={resetScan}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedImage!} 
                    alt="Analyzed crop" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <div className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
                    {result}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full"
              onClick={resetScan}
            >
              {t('scan.newScan')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropScan;
