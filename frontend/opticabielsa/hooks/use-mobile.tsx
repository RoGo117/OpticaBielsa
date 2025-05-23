"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Check on mount
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    mql.addEventListener("change", onChange)

    // Clean up
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return !!isMobile
}
