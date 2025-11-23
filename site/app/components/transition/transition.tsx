import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useAspectResize from '../../hooks/useAspectResize';
import './transition.css'
import { transitionBus } from './transitionBus';

function TransitionContainer({ isAnimating, sprite }: { isAnimating: boolean, sprite: string }) {
    const container = useRef(null);
    useAspectResize(container);

    return <div className="transition-container">
            <div ref={container} style={{backgroundImage: `url("${sprite}")`}}
                className={`transition-layer ${isAnimating ? '__animate-in': '' }`}
                ></div>
        </div>
}

export default function Transition() {
    const bus = transitionBus;
    const [animation, setAnimation] = useState({ isAnimating: false, sprite: '' })

    const onAnimate = useCallback(({ sprite }: { isVisible: boolean; sprite: string }) => {
        setAnimation({
            isAnimating: true,
            sprite
        })
        setTimeout(() => setAnimation({
            isAnimating: false,
            sprite: ''
        }), 1000)
    }, [])

    useEffect(() => {
        bus.register(onAnimate)
    }, [])

    return <TransitionContainer {...animation} />
}