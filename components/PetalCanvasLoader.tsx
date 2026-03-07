'use client';
import dynamic from 'next/dynamic';

const PetalCanvas = dynamic(() => import('./PetalCanvas'), { ssr: false });

export default function PetalCanvasLoader() {
  return <PetalCanvas />;
}
