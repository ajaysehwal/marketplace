"use client";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Facebook,
  Google,
  Microsoft,
  XformerlyTwitter,
} from "@/components/icons";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import { Provider } from "@supabase/supabase-js";
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SocialAuth({
  heading,
  page,
}: {
  heading: string;
  page: "signin" | "signup";
}) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const socialProviders = [
    {
      name: "Google",
      provider: "google",
      Icon: Google,
      gradient: "from-white to-white",
      hoverGradient: "hover:from-gray-50 hover:to-gray-100",
      borderColor: "border-gray-200 dark:border-sage-800",
      textColor: "text-gray-800 dark:text-gray-200",
      iconColor: "text-[#4285F4]",
      shadowColor: "shadow-[#4285F4]/10",
    },
    {
      name: "Microsoft",
      Icon: Microsoft,
      provider: "azure",
      gradient: "from-white to-white",
      hoverGradient: "hover:from-gray-50 hover:to-gray-100",
      borderColor: "border-gray-200 dark:border-sage-800",
      textColor: "text-gray-800 dark:text-gray-200",
      iconColor: "text-[#00a4ef]",
      shadowColor: "shadow-[#00a4ef]/10",
    },
    {
      name: "X",
      Icon: XformerlyTwitter,
      provider: "twitter",
      gradient: "from-white to-white",
      hoverGradient: "hover:from-gray-50 hover:to-gray-100",
      borderColor: "border-gray-200 dark:border-sage-800",
      textColor: "text-gray-800 dark:text-gray-200",
      iconColor: "text-black dark:text-white",
      shadowColor: "shadow-black/10",
    },
    {
      name: "Facebook",
      Icon: Facebook,
      provider: "facebook",
      gradient: "from-white to-white",
      hoverGradient: "hover:from-gray-50 hover:to-gray-100",
      borderColor: "border-gray-200 dark:border-sage-800",
      textColor: "text-gray-800 dark:text-gray-200",
      iconColor: "text-[#1877F2]",
      shadowColor: "shadow-[#1877F2]/10",
    },
  ];
  const handleAuth = (provider: Provider) => {
    setIsLoading(provider);
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/callback`,
      },
    });
    setTimeout(() => {
      setIsLoading(null);
    }, 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Card className="w-full border-none">
        <CardContent className="relative z-10 space-y-3 pb-6">
          {/* Social login buttons */}
          {socialProviders.map((provider) => (
            <motion.button
              key={provider.name}
              className={`relative flex w-full items-center justify-center rounded-lg border px-4 py-3 ${provider.borderColor} bg-gradient-to-r ${provider.gradient} ${provider.hoverGradient} ${provider.textColor} font-medium transition-all duration-200 ${provider.shadowColor} hover:shadow-md`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAuth(provider.provider as Provider)}
              disabled={isLoading !== null}
            >
              <span className="absolute left-4">
                <provider.Icon
                  className={`h-5 w-5 ${provider.iconColor}`}
                  aria-hidden="true"
                />
              </span>
              {isLoading === provider.provider ? (
                <div className="flex items-center">
                  <div className="border-sage-600 mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                <span>Continue with {provider.name}</span>
              )}
            </motion.button>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
