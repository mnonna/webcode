"use client";

type ToggleProps = {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    leftLabel?: string;
    rightLabel?: string;
    ariaLabel?: string;
    disabled?: boolean;
};

export default function Toggle({
    checked,
    onCheckedChange,
    leftLabel,
    rightLabel,
    ariaLabel = 'Przełącz opcję',
    disabled = false,
}: ToggleProps) {
    return (
        <div className="inline-flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
            {leftLabel && <span>{leftLabel}</span>}
            <button
                type="button"
                role="switch"
                aria-label={ariaLabel}
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onCheckedChange(!checked)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-neutral-800 ${
                    checked ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-600'
                }`}
            >
                <span
                    aria-hidden="true"
                    className={`block size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
            {rightLabel && <span>{rightLabel}</span>}
        </div>
    );
}
