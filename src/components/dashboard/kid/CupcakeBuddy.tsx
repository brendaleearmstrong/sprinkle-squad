import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CupcakeBuddyProps {
  kidData: any;
  suggestions: string[];
}

export const CupcakeBuddy = ({ kidData, suggestions }: CupcakeBuddyProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % suggestions.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [suggestions.length]);

  return (
    <div className="relative">
      {/* Cupcake Character */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: isAnimating ? [0, -5, 5, 0] : 0,
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 0.5,
            },
          }}
          className="relative"
        >
          {/* Cupcake Base */}
          <div className="absolute bottom-0 w-32 h-24 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-3xl" />
          {/* Frosting */}
          <div className="absolute bottom-16 w-40 h-32 bg-gradient-to-b from-purple-400 to-purple-500 rounded-t-[100px]">
            {/* Sprinkles */}
            <div className="absolute w-full h-full">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3,
                }}
                className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-300 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.6,
                }}
                className="absolute top-1/2 left-1/3 w-2 h-2 bg-blue-300 rounded-full"
              />
            </div>
          </div>
          {/* Face */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-24 h-12">
            {/* Eyes */}
            <motion.div
              animate={{
                scaleY: isAnimating ? 0.1 : 1,
              }}
              transition={{ duration: 0.1 }}
              className="absolute left-4 top-2 w-3 h-3 bg-gray-800 rounded-full"
            />
            <motion.div
              animate={{
                scaleY: isAnimating ? 0.1 : 1,
              }}
              transition={{ duration: 0.1 }}
              className="absolute right-4 top-2 w-3 h-3 bg-gray-800 rounded-full"
            />
            {/* Mouth */}
            <motion.div
              animate={{
                scaleY: isAnimating ? 1.5 : 1,
              }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-800 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Speech Bubble */}
      <Card className="mt-24 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-2 p-3 bg-white/50 rounded-lg border border-purple-100">
                <Sparkles className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-purple-800">{suggestions[currentMessage]}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};