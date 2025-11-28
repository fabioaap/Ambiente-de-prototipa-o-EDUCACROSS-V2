import type { ElementType } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, Home, LayoutDashboard, PenSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type NavigationCard = {
    title: string;
    description: string;
    href: string;
    icon: ElementType;
    badge?: string;
    accent: string;
};

const REPO_URL = "https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2";

const navigationCards: NavigationCard[] = [
    {
        title: "Dashboard",
        description: "Visão geral operacional",
        href: "/dashboard",
        icon: LayoutDashboard,
        badge: "Ao vivo",
        accent: "from-sky-500/30 via-sky-500/10 to-transparent"
    },
    {
        title: "Home",
        description: "Página inicial para designers",
        href: "/domains/home",
        icon: Home,
        accent: "from-emerald-500/20 via-emerald-500/5 to-transparent"
    },
    {
        title: "Studio",
        description: "Editor visual Puck",
        href: "/domains/studio",
        icon: PenSquare,
        accent: "from-orange-500/20 via-orange-500/5 to-transparent"
    },
    {
        title: "Storybook",
        description: "Experience Hub",
        href: "/domains/storybook",
        icon: BookOpenCheck,
        accent: "from-violet-500/25 via-violet-500/5 to-transparent"
    }
];

const infoHighlights = [
    { label: "Stack", value: "Next.js 15 · Shadcn UI" },
    { label: "Acesso", value: "Domínios, Studio e Experience Hub" },
    { label: "Status", value: "Sprint 3 · Dashboard consolidado" }
];

const resourceLinks = [
    {
        label: "Guia de execução",
        description: "Checklist completo da sprint",
        href: `${REPO_URL}/blob/main/SPRINT3_EXECUTION_DETAILED.md`,
        tag: "Docs"
    },
    {
        label: "Design Tokens",
        description: "Fonte de cores, spacing e tipografia",
        href: `${REPO_URL}/blob/main/apps/studio/src/app/design-tokens.css`,
        tag: "Sistema"
    },
    {
        label: "Spec dashboard",
        description: "Referência premium aplicada",
        href: `${REPO_URL}/blob/main/DASHBOARD_DESIGN_IMPLEMENTATION.md`,
        tag: "Design"
    }
];

export default function Page() {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_55%)] bg-background">
            <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-8 lg:px-12">
                <div className="rounded-3xl border border-border/40 bg-card/70 p-8 text-center shadow-xl backdrop-blur">
                    <Badge variant="outline" className="mb-4 bg-primary/10 text-primary">
                        App principal do ecossistema
                    </Badge>
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        EDUCROSS Admin
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
                        Centraliza links, métricas e roteiros das jornadas. Use esta home para navegar entre Studio,
                        Experience Hub e domínios documentados durante a sprint corrente.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/dashboard" aria-label="Abrir dashboard operacional">
                                Abrir dashboard
                                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
                            </Link>
                        </Button>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            {infoHighlights.map((item) => (
                                <span key={item.label} className="rounded-full border border-border/80 px-4 py-1.5">
                                    <span className="font-medium text-foreground">{item.label}:</span> {item.value}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <section className="grid gap-5 md:grid-cols-2">
                    {navigationCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Link key={card.title} href={card.href} className="group focus-visible:outline-none" aria-label={`Ir para ${card.title}`}>
                                <Card
                                    className={cn(
                                        "relative h-full overflow-hidden border-border/60 bg-card/90 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring",
                                        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl",
                                        card.title === "Dashboard" ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white" : ""
                                    )}
                                >
                                    <CardHeader className="space-y-4">
                                        <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium">
                                            <Icon className={cn("h-5 w-5", card.title === "Dashboard" ? "text-blue-200" : "text-primary")} aria-hidden />
                                            <span>{card.title}</span>
                                            {card.badge && (
                                                <Badge variant="secondary" className="ml-auto text-xs">
                                                    {card.badge}
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-2xl font-semibold tracking-tight">
                                            {card.title}
                                        </CardTitle>
                                        <CardDescription className={card.title === "Dashboard" ? "text-slate-200" : undefined}>
                                            {card.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                                        <span className="inline-flex items-center gap-2">
                                            Acessar
                                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                                        </span>
                                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
                                            {card.href}
                                        </span>
                                    </CardFooter>
                                    <div
                                        className={cn(
                                            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                                            "bg-gradient-to-br",
                                            card.accent
                                        )}
                                    />
                                </Card>
                            </Link>
                        );
                    })}
                </section>

                <section className="grid gap-5 lg:grid-cols-3">
                    <Card className="border-border/60 bg-card/80 shadow-xl lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Sobre esta app</CardTitle>
                            <CardDescription>Entrega consolidada das fases de migração e dashboard premium.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                                    App principal com Shadcn UI, tema dinâmico e componentes premium.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" aria-hidden />
                                    Links rápidos para Home, Studio e Experience Hub documentados em `domains/`.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" aria-hidden />
                                    Dashboard de KPIs disponível em `/dashboard` consumindo as APIs locais.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-500" aria-hidden />
                                    Layout alinhado ao guide de microinterações descrito em `DASHBOARD_DESIGN_IMPLEMENTATION.md`.
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="outline">Next 15</Badge>
                            <Badge variant="outline">Tailwind 3.4</Badge>
                            <Badge variant="outline">Lucide</Badge>
                        </CardFooter>
                    </Card>

                    <Card className="border-border/60 bg-card/80">
                        <CardHeader>
                            <CardTitle>Referências rápidas</CardTitle>
                            <CardDescription>Documentos essenciais desta sprint.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {resourceLinks.map((resource) => (
                                <Link
                                    key={resource.label}
                                    href={resource.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block rounded-lg border border-dashed border-border/60 p-4 transition hover:border-primary/40 hover:bg-primary/5"
                                >
                                    <p className="text-sm font-semibold text-foreground">{resource.label}</p>
                                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                                        {resource.tag}
                                        <ArrowUpRight className="h-3 w-3" aria-hidden />
                                    </span>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    );
}
