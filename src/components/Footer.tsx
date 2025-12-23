import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();

  const footerLinks = {
    product: [
      { name: "For Students", path: "/students" },
      { name: "For Business", path: "/business" },
      { name: "Contact", path: "/contact" },
    ],
    students: [
      { name: "Project Guidance", path: "/students" },
      { name: "System Design", path: "/students" },
      { name: "Code Review", path: "/students" },
      { name: "Defense Prep", path: "/students" },
    ],
    business: [
      { name: "Web Development", path: "/business" },
      { name: "Mobile Apps", path: "/business" },
      { name: "AI Solutions", path: "/business" },
      { name: "Automation", path: "/business" },
    ],
  };

  return (
    <footer className="bg-card/30 border-t border-border/50 mt-20">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">
                  D
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Devora
              </span>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              {t("footer.tagline", lang)}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/i.97_h?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="mailto:hello@nexio.dev"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("footer.product", lang)}
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("footer.forStudents", lang)}
            </h4>
            <ul className="space-y-3">
              {footerLinks.students.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("footer.forBusiness", lang)}
            </h4>
            <ul className="space-y-3">
              {footerLinks.business.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Devora. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("footer.privacy", lang)}
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("footer.terms", lang)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
