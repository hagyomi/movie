import { twMerge } from "tailwind-merge";

const Button = ({ className, children, showArrow = true, type = 'button', ...props }) => {
    const buttonStyle = `
        group inline-flex items-center justify-center gap-3
        min-h-12 rounded-full border border-black/5
        bg-[#d7d8dd] py-1.5 pl-7 pr-1.5
        text-base font-medium text-[#45464a]
        shadow-sm backdrop-blur-md
        transition-all duration-300
        hover:border-black/10 hover:bg-[#cfd0d5]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60
        disabled:pointer-events-none disabled:opacity-40
        dark:border-white/15 dark:bg-white/10 dark:text-white
        dark:hover:border-white/25 dark:hover:bg-white/15
        dark:focus-visible:outline-white/70
    `;

    return (
        <button type={type} className={twMerge(buttonStyle, className)} {...props}>
            {children && <span>{children}</span>}
            {children && showArrow && (
                <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-base text-black shadow-sm transition-transform duration-300 group-hover:rotate-45 dark:bg-white/20 dark:text-white"
                >
                    ↗
                </span>
            )}
        </button>
    );
};

export default Button;
