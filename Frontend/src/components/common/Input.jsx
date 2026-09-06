const Input = ({ label, error, className = "", ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-body">{label}</label>
            )}

            <input className={`w-full rounded-xl border border-border bg-surface px-4  py-3 text-sm text-heading outline-none placeholder:text-muted transition-all duration-200 focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/10
                ${error ? "border-danger" : ""}
                ${className}
                `}
                {...props}
            />

            {error && (
                <p className="mt-1.5 text-xs text-danger">
                    {error}
                </p>
            )}
        </div>
    )
}

export default Input;