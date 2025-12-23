
export const content = {
  brand: {
    name: "Rīgas Autoskola",
    legal: "SIA Rīgas Autoskola",
    tagline: "Tavas tiesības sākas šeit.",
    phone: "+371 263 88885",
    email: "info@rigasautoskola.lv",
    address: "Rīga, Latvija"
  },
  navigation: [
    { label: "B Kategorija", href: "#courses" },
    { label: "Cenas", href: "#pricing" },
    { label: "Instruktori", href: "#instructors" },
    { label: "Kontakti", href: "#contact" }
  ],
  hero: {
    title: "Kļūsti par autovadītāju ar pārliecību.",
    subtitle: "Modernākā apmācību sistēma Rīgā. Pieredze. Profesionalitāte. Atbildība.",
    primaryCTA: "Pieteikties tagad",
    secondaryCTA: "Skatīt cenas"
  },
  courses: [
    {
      id: "b-cat",
      title: "B Kategorija",
      price: "59 €",
      description: "Teorijas kurss un dokumentu noformēšana. Modernas automašīnas un elastīgs grafiks.",
      features: ["11 teorijas lekcijas", "CSDD dokumentācija", "Online mācību vide"]
    },
    {
      id: "practical",
      title: "Praktiskā braukšana",
      price: "no 25 €",
      description: "Individuālas nodarbības ar pieredzējušiem instruktoriem. 90 minūšu intensīva apmācība.",
      features: ["Jauns autoparks", "Eksāmena maršruti", "Individuāla pieeja"]
    },
    {
      id: "parking",
      title: "Parkošanās meistarklase",
      price: "pēc pieprasījuma",
      description: "Pilnveido savas parkošanās prasmes pilsētas apstākļos ar profesionālu atbalstu.",
      features: ["Paralēlā parkošanās", "Atpakaļgaita", "Pārliecība stāvvietās"]
    }
  ],
  instructors: [
    { name: "Jānis Neimanis", role: "Instruktors / Pasniedzējs", bio: "Vairāk nekā 15 gadu pieredze, sagatavojot topošos vadītājus CSDD eksāmeniem." },
    { name: "Gatis Vaitovičs", role: "Instruktors / Pasniedzējs", bio: "Specializējas mierīgā un analītiskā apmācības procesā." },
    { name: "Miks Felsbergs", role: "Instruktors / Pasniedzējs", bio: "Mūsdienīga pieeja un padziļinātas zināšanas par drošu braukšanu." },
    { name: "Kaspars Sēja", role: "Instruktors", bio: "Praktisko iemaņu eksperts ar augstu sekmības rādītāju." }
  ],
  process: [
    { step: "01", title: "Reģistrācija", desc: "Aizpildi formu un mēs sazināsimies 15 minūšu laikā." },
    { step: "02", title: "Teorija", desc: "Apgūsti noteikumus klātienē vai ērtā online vidē." },
    { step: "03", title: "Braukšana", desc: "Sāc braukt ar jaunu Audi vai Volkswagen modeli." },
    { step: "04", title: "Tiesības", desc: "Nokārto eksāmenu un dodies ceļā ar pārliecību!" }
  ]
};
