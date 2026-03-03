import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SwarmButterfly = {
  id: number;
  x: number;
  y: number;
  scatterX: number;
  scatterY: number;
  targetX: number;
  targetY: number;
  scale: number;
  rotate: number;
};

const buildTextTargets = (
  text: string,
  sectionWidth: number,
  sectionHeight: number
): Array<{ x: number; y: number }> => {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(sectionWidth));
  canvas.height = Math.max(1, Math.floor(sectionHeight));
  const ctx = canvas.getContext('2d');

  if (!ctx) return [];

  const compactLength = [...text.replace(/\s/g, '')].length;
  const isShortWord = compactLength <= 6;
  const fontSize = isShortWord
    ? Math.max(72, Math.min(170, Math.floor(sectionWidth * 0.2)))
    : Math.max(42, Math.min(84, Math.floor(sectionWidth * 0.09)));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${fontSize}px "Open Sans", sans-serif`;
  ctx.fillText(text, canvas.width * 0.5, canvas.height * 0.45);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const points: Array<{ x: number; y: number }> = [];
  const step = isShortWord ? 6 : 8;

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const alpha = imageData[(y * canvas.width + x) * 4 + 3];
      if (alpha > 120) {
        points.push({
          x: x + gsap.utils.random(-2, 2),
          y: y + gsap.utils.random(-2, 2),
        });
      }
    }
  }

  return points;
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const butterflyButtonRef = useRef<HTMLButtonElement>(null);
  const butterflyRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const swarmTimeoutRef = useRef<number | null>(null);
  const [swarmButterflies, setSwarmButterflies] = useState<SwarmButterfly[]>([]);
  const [showSwarmOverlay, setShowSwarmOverlay] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Butterfly entrance
      tl.fromTo(
        butterflyRef.current,
        { opacity: 0, scale: 0.5, y: -30 },
        { opacity: 1, scale: 1, y: 0, duration: 1 },
        0
      );

      // Image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        0.2
      );

      // Content entrance
      tl.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1 },
        0.3
      );

      // Values entrance
      tl.fromTo(
        valuesRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.6
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.5,
            onLeaveBack: () => {
              gsap.set([imageRef.current, contentRef.current, butterflyRef.current, valuesRef.current], {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                rotate: 0,
                filter: 'blur(0px)',
              });
            },
          },
        });

        // EXIT (70% - 100%) - 3D peel transition
        scrollTl.fromTo(
          butterflyRef.current,
          { opacity: 1, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' },
          { opacity: 0, y: -85, rotate: 28, scale: 0.7, filter: 'blur(5px)', ease: 'power3.inOut' },
          0.66
        );

        scrollTl.fromTo(
          imageRef.current,
          { opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, rotateX: 0, filter: 'blur(0px)' },
          {
            opacity: 0,
            x: '-26vw',
            y: '-5vh',
            scale: 0.76,
            rotateY: -34,
            rotateX: 8,
            filter: 'blur(7px)',
            ease: 'expo.inOut',
          },
          0.68
        );

        scrollTl.fromTo(
          contentRef.current,
          { opacity: 1, x: 0, y: 0, rotateY: 0, filter: 'blur(0px)' },
          {
            opacity: 0,
            x: '26vw',
            y: '-4vh',
            rotateY: 16,
            filter: 'blur(7px)',
            ease: 'expo.inOut',
          },
          0.7
        );

        scrollTl.fromTo(
          valuesRef.current,
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
          { opacity: 0, y: 62, scale: 0.86, filter: 'blur(4px)', ease: 'power3.inOut' },
          0.74
        );

      });

      mm.add('(max-width: 1023px)', () => {
        gsap.set([imageRef.current, contentRef.current, butterflyRef.current, valuesRef.current], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (swarmButterflies.length === 0) return;

    swarmButterflies.forEach((butterfly) => {
      const selector = `[data-swarm-id="${butterfly.id}"]`;

      gsap.fromTo(
        selector,
        { opacity: 0, scale: 0.2, x: butterfly.x, y: butterfly.y, rotate: butterfly.rotate },
        {
          opacity: 1,
          scale: butterfly.scale,
          x: butterfly.scatterX,
          y: butterfly.scatterY,
          rotate: butterfly.rotate + 120,
          duration: 1.5,
          ease: 'power2.out',
        }
      );

      gsap.to(selector, {
        x: butterfly.targetX,
        y: butterfly.targetY,
        scale: 0.36,
        opacity: 1,
        duration: 1.15,
        delay: 1.5,
        ease: 'power2.inOut',
      });

      gsap.to(selector, {
        opacity: 0,
        duration: 0.8,
        delay: 3.75,
        ease: 'power2.inOut',
      });
    });

    if (swarmTimeoutRef.current) {
      window.clearTimeout(swarmTimeoutRef.current);
    }

    swarmTimeoutRef.current = window.setTimeout(() => {
      setSwarmButterflies([]);
      setShowSwarmOverlay(false);
    }, 4600);

    return () => {
      if (swarmTimeoutRef.current) {
        window.clearTimeout(swarmTimeoutRef.current);
      }
    };
  }, [swarmButterflies]);

  useEffect(() => {
    const resetThemeMotionState = () => {
      if (!imageRef.current) return;
      gsap.set(imageRef.current, { rotate: 0, rotationY: 0 });
    };

    const onThemeChange = () => {
      if (!imageRef.current) return;
      resetThemeMotionState();
      gsap.fromTo(
        imageRef.current,
        { rotationY: 0 },
        {
          rotationY: 360,
          duration: 0.95,
          ease: 'power2.inOut',
        }
      );
    };

    window.addEventListener('portfolio-theme-change', onThemeChange as EventListener);
    window.addEventListener('resize', resetThemeMotionState);
    resetThemeMotionState();

    return () => {
      window.removeEventListener('portfolio-theme-change', onThemeChange as EventListener);
      window.removeEventListener('resize', resetThemeMotionState);
    };
  }, []);

  useEffect(() => {
    const ensureHeroVisible = () => {
      const nodes = [
        imageRef.current,
        contentRef.current,
        valuesRef.current,
        butterflyButtonRef.current,
      ].filter(Boolean) as HTMLElement[];

      nodes.forEach((node) => {
        const opacity = Number(gsap.getProperty(node, 'opacity'));
        if (Number.isFinite(opacity) && opacity < 0.1) {
          gsap.set(node, { opacity: 1, x: 0, y: 0, scale: 1 });
        }
      });
    };

    const t = window.setTimeout(ensureHeroVisible, 900);
    return () => window.clearTimeout(t);
  }, []);

  const handleButterflyClick = () => {
    if (!butterflyRef.current) return;

    const butterflyRect = butterflyRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const startX = butterflyRect.left + butterflyRect.width * 0.5;
    const startY = butterflyRect.top + butterflyRect.height * 0.5;
    const textPoints = buildTextTargets('ANNA \u2665', viewportWidth, viewportHeight);
    const shuffledPoints = [...textPoints];
    for (let i = shuffledPoints.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPoints[i], shuffledPoints[j]] = [shuffledPoints[j], shuffledPoints[i]];
    }
    const usablePoints = shuffledPoints.slice(0, 320);

    const created = usablePoints.map((point, index) => ({
      id: Date.now() + index,
      x: startX,
      y: startY,
      scatterX: gsap.utils.random(0, viewportWidth),
      scatterY: gsap.utils.random(0, viewportHeight),
      targetX: point.x,
      targetY: point.y,
      scale: gsap.utils.random(0.2, 0.55),
      rotate: gsap.utils.random(-90, 90),
    }));

    setShowSwarmOverlay(true);
    setSwarmButterflies(created);
  };

  const values = [
    'Problem Solving',
    'Reliability',
    'Adaptability',
    'Teamwork',
    'Initiative',
    'Accountability',
    'Work Ethic',
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0a0a0f] flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(112,130,56,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(85,107,47,0.05) 0%, transparent 40%)',
      }}
    >
      <div className="absolute -left-20 top-20 w-56 h-56 rounded-full bg-[#5f7a2f]/20 blur-[90px] animate-pulse-slow pointer-events-none" />
      <div className="absolute -right-12 bottom-24 w-48 h-48 rounded-full bg-[#556b2f]/20 blur-[80px] animate-float pointer-events-none" />

      {/* Floating Butterfly (wide click area) */}
      <button
        ref={butterflyButtonRef}
        type="button"
        onClick={handleButterflyClick}
        className="absolute z-30 top-[7%] right-[4%] w-24 h-24 sm:top-[12%] sm:right-[8%] sm:w-28 sm:h-28 flex items-center justify-center cursor-pointer"
        aria-label="Trigger butterfly swarm"
      >
        <span className="absolute inset-1 rounded-full bg-[#708238]/20 blur-md sm:inset-0 sm:bg-transparent sm:blur-none" />
        <img
          ref={butterflyRef}
          src="/pteranodon.png"
          alt="Pterodactyl"
          className="relative w-20 h-20 sm:w-24 sm:h-24 butterfly-glow animate-float opacity-95 sm:opacity-70 brightness-125 saturate-150"
        />
      </button>

      {/* Full-page butterfly swarm effect */}
      <div
        className={`pointer-events-none fixed inset-0 z-[120] overflow-hidden transition-opacity duration-300 ${
          showSwarmOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/85" />
        {swarmButterflies.map((butterfly) => (
          <img
            key={butterfly.id}
            data-swarm-id={butterfly.id}
            src="/pteranodon.png"
            alt=""
            className="absolute w-7 h-7 opacity-0"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-[4vw] py-20">
        <div className="hero-main-layout flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div
            ref={imageRef}
            className="hero-image-wrap hero-coin-flip relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#708238] via-[#556b2f] to-[#3f4f22] p-1">
              <div className="hero-photo-circle relative w-full h-full rounded-full overflow-hidden border-4 border-[#0a0a0f]">
                <div className="hero-photo-light-bg absolute inset-0" />
                <img
                  src="/zacc-transparent.png"
                  alt="Zacc Bandahala"
                  className="relative z-10 w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-full bg-[#708238]/20 blur-2xl -z-10" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="hero-main-content flex-1 text-left">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#708238] mb-4 block">
              Hi! I am
            </span>
            
            <h1 ref={nameRef} className="text-5xl lg:text-7xl font-bold text-gradient mb-6 no-text-outline">
              Zacc
            </h1>
            <p className="text-[#a3b97a] text-xs mb-4">
              ZCSALWEEMNHARR E. BANDAHALA
            </p>

            <div className="space-y-4 text-[#b7c98a]/80 text-base lg:text-lg leading-relaxed max-w-2xl">
              {!showInfo ? (
                <button
                  type="button"
                  onClick={() => setShowInfo(true)}
                  className="uiverse-fun-btn inline-flex items-center justify-center"
                  aria-label="View info"
                >
                  <span className="uiverse-fun-btn__label">VIEW INFO</span>
                </button>
              ) : null}
              {showInfo ? (
                <p>
                  <span className="text-[#708238]">Versatile and results-driven professional with hands-on experience in web development, QA testing, e-commerce, and data analytics. Skilled at coordinating tasks, managing projects, troubleshooting issues, and ensuring smooth workflows across technical and non-technical roles. Effective communication, organization, teamwork, and quality focus drive reliable results in dynamic environments.</span>
                </p>
              ) : null}
            </div>

            <div className="mt-6 p-4 rounded-xl card-glass">
              <p className="text-sm text-[#a3b97a]">
                <span className="text-[#708238] font-semibold">Bachelor of Science in Computer Science</span>
              </p>
              <p className="text-xs text-[#a3b97a]/70 mt-2">
                Western Mindanao State University, Zamboanga City, Philippines
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div
          ref={valuesRef}
          className={`hero-values flex flex-wrap justify-center gap-4 lg:gap-6 ${
            showInfo ? 'mt-20 lg:mt-24' : 'mt-16 lg:mt-20'
          }`}
        >
          <span className="w-full text-center font-mono text-sm tracking-[0.18em] uppercase text-[#708238] font-semibold">
            Values
          </span>
          {values.map((value) => (
            <div
              key={value}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#708238]/10 border border-[#708238]/20"
            >
              <span className="text-sm text-[#a3b97a]/70">{value}</span>
            </div>
          ))}
          <div className="w-full flex justify-center mt-2">
            <a href="#work" aria-label="Scroll down" className="slow-down-arrow text-[#7aa24a] text-4xl leading-none">
              ↓
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;








