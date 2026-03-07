"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { ApplicationForm } from "./ApplicationForm";

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    tier?: "Explorer" | "Visionary" | "Trailblazer";
}

export function ApplicationModal({ isOpen, onClose, tier }: ApplicationModalProps) {
    // Disable scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 md:p-6 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-2xl bg-background border border-foreground/10 shadow-2xl overflow-y-auto max-h-[90vh]"
                    >
                        <ApplicationForm onClose={onClose} defaultTier={tier} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
