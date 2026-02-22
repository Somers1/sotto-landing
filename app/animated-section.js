'use client'

import { useAnimateOnScroll } from './use-animate-on-scroll'

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
}) {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </Component>
  )
}
