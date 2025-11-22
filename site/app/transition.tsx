import { useRef } from 'react';
import ink from '../public/animation/ink.png';
import useTransitionResize from './hooks/useTransitionResize';
import './transition.css'


export default function Transition() {
    const container = useRef(null);
    useTransitionResize(container);

    return <div className="transition-container">

        <div ref={container} style={{backgroundImage: `url("${ink}")`}}
            className='transition-layer'
            ></div>
    </div>
}