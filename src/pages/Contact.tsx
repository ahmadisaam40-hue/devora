import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import GlassCard from "@/components/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "student",
    message: "",
    projectId: "",
    companyName: "",
  });

  const { lang } = useLanguage();

  useEffect(() => {
    fetchProjects();
    
    // Pre-fill from URL params
    const projectId = searchParams.get("project");
    const type = searchParams.get("type");
    if (projectId) {
      setFormData(prev => ({ ...prev, projectId }));
    }
    if (type === "graduation") {
      setFormData(prev => ({ ...prev, type: "student" }));
    } else if (type === "trial") {
      setFormData(prev => ({ ...prev, type: "business" }));
    }
  }, [searchParams]);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("id, title, category");
    if (data) setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const requestType = formData.type === "student" ? "graduation" : "trial";
      
      const { error } = await supabase.functions.invoke("submit-request", {
        body: {
          request: {
            request_type: requestType,
            name: formData.name.trim(),
            email: formData.email.trim() || null,
            phone: formData.phone.trim(),
            project_id: formData.projectId || null,
            details: formData.message.trim(),
            company_name: formData.companyName.trim() || null,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Request Sent!",
        description: "We'll review your request and get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", phone: "", type: "student", message: "", projectId: "", companyName: "" });
    } catch (err) {
      console.error("Submit error:", err);
      toast({
        title: "Error",
        description: "Failed to send your request. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@devora.dev",
      link: "mailto:hello@devora.dev",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "077533587355",
      link: "tel:077533587355",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Iraq - baghdad",
      link: null,
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10 text-center">
          <AnimatedSection animation="fade-up">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                {t('contact.badge', lang)}
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('contact.title', lang)}
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subline', lang)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection animation="fade-left">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {t('contact.info.title', lang)}
                </h2>
              </AnimatedSection>

              {contactInfo.map((info, index) => (
                <AnimatedSection
                  key={index}
                  animation="fade-left"
                  delay={index * 0.1}
                >
                  <GlassCard className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-0.5">
                        {t(`contact.info.${index === 0 ? 'email' : index === 1 ? 'phone' : index === 2 ? 'location' : 'response'}`, lang)}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{info.value}</p>
                      )}
                    </div>
                  </GlassCard>
                </AnimatedSection>
              ))}

              <AnimatedSection animation="fade-left" delay={0.4}>
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">
                    {t('contact.free.title', lang)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('contact.free.desc', lang)}
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection animation="fade-right">
                <GlassCard className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('form.name', lang)}</Label>
                        <Input
                          id="name"
                          placeholder={t('form.placeholder.name', lang)}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="bg-secondary/50 border-border/50 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('form.email', lang)}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('form.placeholder.email', lang)}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="bg-secondary/50 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('form.phone', lang)}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t('form.placeholder.phone', lang)}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          className="bg-secondary/50 border-border/50 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">{t('form.type', lang)}</Label>
                        <select
                          id="type"
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          className="flex h-10 w-full rounded-xl border border-border/50 bg-secondary/50 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="student">{t('form.type.student', lang)}</option>
                          <option value="business">{t('form.type.business', lang)}</option>
                        </select>
                      </div>
                    </div>

                    {formData.type === "business" && (
                      <div className="space-y-2">
                        <Label htmlFor="companyName">{t('form.placeholder.company', lang)}</Label>
                        <Input
                          id="companyName"
                          placeholder={t('form.placeholder.company', lang)}
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                          className="bg-secondary/50 border-border/50 focus:border-primary"
                        />
                      </div>
                    )}

                    {projects.length > 0 && (
                      <div className="space-y-2">
                        <Label htmlFor="projectId">Interested in a specific project? (Optional)</Label>
                        <select
                          id="projectId"
                          value={formData.projectId}
                          onChange={(e) =>
                            setFormData({ ...formData, projectId: e.target.value })
                          }
                          className="flex h-10 w-full rounded-xl border border-border/50 bg-secondary/50 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">{t('form.project.none', lang)}</option>
                          {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                              {project.title} ({project.category === 'student' ? t('category.student', lang) : t('category.business', lang)})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="message">{t('form.message', lang)}</Label>
                      <Textarea
                        id="message"
                        placeholder={t('form.placeholder.message', lang)}
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          {t('contact.sending', lang)}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          {formData.type === "student" ? t('contact.submit.student', lang) : t('contact.submit.business', lang)}
                        </span>
                      )}
                    </Button>
                  </form>
                </GlassCard>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;