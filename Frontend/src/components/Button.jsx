import React from 'react'

const Button = ({ children, variant = "primary", className = "", ...props }) => {

    const baseStyle =
        `inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    px-5
    py-2.5

    text-sm
    font-semibold

    transition-all
    duration-200

    focus:outline-none
    focus:ring-2
    focus:ring-brand-500/40

    disabled:pointer-events-none
    disabled:opacity-50`;

    const variants = {
        primary:
            `
        bg-brand-500
        text-white

        hover:bg-brand-600
        hover:-translate-y-0.5

        active:translate-y-0
        `,
        
        secondary: `
        border
        border-border

        bg-surface

        text-heading

        hover:bg-surface-hover
        hover:border-brand-500/30
        `,

        ghost: `
        text-body

        hover:bg-surface
        hover:text-heading
        `,
    }


    return (
        <button className={`${baseStyle} ${variants[variant]} ${children}`}{...props}> {children} </button>
    );
};

export default Button;