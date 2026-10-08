import { twMerge } from "tailwind-merge";

const Modal = ({ children, open, setOpen, className }) => {
    if (!open) return null;

    return (
        <aside
            role="dialog"
            aria-modal="true"
            className={twMerge(
                'fixed backdrop-blur-3xl px-[5vw] py-[5vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 rounded',
                className
            )}
        >
            <div className="relative size-full">{children}</div>
            <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-6 right-10 cursor-pointer text-base"
            >
                close
            </button>
        </aside>
    );
};

export default Modal;
