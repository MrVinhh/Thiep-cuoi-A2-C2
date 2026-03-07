'use client';
import dynamic from 'next/dynamic';
const ConfettiEffect = dynamic(() => import('./ConfettiEffect'), { ssr: false });
export default function ConfettiLoader() { return <ConfettiEffect />; }
