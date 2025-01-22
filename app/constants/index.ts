import {
    people01,
    people02,
    people03,
    facebook,
    instagram,
    linkedin,
    twitter,
    airbnb,
    binance,
    coinbase,
    dropbox,
    send,
    shield,
    star,
  } from "../../public";
  
  export const navLinks = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "test",
      title: "Test",
    },
    {
      id: "product",
      title: "Product",
    },
    {
      id: "customers",
      title: "Customers",
    },
    {
      id: "login",
      title: "Login",
      href: "/dashboard/home"
    },
  ];
  
  export const features = [
    {
      id: "feature-1",
      icon: star,
      title: "Effizienz steigern",
      content: "Automatisierte Prozesse sparen Zeit und reduzieren Fehler – für maximale Produktivität.",
    },
    {
      id: "feature-2",
      icon: shield,
      title: "Daten zentralisieren",
      content: "Alles an einem Ort: Kundenkontakte, Projekte und Berichte für mehr Übersichtlichkeit.",
    },
    {
      id: "feature-3",
      icon: send,
      title: "Zusammenarbeit verbessern",
      content: "Optimierte Kommunikation und klare Aufgabenverteilung fördern reibungslose Teamarbeit.",
    },
    
  ];
  
  export const feedback = [
    {
      id: "feedback-1",
      content:
        "Das CRM optimiert unsere Abläufe perfekt. Unsere Produktivität ist gestiegen, und die automatische Dokumentation erleichtert den Alltag enorm.",
      name: "Herman Jensen",
      title: "Gründer",
      img: people01,
    },
    {
      id: "feedback-2",
      content:
        "Seit der Einführung des CRMs läuft alles strukturierter. Wir sparen Zeit und vermeiden Fehler – ein großer Gewinn für unser Unternehmen.",
      name: "Steve Mark",
      title: "Gründer",
      img: people02,
    },
    {
      id: "feedback-3",
      content:
        "Dieses CRM hat unsere Arbeit effizienter gemacht. Automatische Aufgabenverteilung und klare Prozesse sparen uns täglich Zeit. Absolut empfehlenswert!",
      name: "Kenn Gallagher",
      title: "Gründer",
      img: people03,
    },
  ];
  
  export const stats = [
    {
      id: "stats-1",
      title: "Benutzer",
      value: "250+",
    },
    {
      id: "stats-2",
      title: "Unternehmen",
      value: "20+",
    },
    {
      id: "stats-3",
      title: "Platzhalter",
      value: "23%",
    },
  ];
  
  export const footerLinks = [
    {
      title: "Nutzvolle Links",
      links: [
        {
          name: "Inhalt",
          link: "https://www.asoplus.com/content/",
        },
        {
          name: "Wie es funktioniert",
          link: "https://www.asop.com/how-it-works/",
        },
        {
          name: "Erstellen",
          link: "https://www.asoplus.com/create/",
        },
        {
          name: "Entdecken",
          link: "https://www.asoplus.com/explore/",
        },
        {
          name: "AGB",
          link: "https://www.asoplus.com/terms-and-services/",
        },
        
      ],
    },
    {
      title: "Community",
      links: [
        {
          name: "Hilfe-Center",
          link: "https://www.asoplus.com/help-center/",
        },
        {
          name: "Partner",
          link: "https://www.asoplus.com/partners/",
        },
        {
          name: "Vorschläge",
          link: "https://www.asoplus.com/suggestions/",
        },
        {
          name: "Blog",
          link: "https://www.asoplus.com/blog/",
        },
        {
          name: "Newsletter",
          link: "https://www.asoplus.com/newsletters/",
        },
        
      ],
    },
    {
      title: "Partner",
      links: [
        {
          name: "Unser Partner",
          link: "https://www.asoplus.com/our-partner/",
        },
        {
          name: "Partner werden",
          link: "https://www.asoplus.com/become-a-partner/",
        },
        
      ],
    },
  ];
  
  export const socialMedia = [
    {
      id: "social-media-1",
      icon: instagram,
      link: "https://www.instagram.com/",
    },
    {
      id: "social-media-2",
      icon: facebook,
      link: "https://www.facebook.com/",
    },
    {
      id: "social-media-3",
      icon: twitter,
      link: "https://www.twitter.com/",
    },
    {
      id: "social-media-4",
      icon: linkedin,
      link: "https://www.linkedin.com/",
    },
  ];
  
  export const clients = [
    {
      id: "client-1",
      logo: airbnb,
      bgImg: "../assets/airbnb-small.png"
    },
    {
      id: "client-2",
      logo: binance,
      bgImg: "../assets/binance-small.png"
    },
    {
      id: "client-3",
      logo: coinbase,
      bgImg: "../assets/binance-small.png"
    },
    {
      id: "client-4",
      logo: dropbox,
      bgImg: "../assets/dropbox-small.png"
    },
  ];