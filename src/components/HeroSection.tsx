import { motion, useReducedMotion, type Variants } from 'framer-motion';

/* ── Spring / easing presets ───────────────────────── */
const soft   = { type: 'spring' as const, damping: 28, stiffness: 180 };
const snappy = { type: 'spring' as const, damping: 22, stiffness: 260 };

/* ── Variant factories ──────────────────────────────── */
const slideUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { ...soft, delay } },
});

const slideDown = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: -20 },
  show:   { opacity: 1, y: 0,  transition: { ...soft, delay } },
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
    { icon: '📍', text: 'Cary, NC' },
    { icon: '👦', text: 'All skill levels welcome' },
    { icon: '🏆', text: 'US National Coach trained' },
  ];

  return (
    <motion.div
      className="hero-card-wrap"
      variants={slideUp(0.5)}
      initial="hidden"
      animate="show"
    >
      {/* ── Main card ── */}
      <div style={{
        background:      'rgba(13,13,26,0.88)',
        border:          '1px solid rgba(128,117,255,0.22)',
        borderRadius:    '1.25rem',
        padding:         '1.75rem',
        backdropFilter:  'blur(20px)',
        boxShadow:       '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(128,117,255,0.08)',
        position:        'relative',
        zIndex:          1,
      }}>

        {/* Card header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.09em', color: 'rgba(128,117,255,0.85)' }}>
            Upcoming Session
          </span>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700,
            background: 'rgba(52,211,153,0.15)', color: '#34d399',
            border: '1px solid rgba(52,211,153,0.28)', borderRadius: '999px', padding: '0.2rem 0.65rem',
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
            style={{ fontSize: '3.5rem', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 22px rgba(128,117,255,0.55))' }}
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
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'rgba(240,236,255,0.7)' }}
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
            background:     'var(--primary)',
            color:          '#fff',
            borderRadius:   '0.5rem',
            fontWeight:     700,
            fontSize:       '0.875rem',
            textDecoration: 'none',
            boxShadow:      '0 4px 20px rgba(128,117,255,0.4)',
            fontFamily:     "'Syne', system-ui, sans-serif",
            cursor:         'pointer',
          }}
        >
          Join Waitlist →
        </motion.a>
      </div>

      {/* ── Floating badge: coach credential ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={reduced ? {} : { opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          x:       { delay: 1.5, duration: 0.5, type: 'spring', damping: 20 },
          y:       { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 2.1 },
        }}
        style={{
          position:       'absolute', top: '-1.1rem', left: '-1.75rem',
          background:     'rgba(13,13,26,0.92)', backdropFilter: 'blur(12px)',
          border:         '1px solid rgba(255,140,66,0.28)',
          borderRadius:   '0.75rem', padding: '0.5rem 0.875rem',
          display:        'flex', alignItems: 'center', gap: '0.45rem',
          fontSize:       '0.75rem', color: '#ffbe96', fontWeight: 600,
          whiteSpace:     'nowrap' as const, boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
          zIndex:         2,
        }}
      >
        <span>🏅</span> US National Coach
      </motion.div>

      {/* ── Floating badge: always free ── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={reduced ? {} : { opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 0.5 },
          x:       { delay: 1.8, duration: 0.5, type: 'spring', damping: 18 },
          y:       { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 2.6 },
        }}
        style={{
          position:     'absolute', bottom: '1.5rem', right: '-1.5rem',
          background:   'rgba(13,13,26,0.92)', backdropFilter: 'blur(12px)',
          border:       '1px solid rgba(52,211,153,0.22)',
          borderRadius: '0.75rem', padding: '0.5rem 0.875rem',
          fontSize:     '0.75rem', color: '#6ee7b7', fontWeight: 600,
          whiteSpace:   'nowrap' as const, boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
          zIndex:       2,
        }}
      >
        ✓ No fees. Ever.
      </motion.div>
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────── */
export default function HeroSection() {
  const reduced = useReducedMotion();

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
        position:        'relative',
        minHeight:       '100svh',
        display:         'flex',
        flexDirection:   'column' as const,
        justifyContent:  'center',
        overflow:        'hidden',
        padding:         '6rem 1.5rem 5rem',
        background: `
          linear-gradient(135deg, rgba(8,8,15,0.94) 0%, rgba(8,8,15,0.62) 55%, rgba(8,8,15,0.90) 100%),
          url('/images/hero-bg.jpg') center 35% / cover no-repeat
        `,
      }}>

        {/* Grid overlay */}
        <div aria-hidden style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize:  '36px 36px',
          maskImage:       'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          pointerEvents:   'none',
        }} />

        {/* Ambient orbs */}
        <Orb style={{
          width: 800, height: 800,
          background: 'radial-gradient(ellipse, rgba(128,117,255,0.22) 0%, rgba(128,117,255,0.05) 45%, transparent 70%)',
          top: '-25%', right: '-12%',
        }} />
        <Orb style={{
          width: 520, height: 520,
          background: 'radial-gradient(ellipse, rgba(255,140,66,0.18) 0%, transparent 65%)',
          bottom: '-15%', left: '-5%',
        }} />

        {/* Content grid */}
        <div className="hero-inner-grid">

          {/* ── Left: copy ── */}
          <div>

            {/* Status pill */}
            <motion.div
              variants={slideDown(0.2)}
              initial="hidden"
              animate="show"
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '0.55rem',
                fontSize:      '0.75rem',
                fontWeight:    700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color:         '#e0deff',
                background:    'rgba(128,117,255,0.18)',
                border:        '1px solid rgba(128,117,255,0.38)',
                padding:       '0.4rem 1rem',
                borderRadius:  '999px',
                marginBottom:  '1.75rem',
              }}
            >
              <motion.span
                style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              Free &amp; Inclusive &bull; Cary, NC
            </motion.div>

            {/* Heading */}
            <h1 style={{ marginBottom: '1.5rem', fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.08, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  style={{ display: 'block', color: '#f0ecff' }}
                  variants={lineReveal(0.38)}
                  initial="hidden"
                  animate="show"
                >
                  Where Birdies
                </motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  style={{
                    display:              'block',
                    background:           'linear-gradient(130deg, #a89fff 0%, #ff8c42 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                  }}
                  variants={lineReveal(0.54)}
                  initial="hidden"
                  animate="show"
                >
                  Take Flight
                </motion.span>
              </span>
            </h1>

            {/* Subtext */}
            <motion.p
              variants={slideUp(0.7)}
              initial="hidden"
              animate="show"
              style={{ fontSize: '1.1rem', color: 'rgba(240,236,255,0.78)', maxWidth: '480px', lineHeight: 1.8, marginBottom: '2rem' }}
            >
              Complimentary badminton workshops for youth — coached by players trained
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
                  background:     'var(--primary)',
                  color:          '#fff',
                  fontWeight:     700,
                  fontSize:       '0.925rem',
                  textDecoration: 'none',
                  boxShadow:      '0 4px 20px rgba(128,117,255,0.4)',
                  fontFamily:     "'Syne', system-ui, sans-serif",
                  letterSpacing:  '-0.01em',
                  cursor:         'pointer',
                }}
              >
                Join Waitlist →
              </motion.a>
              <motion.a
                href="/events"
                whileHover={reduced ? {} : { scale: 1.04, y: -2 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={snappy}
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  padding:        '0.85rem 1.8rem',
                  borderRadius:   '0.375rem',
                  background:     'rgba(255,255,255,0.07)',
                  color:          '#f0ecff',
                  fontWeight:     700,
                  fontSize:       '0.925rem',
                  textDecoration: 'none',
                  border:         '1px solid rgba(255,255,255,0.14)',
                  fontFamily:     "'Syne', system-ui, sans-serif",
                  letterSpacing:  '-0.01em',
                  cursor:         'pointer',
                }}
              >
                View Events
              </motion.a>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              variants={slideUp(0.98)}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}
            >
              {/* Avatar stack */}
              <div style={{ display: 'flex' }}>
                {['ST', 'PN', 'KC'].map((initials, i) => (
                  <div
                    key={i}
                    style={{
                      width:          32,
                      height:         32,
                      borderRadius:   '50%',
                      background:     'linear-gradient(135deg, #8075ff 0%, #ff8c42 100%)',
                      border:         '2px solid rgba(8,8,15,0.9)',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      fontSize:       '0.6rem',
                      fontWeight:     700,
                      color:          '#fff',
                      marginLeft:     i > 0 ? -9 : 0,
                      flexShrink:     0,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(240,236,255,0.6)', lineHeight: 1.45, margin: 0 }}>
                <span style={{ color: '#f0ecff', fontWeight: 700 }}>Families love it.</span>
                {' '}Join youth from across Cary, NC.
              </p>
            </motion.div>

          </div>

          {/* ── Right: session card ── */}
          <SessionCard reduced={reduced} />

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
            zIndex:         1,
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
