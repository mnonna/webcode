'use client';

import { ChevronDown, ChevronRight, ChevronUp, Lightbulb, List, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface ArticleTableOfContentsItem {
    id: string;
    title: string;
}

interface ArticleTableOfContentsProps {
    items: ArticleTableOfContentsItem[];
    hint: string;
}

export default function ArticleTableOfContents({ items, hint }: ArticleTableOfContentsProps) {
    const [activeId, setActiveId] = useState(items[0]?.id ?? '');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const programmaticScrollTargetRef = useRef<string | null>(null);

    useEffect(() => {
        if (!items.length) {
            return;
        }

        let frameId = 0;

        const updateActiveSection = () => {
            frameId = 0;
            const activationOffset = 160;
            const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            const programmaticTargetId = programmaticScrollTargetRef.current;

            if (programmaticTargetId) {
                const targetSection = document.getElementById(programmaticTargetId);
                const targetTop = targetSection?.getBoundingClientRect().top;
                const hasReachedTarget =
                    (isAtPageBottom && programmaticTargetId === items[items.length - 1].id) ||
                    (targetTop !== undefined && targetTop >= 0 && targetTop <= activationOffset);

                if (!hasReachedTarget) {
                    setActiveId(programmaticTargetId);
                    return;
                }

                programmaticScrollTargetRef.current = null;
            }

            let nextActiveId = items[0].id;

            for (const item of items) {
                const section = document.getElementById(item.id);

                if (section && section.getBoundingClientRect().top <= activationOffset) {
                    nextActiveId = item.id;
                }
            }

            if (isAtPageBottom) {
                nextActiveId = items[items.length - 1].id;
            }

            setActiveId(nextActiveId);
        };

        const handleScroll = () => {
            if (!frameId) {
                frameId = window.requestAnimationFrame(updateActiveSection);
            }
        };

        const cancelProgrammaticTracking = () => {
            programmaticScrollTargetRef.current = null;
        };

        updateActiveSection();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        window.addEventListener('wheel', cancelProgrammaticTracking, { passive: true });
        window.addEventListener('touchstart', cancelProgrammaticTracking, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            window.removeEventListener('wheel', cancelProgrammaticTracking);
            window.removeEventListener('touchstart', cancelProgrammaticTracking);

            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
        };
    }, [items]);

    useEffect(() => {
        if (!isMobileOpen) {
            return;
        }

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMobileOpen(false);
            }
        };

        window.addEventListener('keydown', closeOnEscape);

        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [isMobileOpen]);

    const activeIndex = Math.max(items.findIndex(({ id }) => id === activeId), 0);
    const progress = items.length ? ((activeIndex + 1) / items.length) * 100 : 0;

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);

        if (!section) {
            return;
        }

        programmaticScrollTargetRef.current = id;
        setActiveId(id);
        setIsMobileOpen(false);
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${id}`);
    };

    if (!items.length) {
        return null;
    }

    const activeItem = items[activeIndex];
    const previousItem = items[activeIndex - 1];
    const nextItem = items[activeIndex + 1];
    const formatIndex = (index: number) => String(index + 1).padStart(2, '0');

    return (
        <>
            <aside
                className="fixed z-40 xl:hidden"
                style={{
                    right: 'var(--shell-inline-gutter)',
                    bottom: 'calc(1rem + env(safe-area-inset-bottom))',
                    left: 'var(--shell-inline-gutter)',
                }}
            >
                <nav aria-label="Spis treści artykułu">
                    <div
                        id="mobile-article-toc"
                        aria-hidden={!isMobileOpen}
                        className={`absolute inset-x-0 bottom-[calc(100%+0.5rem)] max-h-[min(60vh,30rem)] origin-bottom overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.18)] transition-all duration-300 ease-out ${
                            isMobileOpen
                                ? 'visible translate-y-0 scale-y-100 opacity-100'
                                : 'invisible pointer-events-none translate-y-3 scale-y-95 opacity-0'
                        }`}
                    >
                        <ol>
                            {items.map((item, index) => {
                                const isActive = item.id === activeId;

                                return (
                                    <li key={item.id}>
                                        <a
                                            href={`#${item.id}`}
                                            aria-current={isActive ? 'location' : undefined}
                                            tabIndex={isMobileOpen ? undefined : -1}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                scrollToSection(item.id);
                                            }}
                                            className={`grid min-h-14 grid-cols-[2.5rem_minmax(0,1fr)_1.25rem] items-center gap-2 border-l-4 p-3 text-sm leading-5 transition-colors ${
                                                isActive
                                                    ? 'border-blue bg-blue-50 font-semibold text-slate-950'
                                                    : 'border-transparent text-slate-700 hover:bg-slate-50 hover:text-blue'
                                            }`}
                                        >
                                            <span className="font-semibold text-blue">{formatIndex(index)}</span>
                                            <span>{item.title}</span>
                                            <ChevronRight aria-hidden="true" className="size-5 text-slate-400" strokeWidth={1.8} />
                                        </a>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    <div className="grid min-h-16 w-full grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-[0_12px_36px_rgba(15,23,42,0.18)]">
                        <button
                            type="button"
                            aria-expanded={isMobileOpen}
                            aria-controls="mobile-article-toc"
                            aria-label={isMobileOpen ? 'Zamknij spis treści' : 'Otwórz spis treści'}
                            onClick={() => setIsMobileOpen((isOpen) => !isOpen)}
                            className="grid size-11 place-items-center rounded-full bg-blue-50 text-blue transition-colors hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                        >
                            {isMobileOpen ? (
                                <X aria-hidden="true" className="size-5" strokeWidth={2} />
                            ) : (
                                <List aria-hidden="true" className="size-5" strokeWidth={2} />
                            )}
                        </button>

                        <div className="flex min-w-0 items-center gap-3">
                            <span className="whitespace-nowrap font-semibold text-blue">
                                {formatIndex(activeIndex)} <span className="text-slate-400">/ {String(items.length).padStart(2, '0')}</span>
                            </span>
                            <span className="truncate text-sm font-semibold text-slate-950">{activeItem.title}</span>
                        </div>

                        <div className="flex flex-col items-center" aria-label="Nawigacja między sekcjami">
                            <button
                                type="button"
                                disabled={!previousItem}
                                aria-label="Przejdź do poprzedniej sekcji"
                                onClick={() => previousItem && scrollToSection(previousItem.id)}
                                className="grid h-7 w-11 place-items-center rounded-md text-blue transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-300"
                            >
                                <ChevronUp aria-hidden="true" className="size-4.5" strokeWidth={2.25} />
                            </button>
                            <button
                                type="button"
                                disabled={!nextItem}
                                aria-label="Przejdź do następnej sekcji"
                                onClick={() => nextItem && scrollToSection(nextItem.id)}
                                className="grid h-7 w-11 place-items-center rounded-md text-blue transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-300"
                            >
                                <ChevronDown aria-hidden="true" className="size-4.5" strokeWidth={2.25} />
                            </button>
                        </div>
                    </div>
                </nav>
            </aside>

            <aside className="sticky top-28 hidden max-h-[calc(100dvh-8rem)] self-start flex-col xl:flex">
                <p className="mb-5 shrink-0 text-xs font-bold uppercase tracking-[0.08em] text-slate-950">
                    Spis treści
                </p>

                <nav aria-label="Spis treści artykułu" className="relative grid min-h-0 overflow-hidden pl-5">
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-slate-200" />
                    <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 w-0.5 bg-blue transition-[height] duration-500 ease-out"
                        style={{ height: `${progress}%` }}
                    />

                    <ol className="min-h-0 space-y-4 overflow-y-auto overscroll-contain pr-3 [scrollbar-gutter:stable]">
                        {items.map((item, index) => {
                            const isActive = item.id === activeId;

                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        aria-current={isActive ? 'location' : undefined}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            scrollToSection(item.id);
                                        }}
                                        className={`block text-sm leading-5 transition-all duration-300 ${
                                            isActive
                                                ? 'font-semibold text-blue'
                                                : 'text-slate-600 hover:text-blue hover:font-semibold'
                                        }`}
                                    >
                                        <span className="mr-1.5">{index + 1}.</span>
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ol>
                </nav>

                {hint && (
                    <div className="mt-8 shrink-0 rounded-xl border border-blue bg-gradient-to-br from-blue-50/80 to-white p-5 shadow-sm">
                        <span className="mb-4 grid size-9 place-items-center rounded-full bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                            <Lightbulb aria-hidden="true" className="size-5" strokeWidth={1.8} />
                        </span>
                        <p className="text-sm font-medium leading-6 text-slate-800">{hint}</p>
                        <span aria-hidden="true" className="mt-4 block h-0.5 w-8 rounded-full bg-blue" />
                    </div>
                )}
            </aside>
        </>
    );
}
