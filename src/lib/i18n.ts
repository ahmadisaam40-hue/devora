export type Lang = 'en' | 'ar';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    home: 'Home',
    students: 'Students',
    business: 'Business',
    portfolio: 'Portfolio',
    contact: 'Contact',
    getStarted: 'Get Started',
    startProject: 'Start Your Project',
    toggleTo: 'عربي',

    // Index
    'hero.badge': 'Empowering Ideas Into Reality',
    'hero.headline': 'Build. Learn. Grow.',
    'hero.subline': 'From graduation projects to business solutions, we turn your ideas into powerful software. Expert guidance for students, innovative solutions for businesses.',
    'cta.student': "I'm a Student",
    'cta.business': "I'm a Business Owner",
    'students.explore': 'Explore Student Services',
    'business.explore': 'Explore Business Solutions',
    scroll: 'Scroll',

    // Stats
    'stats.projects': 'Projects Delivered',
    'stats.clients': 'Happy Clients',
    'stats.success': 'Success Rate',
    'stats.support': 'Support',

    // Features
    'features.title': 'Why Choose Devora?',
    'features.subline': 'We combine technical excellence with personalized support to deliver outstanding results for every project.',
    'feature.1.title': 'Expert Guidance',
    'feature.1.desc': 'Get personalized mentorship from experienced professionals',
    'feature.2.title': 'Quality Code',
    'feature.2.desc': 'Clean, maintainable, and scalable software solutions',
    'feature.3.title': 'Dedicated Support',
    'feature.3.desc': 'Ongoing support throughout your project journey',
    'feature.4.title': 'Fast Delivery',
    'feature.4.desc': 'Efficient development with on-time project completion',

    // Two paths
    'two.title': 'Two Paths, One Mission',
    'two.subline': "Whether you're a student working on your graduation project or a business owner seeking software solutions, we've got you covered.",

    // Student card
    'students.card.title': 'For Students',
    'students.card.desc': 'Get expert guidance for your graduation project. From idea selection to defense preparation, we support you every step of the way.',
    'students.item.1': 'Project idea selection & validation',
    'students.item.2': 'System design (UML, ERD)',
    'students.item.3': 'Code review & guidance',
    'students.item.4': 'Presentation & defense prep',

    // Business card
    'business.card.title': 'For Business',
    'business.card.desc': 'Transform your business with custom software solutions. We build websites, apps, and automation tools tailored to your needs.',
    'business.item.1': 'Websites & web applications',
    'business.item.2': 'Mobile applications',
    'business.item.3': 'Management systems',
    'business.item.4': 'AI-powered automation',

    // Business page
    'business.badge': 'For Business Owners',
    'business.title': 'Software Solutions That Drive Growth',
    'business.subline': 'From local shops to growing enterprises, we build custom software solutions that help you work smarter, sell more, and scale faster.',
    'business.cta.quote': 'Get a Free Quote',
    'business.cta.contact': 'Contact for Pricing',

    'business.benefit.1.title': 'Boost Efficiency',
    'business.benefit.1.desc': 'Automate repetitive tasks and streamline operations',
    'business.benefit.2.title': 'Secure & Reliable',
    'business.benefit.2.desc': 'Enterprise-grade security and 99.9% uptime',
    'business.benefit.3.title': 'Scale With You',
    'business.benefit.3.desc': 'Solutions that grow as your business grows',

    'business.services.title': 'Our Solutions',
    'business.services.subline': 'Comprehensive software solutions designed to solve real business challenges and unlock new opportunities.',

    'business.industries.title': 'Industries We Serve',
    'business.industries.subline': 'We work with businesses across various industries, delivering tailored solutions for their unique challenges.',

    'business.process.title': 'Our Process',
    'business.process.subline': 'A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations.',
    'business.process.step.1.title': 'Discovery',
    'business.process.step.1.desc': 'Understand your business needs',
    'business.process.step.2.title': 'Design',
    'business.process.step.2.desc': 'Create the perfect solution',
    'business.process.step.3.title': 'Development',
    'business.process.step.3.desc': 'Build with quality & speed',
    'business.process.step.4.title': 'Delivery',
    'business.process.step.4.desc': 'Launch & ongoing support',

    // Portfolio
    'portfolio.badge': 'Our Work',
    'portfolio.title': 'Project Portfolio',
    'portfolio.subline': 'Explore our completed projects for students and businesses. Each project represents our commitment to quality and innovation.',
    'filter.all': 'All Projects',
    'filter.student': 'Student Projects',
    'filter.business': 'Business Projects',
    'portfolio.empty': 'No projects available yet.',
    'portfolio.requestInfo': 'Request Info',
    'category.student': 'Student',
    'category.business': 'Business',

    // Contact
    'contact.badge': 'Get In Touch',
    'contact.title': 'Start Your Project',
    'contact.subline': "Ready to bring your ideas to life? Fill out the form below and we'll get back to you within 24 hours.",
    'contact.info.title': 'Contact Information',
    'contact.free.title': 'Free Consultation',
    'contact.free.desc': 'Not sure where to start? Book a free 30-minute consultation to discuss your project needs.',

    'form.name': 'Full Name *',
    'form.email': 'Email (Optional)',
    'form.phone': 'Phone *',
    'form.type': 'I am a... *',
    'form.type.student': 'University Student',
    'form.type.business': 'Business Owner',
    'form.project.none': 'None - I have a new project idea',
    'form.message': 'Tell us about your project *',
    'form.placeholder.name': 'ali',
    'form.placeholder.email': 'ali@example.com',
    'form.placeholder.phone': '07',
    'form.placeholder.company': 'Your company name',
    'form.placeholder.message': 'Describe your project, goals, and any specific requirements...',

    'contact.sending': 'Sending...',
    'contact.submit.student': 'Submit Graduation Project Request',
    'contact.submit.business': 'Request Trial / Quote',

    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',
    'contact.info.response': 'Response Time',
    'contact.info.responseValue': 'Within 24 hours',


    // Footer
    'footer.tagline': 'Empowering students and businesses with innovative software solutions. Build. Learn. Grow.',
    'footer.product': 'Product',
    'footer.forStudents': 'For Students',
    'footer.forBusiness': 'For Business',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    // Students page
    'students.badge': 'For University Students',
    'students.title': 'Graduation Project Mentorship',
    'students.subline': 'Get expert guidance to turn your graduation project into a success. We support you through every phase while ensuring you learn and grow as a developer.',
    'students.cta.contact': 'Contact for Pricing',

    'students.benefit.1.title': 'Learn While Building',
    'students.benefit.1.desc': 'Gain real-world skills as you work on your project',
    'students.benefit.2.title': 'Academic Integrity',
    'students.benefit.2.desc': "100% ethical guidance that supports your learning",
    'students.benefit.3.title': '1-on-1 Mentorship',
    'students.benefit.3.desc': 'Personalized attention from experienced developers',

    'students.services.title': 'Complete Support for Your Project',
    'students.services.subline': 'From the initial idea to your final defense, we provide comprehensive mentorship tailored to your needs.',

    'process.title': 'How It Works',
    'process.subline': 'A simple, structured approach to help you succeed in your graduation project.',
    'process.step.1.title': 'Consultation',
    'process.step.1.desc': 'Discuss your ideas and goals',
    'process.step.2.title': 'Planning',
    'process.step.2.desc': 'Create a roadmap for success',
    'process.step.3.title': 'Development',
    'process.step.3.desc': 'Build with expert guidance',
    'process.step.4.title': 'Defense',
    'process.step.4.desc': 'Present with confidence',
  },
  ar: {
    home: 'الرئيسية',
    students: 'الطلاب',
    business: 'الشركات',
    portfolio: 'المعرض',
    contact: 'اتصل بنا',
    getStarted: 'ابدأ الآن',
    startProject: 'ابدأ مشروعك',
    toggleTo: 'EN',

    // Index
    'hero.badge': 'تمكين الأفكار إلى واقع',
    'hero.headline': 'ابنِ. تعلّم. تنمَّ.',
    'hero.subline': 'من مشاريع التخرُّج إلى حلول الأعمال، نحوِّل أفكارك إلى برامج قوية. إرشاد متخصص للطلاب وحلول مبتكرة للشركات.',
    'cta.student': 'أنا طالب',
    'cta.business': 'أنا صاحب عمل',
    'students.explore': 'استكشف خدمات الطلاب',
    'business.explore': 'استكشف حلول الأعمال',
    scroll: 'مرر',

    // Stats
    'stats.projects': 'المشاريع المنفذة',
    'stats.clients': 'عملاء راضون',
    'stats.success': 'نسبة النجاح',
    'stats.support': 'الدعم',

    // Features
    'features.title': 'لماذا تختار ديفورا؟',
    'features.subline': 'نجمع بين التميّز الفني والدعم المخصّص لنقدّم نتائج متميزة لكل مشروع.',
    'feature.1.title': 'إرشاد متخصص',
    'feature.1.desc': 'احصل على إرشاد شخصي من محترفين ذوي خبرة',
    'feature.2.title': 'كود عالي الجودة',
    'feature.2.desc': 'حلول برمجية نظيفة، قابلة للصيانة والتوسع',
    'feature.3.title': 'دعم مستمر',
    'feature.3.desc': 'دعم دائم طوال رحلة مشروعك',
    'feature.4.title': 'تسليم سريع',
    'feature.4.desc': 'تطوير فعّال مع الالتزام بالمواعيد',

    // Two paths
    'two.title': 'طريقان، هدف واحد',
    'two.subline': 'سواء كنت طالبًا تعمل على مشروع التخرج أو صاحب عمل يبحث عن حلول برمجية، نحن هنا لدعمك.',

    // Student card
    'students.card.title': 'للطلاب',
    'students.card.desc': 'احصل على إرشاد متخصص لمشروع التخرج. من اختيار الفكرة إلى التحضير للمناقشة، ندعمك في كل خطوة.',
    'students.item.1': 'اختيار فكرة المشروع والتحقق منها',
    'students.item.2': 'تصميم النظام (UML، ERD)',
    'students.item.3': 'مراجعة الكود والإرشاد',
    'students.item.4': 'التحضير للعرض والمناقشة',

    // Business card
    'business.card.title': 'للشركات',
    'business.card.desc': 'حوّل عملك بحلول برمجية مخصّصة. نبني مواقع، تطبيقات، وأدوات أتمتة مصممة لاحتياجاتك.',
    'business.item.1': 'مواقع وتطبيقات ويب',
    'business.item.2': 'تطبيقات موبايل',
    'business.item.3': 'أنظمة إدارة',
    'business.item.4': 'أتمتة مدعومة بالذكاء الاصطناعي',

    // Business page
    'business.badge': 'لأصحاب الأعمال',
    'business.title': 'حلول برمجية تُنَمّي عملك',
    'business.subline': 'من المحلات المحلية إلى المؤسسات النامية، نبني حلولًا برمجية مخصّصة تساعدك على العمل بذكاء أكبر، البيع أكثر، والتوسع بسرعة.',
    'business.cta.quote': 'احصل على عرض سعر مجاني',
    'business.cta.contact': 'اتصل للحصول على الأسعار',

    'business.benefit.1.title': 'حسّن الكفاءة',
    'business.benefit.1.desc': 'أتمتة المهام المتكررة وتبسيط العمليات',
    'business.benefit.2.title': 'آمن وموثوق',
    'business.benefit.2.desc': 'أمان على مستوى المؤسسات وتوافر 99.9%',
    'business.benefit.3.title': 'التوسع معك',
    'business.benefit.3.desc': 'حلول تنمو مع نمو عملك',

    'business.services.title': 'حلولنا',
    'business.services.subline': 'حلول برمجية شاملة مصمّمة لحل تحديات الأعمال الحقيقية وفتح فرص جديدة.',

    'business.industries.title': 'الصناعات التي نخدمها',
    'business.industries.subline': 'نعمل مع شركات عبر صناعات متعددة، مقدمين حلولًا مصمّمة لتحدياتها الفريدة.',

    'business.process.title': 'عملية العمل',
    'business.process.subline': 'منهجية مثبتة تضمن تسليم مشروعك في الوقت المحدد، وضمن الميزانية، مع تجاوز التوقعات.',
    'business.process.step.1.title': 'الاكتشاف',
    'business.process.step.1.desc': 'فهم احتياجات عملك',
    'business.process.step.2.title': 'التصميم',
    'business.process.step.2.desc': 'إنشاء الحل المثالي',
    'business.process.step.3.title': 'التطوير',
    'business.process.step.3.desc': 'البناء بجودة وسرعة',
    'business.process.step.4.title': 'التسليم',
    'business.process.step.4.desc': 'الإطلاق والدعم المستمر',

    // Students page
    'students.badge': 'لطلاب الجامعة',
    'students.title': 'إرشاد مشروع التخرج',
    'students.subline': 'احصل على إرشاد متخصص لتحويل مشروع التخرج إلى نجاح. ندعمك في كل مرحلة مع ضمان اكتسابك للمهارات كمطور.',
    'students.cta.contact': 'اتصل للحصول على الأسعار',

    'students.benefit.1.title': 'تعلّم أثناء البناء',
    'students.benefit.1.desc': 'اكتسب مهارات عملية أثناء العمل على مشروعك',
    'students.benefit.2.title': 'نزاهة أكاديمية',
    'students.benefit.2.desc': 'إرشاد أخلاقي 100% يدعم تعلمك',
    'students.benefit.3.title': 'إرشاد فردي',
    'students.benefit.3.desc': 'انتباه شخصي من مطورين ذوي خبرة',

    'students.services.title': 'دعم كامل لمشروعك',
    'students.services.subline': 'من الفكرة الأولى إلى الدفاع النهائي، نقدّم إرشادًا شاملاً مُكيّفًا حسب احتياجاتك.',

    'process.title': 'كيف نعمل',
    'process.subline': 'نهج بسيط ومنظم لمساعدتك على النجاح في مشروع التخرج.',
    'process.step.1.title': 'الاستشارة',
    'process.step.1.desc': 'نناقش أفكارك وأهدافك',
    'process.step.2.title': 'التخطيط',
    'process.step.2.desc': 'إنشاء خارطة طريق للنجاح',
    'process.step.3.title': 'التطوير',
    'process.step.3.desc': 'بناء المشروع مع إرشاد متخصص',
    'process.step.4.title': 'المناظرة',
    'process.step.4.desc': 'اعرض مشروعك بثقة',

    'form.name': 'الاسم الكامل *',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'الهاتف *',

    // Footer
    'footer.tagline': 'تمكين الطلاب والشركات بحلول برمجية مبتكرة. ابنِ. تعلّم. تنمَّ.',
    'footer.product': 'المنتج',
    'footer.forStudents': 'للطلاب',
    'footer.forBusiness': 'للشركات',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
  },
};

export const t = (key: string, lang: Lang) => {
  return translations[lang]?.[key] ?? translations['en'][key] ?? key;
};

export const availableLangs: Lang[] = ['en', 'ar'];