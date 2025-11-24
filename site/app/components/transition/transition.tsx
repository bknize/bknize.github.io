import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useAspectResize from '../../hooks/useAspectResize';
import './transition.css'

export default function Transition({ isAnimating, sprite, isVisible }: { isAnimating: boolean, sprite: string, isVisible: boolean }) {
    const container = useRef(null);
    useAspectResize(container);

    return <div className={`transition-container ${isVisible ? '__visible' : ''}`}>
            <div ref={container} style={{backgroundImage: `url("${sprite}")`}}
                className={`transition-layer ${isAnimating ? '__animate': '' }`}
                ></div>
        </div>
}