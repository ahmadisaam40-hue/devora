import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import GlassCard from "@/components/GlassCard";
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import {
  Building2,
  Globe,
  Smartphone,
  BarChart3,
  Bot,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";

const Business = () => {
  const { lang } = useLanguage();
  const services = [
    {
      icon: Globe,
      title: "Websites & Web Apps",
      description:
        "Modern, responsive websites and web applications that drive results and engage your customers.",
      features: [
        "Custom website design",
        "E-commerce solutions",
        "Progressive web apps",
        "CMS integration",
      ],
    },
    {
      icon: BarChart3,
      title: "Management Systems",
      description:
        "Streamline your operations with custom management systems tailored to your business needs.",
      features: [
        "Sales management",
        "Inventory tracking",
        "Invoice generation",
        "CRM solutions",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps that put your business in your customers' pockets.",
      features: [
        "iOS development",
        "Android development",
        "Cross-platform apps",
        "App store deployment",
      ],
    },
    {
      icon: Bot,
      title: "AI & Automation",
      description:
        "Leverage artificial intelligence to automate tasks and gain competitive advantages.",
      features: [
        "Chatbots & assistants",
        "Process automation",
        "Data analysis",
        "Predictive insights",
      ],
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Boost Efficiency",
      description: "Automate repetitive tasks and streamline operations",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime",
    },
    {
      icon: TrendingUp,
      title: "Scale With You",
      description: "Solutions that grow as your business grows",
    },
  ];

  const industries = [
    "Retail & E-commerce",
    "Restaurants & Cafes",
    "Healthcare",
    "Real Estate",
    "Education",
    "Professional Services",
    "Manufacturing",
    "Logistics",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Building2 className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent font-medium">
                  {t('business.badge', lang)}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t('business.title', lang)}
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('business.subline', lang)}
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    {t('business.cta.quote', lang)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/contact">{t('business.cta.contact', lang)}</Link>
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
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t(`business.benefit.${index+1}.title`, lang)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`business.benefit.${index+1}.desc`, lang)}
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
              {t('business.services.title', lang)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('business.services.subline', lang)}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
                <GlassCard className="h-full p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-accent" />
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
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
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

      {/* Industries Section */}
      <section className="py-24 bg-card/30">
        <div className="section-container">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('business.industries.title', lang)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('business.industries.subline', lang)}
            </p>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 0.05}>
                <div className="px-6 py-3 rounded-full bg-secondary border border-border/50 text-foreground text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default">
                  {industry}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('business.process.title', lang)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('business.process.subline', lang)}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Understand your business needs" },
              { step: "02", title: "Design", desc: "Create the perfect solution" },
              { step: "03", title: "Development", desc: "Build with quality & speed" },
              { step: "04", title: "Delivery", desc: "Launch & ongoing support" },
            ].map((item, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
                <div className="relative">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent/50 to-transparent -z-10" />
                  )}
                  <div className="text-5xl font-bold text-accent/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(`business.process.step.${index+1}.title`, lang)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t(`business.process.step.${index+1}.desc`, lang)}</p>
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
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <Building2 className="w-16 h-16 text-accent mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Transform Your <span className="gradient-text">Business</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Get a free consultation and discover how custom software can help you 
                  achieve your goals.
                </p>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Get a Free Quote
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

export default Business;
