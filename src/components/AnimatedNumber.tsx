"use client"

import { useState, useEffect, useRef } from "react"

type AnimatedNumberProps = {
  value: number
  duration?: number
  formatFn?: (n: number) => string
  trigger?: unknown
}

export default function AnimatedNumber({
  value,
  duration = 900,
  formatFn = (n) => Math.round(n).toString(),
  trigger,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const startTime = performance.now()
    const startValue = displayValue
    const endValue = value
    const range = Math.abs(endValue - startValue) || Math.max(endValue, 1)

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (progress < 0.7) {
        // Fase "acak" — angka berputar random di sekitar rentang nilai
        const randomVal = Math.random() * range * 1.5
        setDisplayValue(randomVal)
        frameRef.current = requestAnimationFrame(animate)
      } else if (progress < 1) {
        // Fase "mendarat" — easing menuju nilai final
        const settleProgress = (progress - 0.7) / 0.3
        const eased = 1 - Math.pow(1 - settleProgress, 3)
        const current = startValue + (endValue - startValue) * eased
        setDisplayValue(current)
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, trigger])

  return <span>{formatFn(displayValue)}</span>
}