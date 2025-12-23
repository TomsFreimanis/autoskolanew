
export type Language = 'LV' | 'EN' | 'RU';

export interface TranslationSchema {
  nav: {
    about: string;
    video: string;
    estudies: string;
    pricing: string;
    instructors: string;
    reviews: string;
    contacts: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge: string;
  };
  about: {
    title: string;
    text: string;
    highlight: string;
  };
  videoGuide: {
    title: string;
    subtitle: string;
  };
  social: {
    title: string;
    subtitle: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    cta: string;
    items: Array<{
      name: string;
      text: string;
      date: string;
    }>;
  };
  estudies: {
    title: string;
    subtitle: string;
    badge: string;
    intro: string;
    points: string[];
    cta: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    theory: string;
    theoryPrice: string;
    manual: string;
    manualPrice: string;
    auto: string;
    autoPrice: string;
    exam: string;
    examDetail: string;
  };
  instructors: {
    title: string;
    subtitle: string;
    list: Array<{
      name: string;
      role: string;
    }>;
  };
  contact: {
    title: string;
    formTitle: string;
    formSubtitle: string;
    formName: string;
    formPhone: string;
    formCode: string;
    formEmail: string;
    formComment: string;
    formSubmit: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  LV: {
    nav: {
      about: 'Par mums',
      video: 'Ceļvedis',
      estudies: 'E-Studijas',
      pricing: 'Cenas',
      instructors: 'Instruktori',
      reviews: 'Atsauksmes',
      contacts: 'Kontakti'
    },
    hero: {
      title: 'Kļūsti par autovadītāju ar pārliecību.',
      subtitle: 'Modernākā autoskola Rīgā. Pieredze. Profesionalitāte. Atbildība.',
      ctaPrimary: 'Pieteikties kursam',
      ctaSecondary: 'Uzzināt vairāk',
      badge: 'Premium apmācība'
    },
    about: {
      title: 'Par mums',
      text: 'Pieredze, profesionalitāte, atbildība un moderna pieeja mācībām ir mūsu vērtību pamatā. Piedāvājam B kategorijas auto vadīšanas apmācību un teoriju. Kā arī pie mūsu instruktoriem iespējams atjaunot aizmirstas braukšanas iemaņas un apgūt profesionālas parkošanās prasmes. Pats galvenais – mēs vienmēr esam labā garastāvoklī un apņēmības pilni palīdzēt Tev iegūt tiesības vai atsvaidzināt braukšanas iemaņas.',
      highlight: 'Mēs vienmēr esam labā garastāvoklī!'
    },
    videoGuide: {
      title: 'Apmācību Video',
      subtitle: 'Praktiski padomi un manevri, kas palīdzēs Tev sagatavoties CSDD eksāmenam un drošai braukšanai ikdienā.'
    },
    social: {
      title: 'Esi lietas kursā',
      subtitle: 'Sekojiet mums sociālajos tīklos un uzziniet pirmais par akcijām, jaunumiem un noderīgiem braukšanas padomiem!'
    },
    reviews: {
      title: 'Studentu Atsauksmes',
      subtitle: 'Vairāk nekā 500+ pozitīvu atsauksmju mūsu Facebook lapā.',
      cta: 'Skatīt visas atsauksmes Facebook',
      items: [
        { name: "Laura Bērziņa", text: "Lieliska autoskola! Teorija bija interesanta, un instruktors Gatis ir vienkārši zelta cilvēks. Noliku ar pirmo reizi!", date: "Pirms 2 nedēļām" },
        { name: "Mārtiņš K.", text: "E-studiju sistēma ir ļoti ērta. Varēju mācīties vakaros pēc darba. Kvalitatīvi video materiāli un skaidri testi.", date: "Pirms mēneša" },
        { name: "Kristīne Saulīte", text: "Pārgāju no citas autoskolas un nenožēloju. Šeit attieksme ir pavisam citā līmenī. Paldies par pacietību!", date: "Pirms 3 mēnešiem" }
      ]
    },
    estudies: {
      title: 'E-Studijas',
      subtitle: 'Apgūstiet CSN jebkurā vietā un laikā!',
      badge: 'Latvijā unikāla iespēja',
      intro: 'Piedāvājam jaunu un Latvijā unikālu iespēju – E-Studijas. Apgūstiet ceļu satiksmes noteikumus (CSN) jebkurā vietā un jebkurā laikā.',
      points: [
        'Nav jāgaida mācību grupa – sāc uzreiz.',
        'Skaidrojoši video un testi pašmācībai.',
        'Piekļuve mācību materiāliem 24/7.',
        '3 nodarbības kopā ar pasniedzēju klasē.'
      ],
      cta: 'Pieteikties online'
    },
    pricing: {
      title: 'B kategorijas Cenas',
      subtitle: 'Caurspīdīgas izmaksas. Nav slēptu maksājumu.',
      theory: 'Teorijas kurss un dokumenti',
      theoryPrice: '59 €',
      manual: 'Braukšana (90 min) - Mehānika',
      manualPrice: '45 €',
      auto: 'Braukšana (90 min) - Automāts',
      autoPrice: '45 €',
      exam: 'Teorijas eksāmens',
      examDetail: 'Pirmās 2 reizes – bezmaksas'
    },
    instructors: {
      title: 'Mūsu instruktori',
      subtitle: 'Profesionāļi, kuri palīdzēs Tev sasniegt mērķi ar smaidu.',
      list: [
        { name: 'Jānis Neimanis', role: 'Instruktors / pasniedzējs' },
        { name: 'Gatis Vaitovičs', role: 'Instruktors / pasniedzējs' },
        { name: 'Miks Felsbergs', role: 'Instruktors / pasniedzējs' },
        { name: 'Kaspars Sēja', role: 'Instruktors' }
      ]
    },
    contact: {
      title: 'Sazinies ar mums',
      formTitle: 'Pieteikties tagad',
      formSubtitle: 'Aizpildi formu un mēs sazināsimies!',
      formName: 'Vārds *',
      formPhone: 'Telefona nr. *',
      formCode: 'Personas koda pirmā daļa',
      formEmail: 'E-pasts *',
      formComment: 'Komentārs',
      formSubmit: 'Sūtīt'
    }
  },
  EN: {
    nav: { about: 'About', video: 'Videos', estudies: 'E-Studies', pricing: 'Pricing', instructors: 'Staff', reviews: 'Reviews', contacts: 'Contact' },
    hero: { title: 'Drive with Confidence.', subtitle: 'Modern driving school in Riga.', ctaPrimary: 'Apply Now', ctaSecondary: 'Learn More', badge: 'Premium Training' },
    about: { title: 'About Us', text: 'Professionalism, responsibility and modern approach...', highlight: 'Always in a good mood!' },
    videoGuide: { title: 'Training Videos', subtitle: 'Practical tips to help you pass your exam.' },
    social: { title: 'Stay Connected', subtitle: 'Follow us on social media for the latest updates and tips!' },
    reviews: { title: 'Student Reviews', subtitle: '500+ reviews on our Facebook page.', cta: 'View on Facebook', items: [] },
    estudies: { title: 'E-Studies', subtitle: 'Learn anywhere!', badge: 'Unique Opportunity', intro: 'New system in Latvia.', points: ['Start now', 'Video lessons', '24/7 access', '3 class lessons'], cta: 'Apply Online' },
    pricing: { title: 'Pricing', subtitle: 'Transparent costs.', theory: 'Theory and docs', theoryPrice: '59 €', manual: 'Manual (90 min)', manualPrice: '45 €', auto: 'Auto (90 min)', autoPrice: '45 €', exam: 'Exam', examDetail: 'First 2 free' },
    instructors: { title: 'Instructors', subtitle: 'Professionals.', list: [] },
    contact: { title: 'Contact', formTitle: 'Apply', formSubtitle: 'Fill the form', formName: 'Name', formPhone: 'Phone', formCode: 'ID Part 1', formEmail: 'Email', formComment: 'Comment', formSubmit: 'Submit' }
  },
  RU: {
    nav: { about: 'О нас', video: 'Видео', estudies: 'Э-обучение', pricing: 'Цены', instructors: 'Инструкторы', reviews: 'Отзывы', contacts: 'Контакты' },
    hero: { title: 'Станьте водителем.', subtitle: 'Современная автошкола в Риге.', ctaPrimary: 'Записаться', ctaSecondary: 'Подробнее', badge: 'Премиум обучение' },
    about: { title: 'О нас', text: 'Опыт и профессионализм...', highlight: 'Всегда на позитиве!' },
    videoGuide: { title: 'Видео уроки', subtitle: 'Практические советы для экзамена.' },
    social: { title: 'Будьте в курсе', subtitle: 'Следите за нами в соцсетях!' },
    reviews: { title: 'Отзывы', subtitle: 'Более 500+ отзывов на Facebook.', cta: 'Читать на Facebook', items: [] },
    estudies: { title: 'Э-обучение', subtitle: 'Учись везде!', badge: 'Уникально', intro: 'Новая система обучения.', points: ['Начни сейчас', 'Видео уроки', 'Доступ 24/7', '3 урока в классе'], cta: 'Записаться' },
    pricing: { title: 'Цены', subtitle: 'Прозрачно.', theory: 'Теория и документы', theoryPrice: '59 €', manual: 'Механика', manualPrice: '45 €', auto: 'Автомат', autoPrice: '45 €', exam: 'Экзамен', examDetail: 'Первые 2 бесплатно' },
    instructors: { title: 'Инструкторы', subtitle: 'Профи.', list: [] },
    contact: { title: 'Контакты', formTitle: 'Записаться', formSubtitle: 'Заполни форму', formName: 'Имя', formPhone: 'Телефон', formCode: 'ID', formEmail: 'Email', formComment: 'Комментарий', formSubmit: 'Отправить' }
  }
};
