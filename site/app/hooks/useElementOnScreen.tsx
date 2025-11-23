import { useEffect, useRef, useState, type RefObject } from "react"

const useElementOnScreen = (options: IntersectionObserverInit): [RefObject<null | HTMLElement>, boolean] => {
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    const callbackFunction: IntersectionObserverCallback = (entries) => {
        const [ entry ] = entries;
        if (entry.isIntersecting !== isVisible) {
            setIsVisible(entry.isIntersecting)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options)
        if (containerRef.current) {
            observer.observe(containerRef.current)
        }
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [containerRef, options])
    
    return [containerRef, isVisible]
}

export default useElementOnScreen