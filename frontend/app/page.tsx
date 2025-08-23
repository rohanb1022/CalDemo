"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-6">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-foreground rounded-sm" />
            <p className="font-medium">
              Made by 
              <span className="text-[#FF3E74] font-bold"> A</span>
              <span className="text-[#FF3E74] font-bold"> R</span>
              <span className="text-[#FF3E74] font-bold"> P</span>
              <span className="text-[#FF3E74] font-bold"> S</span>
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Fintech Illustrations
          </h1>

          {/* Subtext */}
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Creative illustration set for <br /> Financial Technology niche
          </p>

          {/* CTA Button */}
          <Link href="/home">
            <button
              className="inline-flex items-center gap-2 bg-foreground text-background 
                         rounded-md px-4 py-2 text-sm font-medium 
                         hover:bg-foreground/90 transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Button>Click here</Button>
            But
          </Link>
        </motion.div>

        {/* RIGHT SIDE - IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          <Image
            src="/frontBanner.png"
            alt="Fintech Illustration"
            width={500}
            height={500}
            className="w-full max-w-md"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
