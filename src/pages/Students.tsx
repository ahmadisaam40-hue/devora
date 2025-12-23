import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import AnimatedSection from "@/components/AnimatedSection";
import GlassCard from "@/components/GlassCard";
import {
  GraduationCap,
  Lightbulb,
  FileCode,
  Code2,
  Presentation,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Users,
  Shield,
} from "lucide-react";

const Students = () => {
  const services = [
    {
      icon: Lightbulb,
      title: "Project Idea Selection",
      description:
        "We help you choose a project that's both innovative and achievable. Get guidance on scoping and feasibility analysis.",
      features: [
        "Brainstorming sessions",
        "Market research support",
        "Feasibility assessment",
        "Technology recommendations",
      ],
    },
    {
      icon: FileCode,
      title: "System Design",
      description:
        "Master the technical foundation with professional UML diagrams, ERDs, and architecture documentation.",
      features: [
        "Use case diagrams",
        "Class diagrams",
        "ERD design",
        "System architecture",
      ],
    },
    {
      icon: Code2,
      title: "Code Review & Guidance",
      description:
        "Get expert feedback on your code. Learn best practices while building a project you can be proud of.",
      features: [
        "Code quality review",
        "Best practices guidance",
        "Bug identification",
        "Performance optimization",
      ],
    },
    {
      icon: Presentation,
      title: "Defense Preparation",
      description:
        "Ace your presentation with confidence. We prepare you for tough questions and help you showcase your work effectively.",
      features: [
        "Presentation design",
        "Q&A preparation",
        "Mock defense sessions",
        "Documentation review",
      ],
    },
  ];

  const { lang } = useLanguage();

  const benefits = [
    {
      icon: BookOpen,
      title: "Learn While Building",
      description: "Gain real-world skills as you work on your project",
    },
    {
      icon: Shield,
      title: "Academic Integrity",
      description: "100% ethical guidance that supports your learning",
    },
    {
      icon: Users,
      title: "1-on-1 Mentorship",
      description: "Personalized attention from experienced developers",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">
                  {t('students.badge', lang)}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t('students.title', lang)}
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('students.subline', lang)}
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    {t('startProject', lang)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/contact">{t('students.cta.contact', lang)}</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-y border-border/50 bg-card/30">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t(`students.benefit.${index+1}.title`, lang)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`students.benefit.${index+1}.desc`, lang)}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('students.services.title', lang)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('students.services.subline', lang)}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
                <GlassCard className="h-full p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-card/30">
        <div className="section-container">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('process.title', lang)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('process.subline', lang)}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Consultation", desc: "Discuss your ideas and goals" },
              { step: "02", title: "Planning", desc: "Create a roadmap for success" },
              { step: "03", title: "Development", desc: "Build with expert guidance" },
              { step: "04", title: "Defense", desc: "Present with confidence" },
            ].map((item, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
                <div className="relative">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
                  )}
                  <div className="text-5xl font-bold text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(`process.step.${index+1}.title`, lang)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t(`process.step.${index+1}.desc`, lang)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection animation="scale">
            <div className="relative glass-card p-12 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Ace Your <span className="gradient-text">Graduation Project</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Book a free consultation and let's discuss how we can help you succeed.
                </p>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Get Started Today
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Students;
