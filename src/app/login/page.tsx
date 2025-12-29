"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, AlertCircle, Mail, Lock, Loader2, X, ArrowBigUp } from "lucide-react";
import { signInWithEmail, resetPassword } from "@/lib/auth";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetLoading, setResetLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetError, setResetError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await signInWithEmail(email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError("");
        setResetLoading(true);

        try {
            await resetPassword(resetEmail);
            setResetSuccess(true);
            setTimeout(() => {
                setShowResetModal(false);
                setResetEmail("");
                setResetSuccess(false);
            }, 3000);
        } catch (err: any) {
            setResetError(err.message || "Error al enviar el correo");
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-neutral-900 text-white font-sans selection:bg-indigo-500/30">
            <div className="flex items-center justify-center p-8 bg-neutral-950 order-1 lg:order-2">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            ¡Bienvenido Compañero!
                            <ArrowBigUp className="w-5 h-5 ml-2 inline" />
                        </h2>
                        <p className="mt-2 text-sm text-neutral-400">
                            Porfavor, introduce tus datos para que podamos procesarlos...
                        </p>

                        {error && (
                            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-2 text-red-400">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-neutral-500 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input id="email" name="email" type="email" autoComplete="email" required placeholder="Correo electrónico." className="block w-full pl-10 pr-3 py-3 border border-neutral-800 rounded-xl leading-5 bg-neutral-900/50 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-neutral-500 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Password" className="block w-full pl-10 pr-3 py-3 border border-neutral-800 rounded-xl leading-5 bg-neutral-900/50 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 sm:text-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-neutral-700 rounded bg-neutral-800"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-neutral-400"
                                >
                                    Aceptar Términos y Condiciones
                                </label>
                            </div>

                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={() => setShowResetModal(true)}
                                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Olvidaste tu contraseña?
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading} className="group relative w-full bg-purple-500 flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-purple-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-indigo-500 transition-all duration-200 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Iniciar Sesión
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <Link href="/" className="mt-4 group relative w-full flex justify-center py-3 px-4 border border-neutral-700 text-sm font-semibold rounded-xl text-neutral-300 bg-transparent hover:bg-neutral-800 hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-neutral-500 transition-all duration-200">
                        <span className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Volver al inicio
                        </span>
                    </Link>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-500">
                            No tienes una cuenta?<br />
                            <Link href="/signup" className="font-semibold text-white hover:text-indigo-400 transition-colors">
                                Registrate Gratis
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Purple Visual Section - Aparece debajo en móvil */}
            <div className="flex flex-col justify-between p-8 lg:p-12 bg-indigo-600 relative overflow-hidden order-2 lg:order-1 min-h-[400px] lg:min-h-0">
                <div className="absolute inset-0 bg-purple-900 opacity-90"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    <h1 className="mt-8 text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                        Volitancrooss website<br />
                        <span className="text-indigo-200">Login Page</span>
                    </h1>
                </div>

                <div className="relative z-10 glass-card p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm max-w-sm mt-8">
                    <p className="text-lg text-indigo-100 font-medium">"Accede a tu cuenta y observa las novedades que les traemos"</p>
                    <div className="mt-4 flex items-center gap-3">
                        <img src="/logov.jpg" alt="User avatar" className="w-10 h-10 rounded-full bg-indigo-400 object-cover" />
                        <div>
                            <div className="text-sm font-semibold text-white">Alexander</div>
                            <div className="text-xs text-indigo-200">Desarrollador</div>
                        </div>
                    </div>
                </div>
            </div>

            {showResetModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => {
                                setShowResetModal(false);
                                setResetEmail("");
                                setResetError("");
                                setResetSuccess(false);
                            }}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white">Recuperar Contraseña</h3>
                            <p className="mt-2 text-sm text-neutral-400">
                                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                            </p>
                        </div>

                        {resetSuccess && (
                            <div className="mb-4 p-3 rounded-lg bg-green-300/10 border border-green-500/50 flex items-center gap-2 text-green-400">
                                <p className="text-sm">¡Correo enviado! Revisa tu bandeja de entrada.</p>
                            </div>
                        )}

                        {resetError && (
                            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-2 text-red-400">
                                <p className="text-sm">{resetError}</p>
                            </div>
                        )}

                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-neutral-500 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    required
                                    placeholder="Correo electrónico"
                                    className="block w-full pl-10 pr-3 py-3 border border-neutral-800 rounded-xl leading-5 bg-neutral-900/50 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={resetLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-indigo-500 transition-all duration-200 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {resetLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Enviar enlace de recuperación"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
