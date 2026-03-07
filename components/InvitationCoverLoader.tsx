'use client';
import dynamic from 'next/dynamic';
const InvitationCover = dynamic(() => import('./InvitationCover'), { ssr: false });
export default function InvitationCoverLoader() { return <InvitationCover />; }
