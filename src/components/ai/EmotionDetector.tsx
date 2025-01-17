import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmotionDetector = () => {
  const [isDetecting, setIsDetecting] = useState(false);

  const handleStartDetection = () => {
    setIsDetecting(true);
    // Emotion detection will be implemented when camera access is set up
    setTimeout(() => setIsDetecting(false), 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-pink-100">
      <CardHeader className="flex flex-row items-center gap-2">
        <Heart className="w-5 h-5 text-pink-500" />
        <CardTitle className="text-lg text-pink-700">Feeling Friend</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-pink-800 mb-4">
          Let's check how you're feeling today!
        </p>
        <Button
          onClick={handleStartDetection}
          disabled={isDetecting}
          className="w-full bg-pink-500 hover:bg-pink-600"
        >
          {isDetecting ? "Detecting..." : "Start Emotion Detection"}
        </Button>
      </CardContent>
    </Card>
  );
};