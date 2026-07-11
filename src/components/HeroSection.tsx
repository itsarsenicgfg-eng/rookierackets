import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

/* ── Slideshow images (swap for real photos later) ── */
const SLIDES = [
  '/images/IMG_7427.jpeg',
  '/images/Screenshot%202026-06-18%20180228.png',
  '/images/IMG_7505.jpeg',
  '/images/Screenshot%202026-06-18%20180241.png',
  '/images/Screenshot%202026-06-18%20180320.png',
  '/images/Screenshot%202026-06-18%20180200.png',
  '/images/TMSA-1.JPG',
];

/* ── Spring / easing presets ───────────────────────── */
const soft   = { type: 'spring' as const, damping: 28, stiffness: 180 };
const snappy = { type: 'spring' as const, damping: 22, stiffness: 260 };

/* ── Variant factories ──────────────────────────────── */
const slideUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { ...soft, delay } },
});

const lineReveal = (delay = 0): Variants => ({
  hidden: { y: '108%' },
  show:   { y: 0, transition: { ...snappy, delay } },
});

const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, delay } },
});

/* ── Ambient orb ────────────────────────────────────── */
function Orb({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position:      'absolute',
        borderRadius:  '50%',
        pointerEvents: 'none',
        willChange:    'transform',
        ...style,
      }}
      animate={{ scale: [1, 1.07, 1], opacity: [0.65, 1, 0.65] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Session card (right panel) ─────────────────────── */
function SessionCard({ reduced }: { reduced: boolean | null }) {
  const details = [
    { icon: '📍', text: 'NC' },
    { icon: '👦', text: 'All skill levels welcome' },
    { icon: '🏆', text: 'Expert coaching included' },
  ];

  return (
    <motion.div
      className="hero-card-wrap"
      variants={slideUp(0.5)}
      initial="hidden"
      animate="show"
    >
      <div style={{
        background:     'rgba(13,13,26,0.82)',
        border:         '1px solid rgba(128,117,255,0.28)',
        borderRadius:   '1.25rem',
        padding:        '1.75rem',
        backdropFilter: 'blur(24px)',
        boxShadow:      '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(128,117,255,0.1)',
        position:       'relative',
        zIndex:         1,
      }}>

        {/* Card header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.09em', color: 'rgba(128,117,255,0.9)' }}>
            Upcoming Session
          </span>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700,
            background: 'rgba(52,211,153,0.18)', color: '#34d399',
            border: '1px solid rgba(52,211,153,0.32)', borderRadius: '999px', padding: '0.2rem 0.65rem',
          }}>
            Always Free
          </span>
        </div>

        {/* Shuttlecock + pulse rings */}
        <div style={{ position: 'relative', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem 0 1.5rem' }}>
          {[100, 70, 42].map((size, i) => (
            <motion.div
              key={i}
              style={{
                position:     'absolute',
                width:        size, height: size,
                borderRadius: '50%',
                border:       `1px solid rgba(128,117,255,${0.14 + i * 0.1})`,
              }}
              animate={reduced ? {} : { scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * -0.9 }}
            />
          ))}
          <motion.span
            style={{ fontSize: '3.5rem', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 22px rgba(128,117,255,0.6))' }}
            animate={reduced ? {} : { y: [-7, 7, -7], rotate: [-4, 4, -4] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🏸
          </motion.span>
        </div>

        {/* Detail rows */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.7rem', marginBottom: '1.25rem' }}>
          {details.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn(0.85 + i * 0.12)}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'rgba(240,236,255,0.75)' }}
            >
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
              {item.text}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="/contact"
          variants={fadeIn(1.15)}
          initial="hidden"
          animate="show"
          whileHover={reduced ? {} : { scale: 1.03 }}
          whileTap={reduced ? {} : { scale: 0.97 }}
          transition={snappy}
          style={{
            display:        'block',
            textAlign:      'center' as const,
            padding:        '0.7rem 1rem',
            background:     'linear-gradient(135deg, #7568f0, #f07830)',
            color:          '#fff',
            borderRadius:   '0.5rem',
            fontWeight:     700,
            fontSize:       '0.875rem',
            textDecoration: 'none',
            boxShadow:      '0 4px 20px rgba(128,117,255,0.45)',
            fontFamily:     "'Syne', system-ui, sans-serif",
            cursor:         'pointer',
          }}
        >
          View Events →
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────── */
export default function HeroSection() {
  const reduced = useReducedMotion();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        .hero-inner-grid {
          max-width: 1120px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 4rem;
          position: relative;
          z-index: 1;
        }
        .hero-card-wrap {
          position: relative;
          width: 290px;
          flex-shrink: 0;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(1px) brightness(0.52) saturate(0.88);
          transform: scale(1.08);
          transition: opacity 1.8s ease-in-out;
          will-change: opacity;
        }
        .hero-slide-dots {
          position: absolute;
          bottom: 3.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 2;
        }
        .hero-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          border: 1px solid rgba(255,255,255,0.2);
          transition: background 0.4s, transform 0.4s;
          cursor: pointer;
        }
        .hero-dot.active {
          background: rgba(255,255,255,0.85);
          transform: scale(1.4);
        }
        @media (max-width: 840px) {
          .hero-inner-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-card-wrap {
            width: 100%;
            max-width: 340px;
            margin: 0 auto;
          }
        }
      `}</style>

      <section style={{
        position:       'relative',
        minHeight:      '100svh',
        display:        'flex',
        flexDirection:  'column' as const,
        justifyContent: 'center',
        overflow:       'hidden',
        padding:        '6rem 1.5rem 5rem',
        background:     '#08080f',
      }}>

        {/* ── Slideshow layers ── */}
        {SLIDES.map((src, i) => (
          <div
            key={i}
            aria-hidden
            className="hero-slide"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === slide ? 1 : 0,
            }}
          />
        ))}

        {/* Frosted color gradient overlay */}
        <div aria-hidden style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(135deg, rgba(8,8,22,0.75) 0%, rgba(40,10,60,0.45) 50%, rgba(8,8,22,0.72) 100%)',
          zIndex:     1,
          pointerEvents: 'none',
        }} />

        {/* Grid dot overlay */}
        <div aria-hidden style={{
          position:        'absolute',
          inset:           0,
          zIndex:          1,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize:  '36px 36px',
          maskImage:       'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          pointerEvents:   'none',
        }} />

        {/* Ambient orbs */}
        <Orb style={{
          width: 800, height: 800, zIndex: 1,
          background: 'radial-gradient(ellipse, rgba(117,104,240,0.28) 0%, rgba(117,104,240,0.06) 45%, transparent 70%)',
          top: '-25%', right: '-12%',
        }} />
        <Orb style={{
          width: 520, height: 520, zIndex: 1,
          background: 'radial-gradient(ellipse, rgba(255,140,66,0.22) 0%, transparent 65%)',
          bottom: '-15%', left: '-5%',
        }} />

        {/* Content grid */}
        <div className="hero-inner-grid" style={{ zIndex: 2 }}>

          {/* ── Left: copy ── */}
          <div>
            {/* Brand name — dominant */}
            <h1 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 900, fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: '0.6rem' }}>
              Rookie Rackets
            </h1>
            {/* Tagline — secondary */}
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', letterSpacing: '0.01em', lineHeight: 1.3, marginBottom: '1.5rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>Where Birdies </span>
              <span style={{ color: '#f07830' }}>Take Flight</span>
            </p>

            {/* Subtext */}
            <motion.p
              variants={slideUp(0.7)}
              initial="hidden"
              animate="show"
              style={{ fontSize: '1.1rem', color: 'rgba(240,236,255,0.78)', maxWidth: '480px', lineHeight: 1.8, marginBottom: '2rem' }}
            >
              Free, all-inclusive badminton workshops — coached by players trained
              under the US National Head Coach. No experience or equipment needed.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={slideUp(0.84)}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' as const, marginBottom: '2rem' }}
            >
              <motion.a
                href="/contact"
                whileHover={reduced ? {} : { scale: 1.04, y: -2 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={snappy}
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '0.4rem',
                  padding:        '0.85rem 1.8rem',
                  borderRadius:   '0.375rem',
                  background:     'linear-gradient(135deg, #7568f0, #f07830)',
                  color:          '#fff',
                  fontWeight:     700,
                  fontSize:       '0.925rem',
                  textDecoration: 'none',
                  boxShadow:      '0 4px 24px rgba(128,117,255,0.5)',
                  fontFamily:     "'Syne', system-ui, sans-serif",
                  letterSpacing:  '-0.01em',
                  cursor:         'pointer',
                }}
              >
                Join Waitlist →
              </motion.a>
              <motion.a
                href="/history"
                whileHover={reduced ? {} : { scale: 1.04, y: -2 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={snappy}
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  padding:        '0.85rem 1.8rem',
                  borderRadius:   '0.375rem',
                  background:     'rgba(255,255,255,0.09)',
                  color:          '#f0ecff',
                  fontWeight:     700,
                  fontSize:       '0.925rem',
                  textDecoration: 'none',
                  border:         '1px solid rgba(255,255,255,0.18)',
                  fontFamily:     "'Syne', system-ui, sans-serif",
                  letterSpacing:  '-0.01em',
                  cursor:         'pointer',
                }}
              >
                View Past Events
              </motion.a>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              variants={slideUp(0.98)}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}
            >
              <div style={{ display: 'flex' }}>
                {['ST', 'PN', 'KC'].map((initials, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8075ff 0%, #ff8c42 100%)',
                      border: '2px solid rgba(8,8,15,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.6rem', fontWeight: 700, color: '#fff',
                      marginLeft: i > 0 ? -9 : 0, flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(240,236,255,0.6)', lineHeight: 1.45, margin: 0 }}>
                <span style={{ color: '#f0ecff', fontWeight: 700 }}>Families love it.</span>
                {' '}Join players from across NC.
              </p>
            </motion.div>
          </div>

          {/* ── Right: session card ── */}
          <SessionCard reduced={reduced} />
        </div>

        {/* Slideshow dots */}
        <div className="hero-slide-dots" style={{ zIndex: 2 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === slide ? ' active' : ''}`}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#what-we-do"
          aria-label="Scroll to content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{
            position:       'absolute',
            bottom:         '2rem',
            left:           '50%',
            transform:      'translateX(-50%)',
            display:        'flex',
            flexDirection:  'column' as const,
            alignItems:     'center',
            textDecoration: 'none',
            cursor:         'pointer',
            zIndex:         2,
          }}
        >
          <motion.span
            style={{
              display:      'block',
              width:        1.5,
              height:       44,
              background:   'linear-gradient(to bottom, #8075ff, transparent)',
              borderRadius: 2,
            }}
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          />
        </motion.a>

      </section>
    </>
  );
}
