"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Grid, List, LogOut, User as UserIcon, Settings, Bell, Clock, Star, X, Trash2, Code, Layout, Shield, Mail, Calendar } from "lucide-react";
import { signOut, onAuthStateChange } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import Toast from "@/components/Toast";

interface Project {
    id: number;
    name: string;
    description: string;
    status: "activa" | "pausada" | "completada";
    progress: number;
    lastUpdated: string;
    category: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Web Development",
        status: "activa" as "activa" | "pausada" | "completada",
        progress: 0
    });

    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            name: "Sistema de Login",
            description: "Implementación de autenticación con Firebase",
            status: "completada",
            progress: 100,
            lastUpdated: "Hace 2 horas",
            category: "Web Development"
        },
        {
            id: 2,
            name: "Dashboard Analytics",
            description: "Panel de control con gráficos y estadísticas",
            status: "activa",
            progress: 65,
            lastUpdated: "Hace 1 día",
            category: "UI/UX"
        },
        {
            id: 3,
            name: "API REST",
            description: "Desarrollo de API para gestión de usuarios",
            status: "pausada",
            progress: 40,
            lastUpdated: "Hace 3 días",
            category: "Backend"
        },
        {
            id: 4,
            name: "App Móvil",
            description: "Aplicación móvil con React Native",
            status: "activa",
            progress: 25,
            lastUpdated: "Hace 5 horas",
            category: "Mobile"
        }


    ]);

    useEffect(() => {
        const unsubscribe = onAuthStateChange((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                router.replace("/login");
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="text-neutral-400">Cargando...</p>
                </div>
            </div>
        );
    }

    const handleLogout = async () => {

        try {
            await signOut();
            router.push("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }

    };

    const handleDeleteProject = (id: number) => {
        setProjects(projects.filter(project => project.id !== id));
        setToastMessage("Proyecto eliminado correctamente");
        setShowSuccessToast(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "activa": return "bg-green-500/20 text-green-400 border-green-500/50";
            case "pausada": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
            case "completada": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
            default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "activa": return "Activo";
            case "pausada": return "Pausado";
            case "completada": return "Completado";
            default: return status;
        }
    };

    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault();

        const newProject: Project = {
            id: Date.now(),
            name: formData.name,
            description: formData.description,
            status: formData.status,
            progress: formData.progress,
            lastUpdated: "Ahora",
            category: formData.category
        };

        setProjects([newProject, ...projects]);
        setShowCreateModal(false);
        setToastMessage("¡Proyecto creado exitosamente!");
        setShowSuccessToast(true);

        setFormData({
            name: "",
            description: "",
            category: "Web Development",
            status: "activa",
            progress: 0
        });
    };



    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-900/80 border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 p-0.5 rounded-xl">
                                <img
                                    src="/logov.jpg"
                                    alt="Logo"
                                    className="w-full h-full object-cover rounded-[10px]"
                                />
                            </div>
                            <h1 className="text-xl font-bold">Gestor de Proyectos</h1>
                        </div>

                        <div className="flex items-center gap-4">


                            <div className="relative">
                                <button
                                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                                    className={`p-2 rounded-lg transition-colors ${showSettingsMenu ? "bg-neutral-800 text-white" : "hover:bg-neutral-800 text-neutral-400 hover:text-white"}`}
                                >
                                    <Settings className="w-5 h-5" />
                                </button>

                                {showSettingsMenu && (
                                    <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="p-3 border-b border-neutral-800">
                                            <p className="text-sm font-medium text-white">Configuración</p>
                                            <p className="text-xs text-neutral-400">Personaliza tu experiencia</p>
                                        </div>
                                        <div className="p-1">
                                            <button onClick={() => { setShowSettingsMenu(false); setShowProfileModal(true); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
                                                <UserIcon className="w-4 h-4" />
                                                <span>Mi Perfil</span>
                                            </button>

                                        </div>
                                        <div className="p-1 border-t border-neutral-800">
                                            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-900 hover:bg-red-500 rounded-lg transition-colors">
                                                <LogOut className="w-4 h-4" />
                                                <span>Cerrar Sesión</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="h-6 w-px bg-neutral-800"></div>

                            <div className="flex items-center gap-2">

                                <span className="text-sm hidden sm:block">{user?.email}</span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-500/20 hover:text-red-700 text-red-900 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Salir</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Buscar proyectos..."
                            className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="hidden sm:flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-indigo-600" : "hover:bg-neutral-800"}`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-indigo-600" : "hover:bg-neutral-800"}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors text-sm font-medium whitespace-nowrap shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] w-full sm:w-auto justify-center"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Nuevo Proyecto</span>
                        </button>
                    </div>
                </div>

                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-1 group-hover:text-indigo-400 transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-neutral-400 line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                        <Star className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteProject(project.id);
                                        }}
                                        className="p-2 hover:bg-red-500/10 text-red-500/70 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs px-2.5 py-1 bg-neutral-800 rounded-lg">
                                    {project.category}
                                </span>
                                <span className={`text-xs px-2.5 py-1 rounded-lg border ${getStatusColor(project.status)}`}>
                                    {getStatusText(project.status)}
                                </span>
                            </div>

                            <div className="mb-3">
                                <div className="flex justify-between text-xs text-neutral-400 mb-2">
                                    <span>Progreso</span>
                                    <span>{project.progress}%</span>
                                </div>
                                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 text-xs text-neutral-500">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{project.lastUpdated}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-6">
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white">Crear Nuevo Proyecto</h3>
                            <p className="mt-2 text-sm text-neutral-400">
                                Completa la información del proyecto
                            </p>
                        </div>

                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Nombre del Proyecto *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ej: Sistema de gestión"
                                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Descripción *
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe tu proyecto..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Categoría *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    >
                                        <option value="Web Development">Web Development</option>
                                        <option value="UI/UX">UI/UX</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="DevOps">DevOps</option>
                                        <option value="Data Science">Data Science</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Estado *
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    >
                                        <option value="activa">Activo</option>
                                        <option value="pausada">Pausado</option>
                                        <option value="completada">Completado</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="block text-sm font-medium text-neutral-300">
                                        Progreso: {formData.progress}%
                                    </label>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-4 py-3 border border-neutral-700 text-neutral-300 rounded-xl hover:bg-neutral-800 transition-all font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all font-medium shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                                >
                                    Crear Proyecto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showProfileModal && (
                <div className="fixed inset-0 w-full z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-neutral-800 flex justify-between items-center sticky top-0 bg-neutral-900 z-10">
                            <h3 className="text-xl font-bold text-white">Mi Perfil</h3>
                            <button
                                onClick={() => setShowProfileModal(false)}
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-8">


                            <div className="text-center sm:text-left space-y-1">
                                <h2 className="text-2xl font-bold text-white">{user?.email?.split('@')[0] || "Usuario"}</h2>
                                <div className="flex items-center justify-center sm:justify-start gap-2 text-neutral-400 text-sm">
                                    <Mail className="w-4 h-4" />
                                    <span>{user?.email}</span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start gap-2 text-neutral-400 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span>Miembro desde {new Date().getFullYear()}</span>
                                </div>
                                <div className="pt-2">
                                    <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-md text-xs font-medium border border-indigo-500/20">
                                        Plan Gratuito
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 m-6">
                            <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 text-center">
                                <div className="text-2xl font-bold text-white">{projects.length}</div>
                                <div className="text-xs text-neutral-400">Total Proyectos</div>
                            </div>
                            <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 text-center">
                                <div className="text-2xl font-bold text-green-400">
                                    {projects.filter(p => p.status === "activa").length}
                                </div>
                                <div className="text-xs text-neutral-400">Activos</div>
                            </div>
                            <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 text-center">
                                <div className="text-2xl font-bold text-blue-400">
                                    {projects.filter(p => p.status === "completada").length}
                                </div>
                                <div className="text-xs text-neutral-400">Completados</div>
                            </div>
                            <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 text-center">
                                <div className="text-2xl font-bold text-yellow-400">
                                    {projects.filter(p => p.status === "pausada").length}
                                </div>
                                <div className="text-xs text-neutral-400">Pausados</div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-white ml-5 mb-5 mt-5">Mis Proyectos Recientes</h4>
                            <div className="space-y-3 m-5">
                                {projects.slice(0, 3).map((project) => (
                                    <div key={project.id} className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${project.status === 'activa' ? 'bg-green-500' :
                                                project.status === 'completada' ? 'bg-blue-500' : 'bg-yellow-500'
                                                }`} />
                                            <div>
                                                <p className="font-medium text-sm text-white">{project.name}</p>
                                                <p className="text-xs text-neutral-500">{project.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <span className="text-xs text-neutral-400 block">Progreso</span>
                                                <span className="text-sm font-medium text-indigo-400">{project.progress}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {projects.length === 0 && (
                                    <div className="text-center py-8 text-neutral-500 text-sm">
                                        No tienes proyectos creados aún.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessToast && (
                <Toast
                    message={toastMessage}
                    type="success"
                    onClose={() => setShowSuccessToast(false)}
                />
            )}
        </div>
    );
}
