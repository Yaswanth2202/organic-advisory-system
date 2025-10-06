import { useState, useRef } from "react";
import { Camera, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CropScan = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const analyzeImage = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload or capture a crop image first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Mock AI analysis - replace with actual API call later
    setTimeout(() => {
      setResult({
        disease: "Leaf Blight",
        severity: "Medium",
        confidence: 87,
        description: "Early stage fungal infection detected on crop leaves",
        organicSolutions: [
          {
            name: "Neem Oil Spray",
            materials: ["Neem leaves (100g)", "Water (1 liter)", "Soap (1 tsp)"],
            preparation: "Boil neem leaves in water for 20 minutes. Cool, strain, and add soap. Spray on affected areas every 3 days.",
            effectiveness: "High"
          },
          {
            name: "Turmeric Paste",
            materials: ["Turmeric powder (50g)", "Water (250ml)"],
            preparation: "Mix turmeric with water to form paste. Apply to affected leaves. Repeat weekly.",
            effectiveness: "Medium"
          }
        ]
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Crop condition identified successfully"
      });
    }, 2000);
  };

  const resetScan = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Crop Disease Scanner</h1>
          <p className="text-muted-foreground text-lg">
            Upload or capture a photo of your crop to identify diseases and get organic solutions
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
                  <h3 className="text-xl font-semibold mb-2">Upload Crop Image</h3>
                  <p className="text-muted-foreground mb-6">
                    Take a clear photo of the affected crop leaves or upload from gallery
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
                    Take Photo
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
                    Upload from Gallery
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
                  <CardTitle>Uploaded Image</CardTitle>
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
                      <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 w-5 h-5" />
                      Analyze Crop Condition
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
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-destructive" />
                      {result.disease} Detected
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {result.description}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="icon" onClick={resetScan}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Severity</p>
                    <p className="text-lg font-semibold text-destructive">{result.severity}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                    <p className="text-lg font-semibold text-primary">{result.confidence}%</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Solutions</p>
                    <p className="text-lg font-semibold text-accent">{result.organicSolutions.length}</p>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden mb-6">
                  <img 
                    src={selectedImage!} 
                    alt="Analyzed crop" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Organic Solutions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Recommended Organic Solutions</h2>
              <div className="grid gap-4">
                {result.organicSolutions.map((solution: any, index: number) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{solution.name}</CardTitle>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          solution.effectiveness === 'High' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-secondary/20 text-secondary'
                        }`}>
                          {solution.effectiveness} Effectiveness
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Required Materials:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {solution.materials.map((material: string, idx: number) => (
                            <li key={idx} className="text-muted-foreground">{material}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Preparation Method:</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {solution.preparation}
                        </p>
                      </div>
                      <Button className="w-full" variant="outline">
                        Watch Video Tutorial (Telugu)
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={resetScan}
            >
              Scan Another Crop
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropScan;
