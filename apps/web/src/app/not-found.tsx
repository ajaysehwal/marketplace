"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-gradient mb-4 text-6xl font-bold">404</h1>
          <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Please check the URL or navigate back to the homepage.
          </p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
