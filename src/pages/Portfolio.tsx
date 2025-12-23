import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { ExternalLink, Code, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  category: "student" | "business";
  image_url: string | null;
  technologies: string[];
  features: string[];
  demo_url: string | null;
  created_at: string;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "student" | "business">("all");
  const { lang } = useLanguage();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data as Project[]);
    }
    setLoading(false);
  };

  const filteredProjects = projects.filter((p) =>
    filter === "all" ? true : p.category === filter
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="section-container relative z-10">
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{t('portfolio.badge', lang)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('portfolio.title', lang)}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('portfolio.subline', lang)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-8">
        <div className="section-container">
          <div className="flex justify-center gap-2">
            {(["all", "student", "business"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "all" ? t('filter.all', lang) : tab === "student" ? t('filter.student', lang) : t('filter.business', lang)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="section-container">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('portfolio.empty', lang)}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <AnimatedSection
                  key={project.id}
                  animation="fade-up"
                  delay={index * 0.1}
                >
                  <div className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300">
                    {project.image_url ? (
                      <div className="aspect-video bg-secondary overflow-hidden">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Code className="w-12 h-12 text-primary/50" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.category === "student"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {project.category === "student" ? t('category.student', lang) : t('category.business', lang)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-secondary rounded text-xs text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-secondary rounded text-xs text-muted-foreground">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="heroOutline"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <Link
                            to={`/contact?project=${project.id}&type=${project.category === "student" ? "graduation" : "trial"}`}
                          >
                            {t('portfolio.requestInfo', lang)}
                          </Link>
                        </Button>
                        {project.demo_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(project.demo_url!, "_blank")}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;