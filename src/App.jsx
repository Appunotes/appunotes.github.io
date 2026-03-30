import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, X, ArrowUpRight, UserRound } from 'lucide-react';

const portfolioData = {
  initials: 'RC',
  email: 'aparnajob25@gmail.com',
  firstName: 'Aparna',
  lastName: 'Madhavan',
  intro: "Hello! I'm",
  roleTop: 'A Cyber Security',
  roleBottom: 'Engineer',
  about: {
    title: 'About Me',
    subtitle: 'Security professional with a strong focus on VAPT and modern application security.',
    description:
      'I work across web, mobile, API, and source code security assessments. I enjoy building polished technical experiences, documenting findings clearly, and creating solutions that feel both useful and visually strong.',
    highlights: ['Web & API Pentesting', 'Mobile Security', 'Vulnerability Reporting', 'Source Code Review'],
  },
  contact: {
    title: 'Contact',
    description: 'Open to security roles, collaborations, and portfolio conversations.',
    email: 'aparnajob25@gmail.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    instagram: 'https://instagram.com',
  },
};

function GlassModal({ open, onClose, title, children, icon: Icon }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-cyan-400/20 bg-slate-950/80 p-6 shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-xl md:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-2xl border border-white/10 p-2 text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SocialBar() {
  const links = [
    { icon: Github, href: portfolioData.contact.github, label: 'GitHub' },
    { icon: Linkedin, href: portfolioData.contact.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: portfolioData.contact.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${portfolioData.contact.email}`, label: 'Email' },
  ];

  return (
    <div className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-5 md:flex">
      {links.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={label}
          className="text-slate-300 transition hover:scale-110 hover:text-cyan-300"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

export default function AnimatedPortfolioWebsite() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [openModal, setOpenModal] = useState(null);

  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [isHoveringHead, setIsHoveringHead] = useState(false);
  const [isClickedHead, setIsClickedHead] = useState(false);

  const glow = useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.18), transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleHeadMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 22;
    const rotateX = (0.5 - py) * 18;

    setHeadTilt({
      x: rotateX,
      y: rotateY,
      glowX: px * 100,
      glowY: py * 100,
    });
  };

  const resetHeadMove = () => {
    setHeadTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
    setIsHoveringHead(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#020817] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_22%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.10),transparent_18%),linear-gradient(to_bottom,rgba(2,8,23,0.9),rgba(2,8,23,1))]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:80px_80px]" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />

      <SocialBar />

      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm uppercase tracking-[0.22em] text-slate-200">
          <div className="font-semibold">{portfolioData.initials}</div>
          <div className="hidden md:block text-[11px] text-slate-300">{portfolioData.email}</div>
          <nav className="flex items-center gap-3 text-[11px] md:gap-6">
            <button onClick={() => setOpenModal('about')} className="transition hover:text-cyan-300">
              About
            </button>
            <button onClick={() => setOpenModal('contact')} className="transition hover:text-cyan-300">
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center px-6 md:grid-cols-[1fr_1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 text-left md:order-1"
          >
            <p className="text-2xl text-cyan-300 md:text-3xl">{portfolioData.intro}</p>
            <h1 className="mt-2 text-5xl font-semibold leading-[0.95] text-white md:text-7xl">
              {portfolioData.firstName}
              <br />
              {portfolioData.lastName}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="order-1 flex items-center justify-center md:order-2"
          >
            <div
              onMouseMove={handleHeadMove}
              onMouseEnter={() => setIsHoveringHead(true)}
              onMouseLeave={resetHeadMove}
              onClick={() => setIsClickedHead((prev) => !prev)}
              className="flex cursor-pointer items-center justify-center"
              style={{ perspective: '1600px' }}
            >
              <motion.div
                animate={{
                  y: isClickedHead ? [0, -14, -6, -12, 0] : [0, -6, 0],
                  rotateZ: isClickedHead ? [0, 1.5, -1.5, 0.8, 0] : isHoveringHead ? 0.6 : 0,
                  scale: isClickedHead ? [1, 1.05, 1.02, 1.06, 1] : isHoveringHead ? 1.03 : 1,
                  x: [0, 2, 0, -2, 0],
                }}
                transition={{
                  y: { duration: isClickedHead ? 1 : 5, repeat: isClickedHead ? 0 : Infinity, ease: 'easeInOut' },
                  rotateZ: { duration: isClickedHead ? 0.9 : 0.25 },
                  scale: { duration: isClickedHead ? 1 : 0.25 },
                  x: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative h-[340px] w-[270px] md:h-[430px] md:w-[340px]"
                style={{
                  transform: `rotateX(${headTilt.x}deg) rotateY(${headTilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.12s ease-out',
                }}
              >
                <motion.div
                  className="absolute -inset-8 rounded-[2.5rem] bg-cyan-400/20 blur-3xl"
                  animate={{ opacity: [0.25, 0.7, 0.25], scale: [0.96, 1.04, 0.96] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="absolute inset-0 rounded-[2.2rem] border border-cyan-400/20 bg-slate-900/40 backdrop-blur-xl shadow-[0_0_90px_rgba(34,211,238,0.14)]" />

                <div className="absolute inset-3 overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/70">
                  <motion.img
                    src="/face.png"
                    alt="3D head portrait"
                    className="h-full w-full object-cover"
                    animate={{
                      scale: isClickedHead ? [1, 1.04, 1.02, 1.05, 1] : isHoveringHead ? 1.03 : 1,
                    }}
                    transition={{
                      duration: isClickedHead ? 0.9 : 0.25,
                    }}
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${headTilt.glowX}% ${headTilt.glowY}%, rgba(255,255,255,0.20), transparent 22%)`,
                      mixBlendMode: 'screen',
                    }}
                  />

                  <motion.div
                    className="absolute -left-1/2 top-0 h-full w-1/2 pointer-events-none"
                    animate={{ x: ['-20%', '260%'] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.18), transparent)',
                      transform: 'skewX(-18deg)',
                      filter: 'blur(10px)',
                    }}
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,8,23,0.72),rgba(2,8,23,0.06)_38%,rgba(2,8,23,0.2))] pointer-events-none" />

                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="h-1.5 w-full bg-cyan-300/20 blur-sm" />
                  </motion.div>

                  <div
                    className="absolute left-4 top-4 rounded-full border border-cyan-400/25 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-cyan-300 backdrop-blur-md"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    Live Portrait
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-3 text-right"
          >
            <p className="text-2xl text-cyan-300 md:text-3xl">{portfolioData.roleTop}</p>
            <h2 className="mt-1 text-5xl font-semibold uppercase leading-[0.95] text-white md:text-6xl">
              {portfolioData.roleBottom}
            </h2>
          </motion.div>
        </section>
      </main>

      <GlassModal open={openModal === 'about'} onClose={() => setOpenModal(null)} title={portfolioData.about.title} icon={UserRound}>
        <p className="text-lg text-cyan-300">{portfolioData.about.subtitle}</p>
        <p className="mt-4 leading-7 text-slate-300">{portfolioData.about.description}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {portfolioData.about.highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </GlassModal>

      <GlassModal open={openModal === 'contact'} onClose={() => setOpenModal(null)} title={portfolioData.contact.title} icon={Mail}>
        <p className="leading-7 text-slate-300">{portfolioData.contact.description}</p>
        <div className="mt-6 grid gap-4">
          <a
            href={`mailto:${portfolioData.contact.email}`}
            className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-cyan-200 transition hover:bg-cyan-400/15"
          >
            {portfolioData.contact.email}
          </a>
          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200 transition hover:border-cyan-400/20 hover:bg-white/10"
          >
            LinkedIn <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200 transition hover:border-cyan-400/20 hover:bg-white/10"
          >
            GitHub <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={portfolioData.contact.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200 transition hover:border-cyan-400/20 hover:bg-white/10"
          >
            Instagram <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </GlassModal>
    </div>
  );
}