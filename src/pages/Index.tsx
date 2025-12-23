import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedText from "@/components/AnimatedText";
import AnimatedCounter from "@/components/AnimatedCounter";
import MagneticButton from "@/components/MagneticButton";
import ParallaxSection from "@/components/ParallaxSection";
import StaggerContainer from "@/components/StaggerContainer";
import GlassCard from "@/components/GlassCard";
import { GraduationCap, Building2, Code, Lightbulb, Users, Zap, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const { lang } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Glow orbs floating animation
      gsap.to(glowRef1.current, {
        x: 50,
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      
      gsap.to(glowRef2.current, {
        x: -40,
        y: 40,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      );

      // Headline with split text effect
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 80, rotationX: -15, transformPerspective: 1000 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: "power4.out" },
        "-=0.3"
      );

      // Subline with blur effect
      tl.fromTo(
        sublineRef.current,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        "-=0.6"
      );

      // CTA buttons with stagger
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
        "-=0.4"
      );

      // Scroll indicator pulse
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );

      // Continuous scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: "Expert Guidance",
      description: "Get personalized mentorship from experienced professionals",
    },
    {
      icon: Code,
      title: "Quality Code",
      description: "Clean, maintainable, and scalable software solutions",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Ongoing support throughout your project journey",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Efficient development with on-time project completion",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        {/* Animated Glow effects */}
        <div 
          ref={glowRef1}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" 
        />
        <div 
          ref={glowRef2}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" 
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div 
                className="bg-primary/30 rounded-full"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div 
              ref={badgeRef}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">
                <AnimatedText text={t('hero.badge', lang)} type="words" animation="fade" stagger={0.05} delay={0.5} />
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              {t('hero.headline', lang)}
            </h1>

            <p
              ref={sublineRef}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {t('hero.subline', lang)}
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.2}>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/students" className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    {t('cta.student', lang)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/business" className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    {t('cta.business', lang)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-wider">{t('scroll', lang)}</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/50 bg-card/30 relative overflow-hidden">
        <ParallaxSection speed={0.2} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        </ParallaxSection>
        
        <div className="section-container relative z-10">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" stagger={0.15} animation="scale">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                <AnimatedCounter end={200} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.projects', lang)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                <AnimatedCounter end={150} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.clients', lang)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.success', lang)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">{t('stats.support', lang)}</div>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="section-container">
          <AnimatedSection animation="blur-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('features.title', lang)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('features.subline', lang)}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1} animation="fade-up">
            {features.map((feature, index) => (
              <GlassCard key={index} className="h-full group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`feature.${index+1}.title`, lang)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`feature.${index+1}.desc`, lang)}
                </p>
              </GlassCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Two Paths Section */}
      <section className="py-24 bg-card/30 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="section-container relative z-10">
          <AnimatedSection animation="slide-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('two.title', lang)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('two.subline', lang)}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Students Card */}
            <AnimatedSection animation="fade-left" duration={1}>
              <GlassCard className="p-8 h-full group hover:border-primary/50 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <GraduationCap className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t('students.card.title', lang)}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('students.card.desc', lang)}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    t('students.item.1', lang),
                    t('students.item.2', lang),
                    t('students.item.3', lang),
                    t('students.item.4', lang),
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-foreground group/item">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
                <MagneticButton>
                  <Button variant="hero" asChild>
                    <Link to="/students" className="flex items-center gap-2">
                      {t('students.explore', lang)}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </MagneticButton>
              </GlassCard>
            </AnimatedSection>

            {/* Business Card */}
            <AnimatedSection animation="fade-right" duration={1}>
              <GlassCard className="p-8 h-full group hover:border-accent/50 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 shadow-lg shadow-accent/30 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                  <Building2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t('business.card.title', lang)}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('business.card.desc', lang)}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    t('business.item.1', lang),
                    t('business.item.2', lang),
                    t('business.item.3', lang),
                    t('business.item.4', lang),
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-foreground group/item">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
                <MagneticButton>
                  <Button variant="heroOutline" asChild>
                    <Link to="/business" className="flex items-center gap-2">
                      {t('business.explore', lang)}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </MagneticButton>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="section-container">
          <AnimatedSection animation="elastic">
            <div className="relative glass-card p-12 md:p-16 text-center overflow-hidden group">
              {/* Animated background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <AnimatedSection animation="bounce" delay={0.2}>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Ready to Start Your <span className="gradient-text">Project</span>?
                  </h2>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={0.4}>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Let's discuss your ideas and create something amazing together. 
                    Get a free consultation today.
                  </p>
                </AnimatedSection>
                <AnimatedSection animation="scale" delay={0.6}>
                  <MagneticButton strength={0.3}>
                    <Button variant="hero" size="xl" asChild>
                      <Link to="/contact" className="flex items-center gap-2">
                        Start Your Project
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </MagneticButton>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;