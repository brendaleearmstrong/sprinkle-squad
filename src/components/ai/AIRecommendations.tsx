import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import type { Kid } from "@/types";

interface AIRecommendationsProps {
  kid: Kid;
}

export const AIRecommendations = ({ kid }: AIRecommendationsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchPersonalizedSuggestions();
  }, [kid]);

  const fetchPersonalizedSuggestions = async () => {
    try {
      // For now, we'll use static suggestions until the OpenAI integration is complete
      const defaultSuggestions = [
        `Try completing a new ${kid.level_name} level task`,
        "Take on a challenge that matches your interests",
        "Practice skills you've been working on",
      ];
      setSuggestions(defaultSuggestions);
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't load personalized suggestions",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
      <CardHeader className="flex flex-row items-center gap-2">
        <Brain className="w-5 h-5 text-purple-500" />
        <CardTitle className="text-lg text-purple-700">Sprinkle Buddy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 bg-white/50 rounded-lg border border-purple-100"
            >
              <Sparkles className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-purple-800">{suggestion}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};