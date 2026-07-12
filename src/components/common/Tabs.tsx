"use client";

import type { LucideIcon } from 'lucide-react';

export type TabItem<T extends string> = {
    value: T;
    label: string;
    icon?: LucideIcon;
};

type TabsProps<T extends string> = {
    items: readonly TabItem<T>[];
    activeValue: T;
    onValueChange: (value: T) => void;
    ariaLabel?: string;
    panelId?: string;
};

export default function Tabs<T extends string>({
    items,
    activeValue,
    onValueChange,
    ariaLabel = 'Wybierz kategorię',
    panelId,
}: TabsProps<T>) {
    return (
        <div
            role="tablist"
            aria-label={ariaLabel}
            className="flex gap-3 overflow-x-auto pb-2"
        >
            {items.map(({ value, label, icon: Icon }) => {
                const isActive = value === activeValue;

                return (
                    <button
                        key={value}
                        type="button"
                        role="tab"
                        id={`tab-${value}`}
                        aria-controls={panelId}
                        aria-selected={isActive}
                        onClick={() => onValueChange(value)}
                        className={`flex min-w-max cursor-pointer items-center justify-center gap-3 rounded-full border border-transparent px-4 py-2 wc-body-sm transition-colors ${
                            isActive
                                ? 'bg-primary !text-white dark:border-white dark:bg-white dark:text-neutral-900'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                    >
                        {Icon && <Icon size={20} aria-hidden="true" />}
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}
