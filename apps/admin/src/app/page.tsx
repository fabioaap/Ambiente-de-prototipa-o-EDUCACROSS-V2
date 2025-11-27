export default function Page() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">EDUCACROSS Admin</h1>
                    <p className="text-lg text-slate-300">Página principal do projeto</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card Home */}
                    <a
                        href="/domains/home"
                        className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer"
                    >
                        <div className="text-3xl mb-3">🏠</div>
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                            Home
                        </h2>
                        <p className="text-slate-600 text-sm mt-2">Página inicial para designers</p>
                    </a>

                    {/* Card Studio */}
                    <a
                        href="/domains/studio"
                        className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer"
                    >
                        <div className="text-3xl mb-3">✏️</div>
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                            Studio
                        </h2>
                        <p className="text-slate-600 text-sm mt-2">Editor visual Puck</p>
                    </a>

                    {/* Card Storybook */}
                    <a
                        href="/domains/storybook"
                        className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer"
                    >
                        <div className="text-3xl mb-3">📚</div>
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                            Storybook
                        </h2>
                        <p className="text-slate-600 text-sm mt-2">Experience Hub</p>
                    </a>

                    {/* Card Dashboard (esta app) */}
                    <div className="relative bg-blue-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="text-3xl mb-3">📊</div>
                        <h2 className="text-xl font-bold">Dashboard</h2>
                        <p className="text-blue-100 text-sm mt-2">Você está aqui</p>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Sobre esta App</h3>
                    <ul className="space-y-2 text-slate-700 text-sm">
                        <li>✅ App principal com Shadcn UI</li>
                        <li>✅ Acesso completo ao projeto</li>
                        <li>✅ Dashboard com métricas</li>
                        <li>✅ Links para todas as seções</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
