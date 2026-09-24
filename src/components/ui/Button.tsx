import React from 'react'
import { useInteractions } from '../../hooks/useInteractions'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  variant = 'outline', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const { playClick } = useInteractions()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick()
    if (props.onClick) props.onClick(e)
  }

  const baseStyles = "relative inline-flex items-center justify-center font-sans uppercase tracking-[0.25em] rounded-full transition-all duration-500 overflow-hidden group select-none"
  
  const variants = {
    primary: "bg-accent text-bg-primary font-bold hover:bg-[#e0b284]",
    secondary: "bg-bg-secondary text-gray-100 hover:bg-white/10",
    outline: "bg-transparent border border-white/20 text-gray-100 hover:border-accent hover:bg-accent/5",
    ghost: "bg-transparent text-accent hover:text-gray-100",
  }
  
  const sizes = {
    sm: "px-6 py-3 text-[10px]",
    md: "px-8 py-4 text-[10px]",
    lg: "px-10 py-5 text-xs",
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      data-interactive="true"
      {...props}
      onClick={handleClick}
    >
      <span className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">{children}</span>
    </button>
  )
}
