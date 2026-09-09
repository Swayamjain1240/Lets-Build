const Input = ({
  id,
  label,
  error,
  className = "",
  ...props
}) => {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-body"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? errorId : undefined
        }
        className={`
          w-full rounded-xl border bg-surface
          px-4 py-3 text-sm text-heading outline-none
          placeholder:text-muted
          transition-colors duration-200
          focus:ring-2 focus:ring-brand-500/10
          ${
            error
              ? "border-danger focus:border-danger"
              : "border-border focus:border-brand-500/60"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <p
          id={errorId}
          className="mt-1.5 text-xs text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;