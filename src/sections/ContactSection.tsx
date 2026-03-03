import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, User, Mail, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      gsap.fromTo(
        headlineRef.current,
        {
          x: '-6vw',
          y: 32,
          opacity: 0,
          rotateY: -14,
          filter: 'blur(8px)',
          transformPerspective: 1200,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: isDesktop ? 'top 88%' : 'top 93%',
            end: isDesktop ? 'top 56%' : 'top 73%',
            scrub: isDesktop ? 0.45 : false,
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        {
          x: '7vw',
          y: 40,
          opacity: 0,
          rotateY: 16,
          rotateX: 10,
          clipPath: 'inset(0 18% 0 18% round 20px)',
          filter: 'blur(10px)',
          transformPerspective: 1300,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          clipPath: 'inset(0 0% 0 0% round 20px)',
          filter: 'blur(0px)',
          duration: 1.05,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: isDesktop ? 'top 90%' : 'top 95%',
            end: isDesktop ? 'top 60%' : 'top 76%',
            scrub: isDesktop ? 0.5 : false,
          },
        }
      );

      gsap.fromTo(
        detailsRef.current,
        { y: 56, x: -18, opacity: 0, scale: 0.92, filter: 'blur(7px)' },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: detailsRef.current,
            start: isDesktop ? 'top 93%' : 'top 97%',
            end: isDesktop ? 'top 66%' : 'top 80%',
            scrub: isDesktop ? 0.44 : false,
          },
        }
      );

      gsap.fromTo(
        footerRef.current,
        {
          y: 72,
          opacity: 0,
          scaleY: 0.86,
          transformOrigin: 'top center',
          clipPath: 'inset(16% 0% 0% 0%)',
        },
        {
          y: 0,
          opacity: 1,
          scaleY: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: isDesktop ? 'top 97%' : 'top 99%',
            end: isDesktop ? 'top 82%' : 'top 84%',
            scrub: isDesktop ? 0.5 : false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const recipient = 'zakurofr@gmail.com';
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0d0d14] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(112,130,56,0.08) 0%, transparent 50%)',
      }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-[8vw] max-w-6xl mx-auto">
        <div ref={headlineRef} className="lg:w-[42vw]">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#708238] block mb-2">
            Get in Touch
          </span>
          <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
            Let's Connect
          </h2>
          <p className="text-[#a3b97a]/70 text-[clamp(14px,1.1vw,17px)] leading-relaxed mb-8">
            I'm always open to discussing new opportunities, collaborations, or simply having a meaningful conversation about our shared passions.
          </p>

          <div ref={detailsRef} className="p-6 rounded-2xl bg-gradient-to-br from-[#708238]/20 to-[#556b2f]/5 border border-[#708238]/30">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#708238]/20 text-[#b9cc8f]">
                <Linkedin size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[#f2f6e8] font-semibold mb-1">Connect on LinkedIn</p>
                <p className="text-[#a3b97a]/70 text-sm mb-3">Let's connect on LinkedIn</p>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/zcsalweemnharr-bandahala-445167309/"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-cta-btn mt-4 flex w-full items-center justify-center py-3 px-4 bg-gradient-to-r from-[#7a9440] to-[#708238] hover:from-[#6b862f] hover:to-[#5f7a2f] text-white text-center rounded-xl font-medium transition-colors"
            >
              View LinkedIn Profile
            </a>
          </div>
        </div>

        <div ref={formRef} className="w-full lg:w-[40vw]">
          <div className="p-5 sm:p-7 rounded-2xl card-glass">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#708238]/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#708238]" />
                </div>
                <h3 className="text-[#f2f6e8] text-xl font-semibold mb-2">
                  Message sent!
                </h3>
                <p className="text-[#a3b97a]/70 text-sm">
                  Thank you for reaching out. I will get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#a3b97a]/70 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="ui-input h-11 text-base sm:text-sm rounded-xl"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#a3b97a]/70 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="ui-input h-11 text-base sm:text-sm rounded-xl"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#a3b97a]/70 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="ui-input min-h-28 text-base sm:text-sm rounded-xl resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="no-text-outline uiverse-fun-btn w-full justify-center disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={16} className="ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div
        ref={footerRef}
        className="relative mt-[2vh] pt-[2vh] border-t border-[#708238]/10 w-full max-w-none mx-auto overflow-hidden"
      >
        <div className="relative z-10 px-2 lg:px-[13rem] py-2 -translate-y-2 lg:-translate-y-3">
          <div className="mb-4 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-10">
            <img
              src="/pteranodon.png"
              alt="Pteranodon left"
              className="w-36 h-36 lg:w-52 lg:h-52 object-contain"
            />
            <div className="flex flex-col items-center text-center gap-2">
              <div>
                <h3 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient leading-[1.1]">
                  Code with logic.
                  <br />
                  Execute with purpose.
                  <br />
                  Deliver with impact.
                </h3>
              </div>

            <div className="portfolio-text-outline space-y-1 text-[clamp(22px,1.6vw,34px)] text-[#a3b97a]">
              <p className="flex items-center justify-center gap-3">
                <User size={24} />
                <span>Zcsalweemnharr "Zacc" E. Bandahala</span>
              </p>
              <p className="flex items-center justify-center gap-3">
                <Mail size={24} />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ZCSALWEEMNHARR%20E.%20BANDAHALA%20%3Czakurofr@gmail.com%3E"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#b9cc8f] transition-colors"
                  >
                    zakurofr@gmail.com
                  </a>
                </p>
              <p className="flex items-center justify-center gap-3">
                <Facebook size={24} />
                <a
                  href="https://www.facebook.com/whyzzky.engkoh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#b9cc8f] transition-colors"
                  >
                    facebook.com/whyzzky.engkoh
                  </a>
                </p>
              </div>
            </div>
            <img
              src="/pteranodon.png"
              alt="Pteranodon right"
              className="w-36 h-36 lg:w-52 lg:h-52 object-contain -scale-x-100"
            />
          </div>

          <p className="font-mono text-xs text-[#a3b97a]/50 mt-4 text-center">
            © 2026 Zacc. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;








