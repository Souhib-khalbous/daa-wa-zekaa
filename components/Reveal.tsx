'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, viewport } from '@/lib/motion';
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) { const reduced = useReducedMotion(); return <motion.div className={className} variants={fadeUp} initial={reduced ? false : 'hidden'} whileInView="show" viewport={viewport}>{children}</motion.div>; }
