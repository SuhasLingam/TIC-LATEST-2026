"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function PageEntrance({ children }: { children: ReactNode }) {
    return (
        <motion.main
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-screen flex-col"
        >
            {children}
        </motion.main>
    );
}
