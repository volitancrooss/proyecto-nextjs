"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
            <div
                className={`
          flex items-center gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-md
          ${type === "success"
                        ? "bg-green-500/90 border border-green-400/50"
                        : "bg-red-500/90 border border-red-400/50"
                    }
        `}
            >
                {type === "success" ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                    <XCircle className="w-6 h-6 text-white" />
                )}

                <p className="text-white font-medium text-sm">{message}</p>

                <button
                    onClick={onClose}
                    className="ml-2 text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                >
                    <X className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
}
