import { useState } from "react";
import { Users, MessageSquare, ThumbsUp, Share2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const [showNewPost, setShowNewPost] = useState(false);

  const posts = [
    {
      id: 1,
      author: "Ravi Kumar",
      avatar: "",
      initials: "RK",
      location: "Warangal District",
      timestamp: "2 hours ago",
      content: "Successfully treated leaf blight using neem oil spray as suggested by this app! My tomato plants are recovering well. Sharing photos for others to see the progress.",
      category: "Success Story",
      likes: 24,
      comments: 8,
      image: null
    },
    {
      id: 2,
      author: "Lakshmi Devi",
      avatar: "",
      initials: "LD",
      location: "Khammam District",
      timestamp: "5 hours ago",
      content: "Question: Has anyone tried the turmeric paste treatment for fungal infections? I want to know the right proportions before applying to my chili crop.",
      category: "Question",
      likes: 12,
      comments: 15,
      image: null
    },
    {
      id: 3,
      author: "Naresh Goud",
      avatar: "",
      initials: "NG",
      location: "Adilabad District",
      timestamp: "1 day ago",
      content: "Traditional tip from my grandfather: Adding cow dung ash to soil before monsoon significantly improves crop health. Been doing this for 3 seasons with great results!",
      category: "Traditional Tip",
      likes: 45,
      comments: 12,
      image: null
    },
    {
      id: 4,
      author: "Sita Reddy",
      avatar: "",
      initials: "SR",
      location: "Karimnagar District",
      timestamp: "2 days ago",
      content: "The seasonal calendar feature helped me plan my monsoon crops perfectly! Got suggestions for disease-resistant varieties based on weather patterns. Highly recommend checking it.",
      category: "Success Story",
      likes: 31,
      comments: 6,
      image: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Forum</h1>
          <p className="text-muted-foreground text-lg">
            Share experiences, ask questions, and learn from fellow farmers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-xs text-muted-foreground">Active Members</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold">3,892</p>
              <p className="text-xs text-muted-foreground">Discussions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <ThumbsUp className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold">856</p>
              <p className="text-xs text-muted-foreground">Success Stories</p>
            </CardContent>
          </Card>
        </div>

        {/* New Post Button */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-4">
            {!showNewPost ? (
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setShowNewPost(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Share Your Experience or Ask a Question
              </Button>
            ) : (
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your farming experience, success story, or ask a question to the community..."
                  className="min-h-32 text-base"
                />
                <div className="flex gap-2">
                  <Button>Post to Community</Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowNewPost(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Community Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {post.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-1">{post.author}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{post.location}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={
                          post.category === "Success Story" 
                            ? "bg-primary/10 text-primary" 
                            : post.category === "Question"
                            ? "bg-accent/10 text-accent"
                            : "bg-secondary/10 text-secondary"
                        }
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  {post.content}
                </p>
                
                <div className="flex items-center gap-6 pt-2 border-t">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expert Consultation Card */}
        <Card className="mt-8 bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Need Expert Advice?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base mb-4">
              Connect with agricultural experts and experienced farmers for personalized guidance
            </CardDescription>
            <Button variant="secondary">
              Schedule Expert Consultation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
