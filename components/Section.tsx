export const Section: React.FC<
    React.PropsWithChildren<{ id?: string; className?: string }>
> = ({ id, className, children }) => (
    <section
        id={id}
        className={`relative w-full max-w-6xl mx-auto px-4 md:px-8 ${
            className || ""
        }`}
    >
        {children}
    </section>
);
