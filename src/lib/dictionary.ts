import type { Locale } from "./config";

export type Dictionary = {
  nav: {
    story: string;
    collections: string;
    ingredients: string;
    joinCircle: string;
    cart: string;
  };
  hero: {
    eyebrow: string;
    tagline: string;
    ctaScroll: string;
  };
  manifesto: {
    eyebrow: string;
    heading: string;
    body: string;
    imageCaption: string;
  };
  collections: {
    eyebrow: string;
    heading: string;
    subheading: string;
    fragrance: { name: string; description: string };
    skin: { name: string; description: string };
    adornment: { name: string; description: string };
    launchTag: string;
    exploreAtelier: string;
  };
  ingredients: {
    eyebrow: string;
    heading: string;
    body: string;
    items: Array<{ name: string; origin: string }>;
  };
  signup: {
    eyebrow: string;
    heading: string;
    body: string;
    emailLabel: string;
    emailPlaceholder: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    consent: string;
  };
  footer: {
    tagline: string;
    based: string;
    rights: string;
  };
  meta: {
    title: string;
    description: string;
  };
  shop: {
    // Atelier landing
    heading: string;
    subheading: string;
    filterAll: string;
    filterFragrance: string;
    filterSkin: string;
    filterAdornment: string;
    empty: string;
    // Product card + PDP
    featured: string;
    soldOut: string;
    lowStock: string; // "{n} left"
    selectSize: string;
    selectVolume: string;
    addToBag: string;
    preOrder: string;
    shipsIn: string;
    reservationNote: string;
    // PDP sections
    productDetails: string;
    olfactoryNotes: string;
    ingredients: string;
    origin: string;
    material: string;
    weight: string;
    madeIn: string;
    otherPieces: string;
    backToAtelier: string;
  };
  cart: {
    title: string;
    close: string;
    empty: string;
    browseAtelier: string;
    remove: string;
    subtotal: string;
    shippingNote: string;
    checkout: string;
  };
  checkout: {
    heading: string;
    contactSection: string;
    shippingSection: string;
    paymentSection: string;
    orderSummary: string;
    emailLabel: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    cardName: string;
    subtotal: string;
    shipping: string;
    shippingFree: string;
    total: string;
    placeOrder: string;
    placing: string;
    mockNote: string;
    backToCart: string;
  };
  confirmation: {
    heading: string;
    body: string;
    orderNumber: string;
    continueShopping: string;
    supportNote: string;
  };
};

const en: Dictionary = {
  nav: {
    story: "Story",
    collections: "Atelier",
    ingredients: "Provenance",
    joinCircle: "Join the Circle",
    cart: "Bag",
  },
  hero: {
    eyebrow: "Est. 2026 · São Paulo × Dubai",
    tagline:
      "A modern atelier of scent, skin and adornment.\nRooted in Brazilian craft. Composed for the Gulf.",
    ctaScroll: "Scroll",
  },
  manifesto: {
    eyebrow: "Manifesto",
    heading:
      "Between the sensory abundance of Brazil and the perfumery heritage of the Gulf.",
    body: "NŪR is where two cultures of adornment meet — expressed with the restraint of contemporary luxury. Every object is composed as a single gesture: nothing more than needed, nothing less than intended.",
    imageCaption: "Raw material · São Paulo studio",
  },
  collections: {
    eyebrow: "The Atelier",
    heading: "Three disciplines. One quiet standard.",
    subheading:
      "The house opens with three chapters, each shaped in collaboration with makers in São Paulo, Grasse and Istanbul.",
    fragrance: {
      name: "Fragrance",
      description:
        "A small library of unisex oil compositions — no alcohol, halal-compatible. Orchestrated around Amazonian woods, oud and cold citrus.",
    },
    skin: {
      name: "Skin",
      description:
        "Clean formulations built on Cerrado biome actives, formulated to GCC halal standards.",
    },
    adornment: {
      name: "Adornment",
      description:
        "Demi-fine jewelry — architectural, unadorned, made in recycled 18k gold and Brazilian sterling.",
    },
    launchTag: "Autumn 2026",
    exploreAtelier: "Enter the atelier",
  },
  ingredients: {
    eyebrow: "Provenance",
    heading: "Four raw materials. Four origins.",
    body: "Each formulation begins with a single ingredient traced to its source — the Cerrado, the Amazon, the Atlantic Forest, the Serra da Mantiqueira. We disclose the origin because we want it to matter.",
    items: [
      { name: "Pau-brasil", origin: "Bahia · Atlantic Forest" },
      { name: "Raw amber resin", origin: "Amazonas · Terra Firme" },
      { name: "Ipê blossom", origin: "Cerrado · Central plateau" },
      { name: "Rock quartz", origin: "Minas Gerais · Mantiqueira" },
    ],
  },
  signup: {
    eyebrow: "The Circle",
    heading: "Be among the first.",
    body: "Reserve early access to the launch edition. No noise — a single message when the doors open.",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    whatsappLabel: "WhatsApp (optional)",
    whatsappPlaceholder: "+971 5X XXX XXXX",
    submit: "Request an invitation",
    submitting: "Sending…",
    successTitle: "You are on the list.",
    successBody: "We will write once — when NŪR opens.",
    errorTitle: "Something went wrong.",
    errorBody: "Please try again in a moment.",
    consent:
      "By subscribing you agree to receive one launch message. No spam, ever.",
  },
  footer: {
    tagline: "A house of quiet luxury.",
    based: "Based between São Paulo and Dubai",
    rights: "All rights reserved.",
  },
  meta: {
    title: "NŪR — A modern atelier of scent, skin and adornment",
    description:
      "NŪR is a contemporary luxury house composing fragrance, skin and adornment for the Gulf. Rooted in Brazilian craft. Launching autumn 2026.",
  },
  shop: {
    heading: "The Atelier",
    subheading:
      "Eight objects, three disciplines. Each piece composed by hand, in small batches, from single-origin ingredients.",
    filterAll: "All",
    filterFragrance: "Fragrance",
    filterSkin: "Skin",
    filterAdornment: "Adornment",
    empty: "No pieces in this chapter yet.",
    featured: "Signature",
    soldOut: "Sold out",
    lowStock: "Only {n} left",
    selectSize: "Size",
    selectVolume: "Volume",
    addToBag: "Add to bag",
    preOrder: "Pre-order",
    shipsIn: "Ships in 4–6 weeks",
    reservationNote:
      "You are joining the first production run. Your card is charged today; each piece is composed and dispatched from our São Paulo studio within four to six weeks.",
    productDetails: "Details",
    olfactoryNotes: "Notes",
    ingredients: "Ingredients",
    origin: "Origin",
    material: "Material",
    weight: "Weight",
    madeIn: "Made in",
    otherPieces: "Other pieces from the atelier",
    backToAtelier: "Back to atelier",
  },
  cart: {
    title: "Your bag",
    close: "Close",
    empty: "Your bag is empty.",
    browseAtelier: "Enter the atelier →",
    remove: "Remove",
    subtotal: "Subtotal",
    shippingNote:
      "Complimentary shipping to the GCC. Taxes and duties calculated at checkout.",
    checkout: "Checkout",
  },
  checkout: {
    heading: "Checkout",
    contactSection: "Contact",
    shippingSection: "Shipping address",
    paymentSection: "Payment",
    orderSummary: "Order",
    emailLabel: "Email",
    firstName: "First name",
    lastName: "Last name",
    address1: "Address",
    address2: "Apartment, suite (optional)",
    city: "City",
    postalCode: "Postal code",
    country: "Country / Emirate",
    phone: "Phone",
    cardNumber: "Card number",
    cardExpiry: "MM / YY",
    cardCvc: "CVC",
    cardName: "Name on card",
    subtotal: "Subtotal",
    shipping: "Shipping",
    shippingFree: "Complimentary",
    total: "Total",
    placeOrder: "Place order",
    placing: "Placing order…",
    mockNote:
      "This is a preview environment. No payment will be charged and no order will be shipped.",
    backToCart: "← Back to bag",
  },
  confirmation: {
    heading: "Thank you.",
    body: "Your order has been received. A confirmation has been sent to your email.",
    orderNumber: "Order",
    continueShopping: "Return to the atelier",
    supportNote: "Questions? Write to hello@nur-atelier.com",
  },
};

const ar: Dictionary = {
  nav: {
    story: "الحكاية",
    collections: "الدار",
    ingredients: "الأصل",
    joinCircle: "انضم إلى الدائرة",
    cart: "الحقيبة",
  },
  hero: {
    eyebrow: "تأسست ٢٠٢٦ · ساو باولو × دبي",
    tagline:
      "دارٌ معاصرة للعطر والعناية والحُلي.\nمتجذّرة في الحرفة البرازيلية. مُصاغة للخليج.",
    ctaScroll: "اسحب",
  },
  manifesto: {
    eyebrow: "البيان",
    heading:
      "بين وفرة الحواس البرازيلية وإرث العطور الخليجي.",
    body: "نور هي حيث تلتقي ثقافتان للجمال والزينة — يُعبَّر عنه بضبط الترف المعاصر. كل قطعة تُصاغ كإيماءة واحدة: لا شيء يزيد عن الحاجة، ولا يقلّ عن القصد.",
    imageCaption: "مادة خام · مرسم ساو باولو",
  },
  collections: {
    eyebrow: "الدار",
    heading: "ثلاث حِرَف. معيار هادئ واحد.",
    subheading:
      "تُفتَتح الدار بثلاثة فصول، صيغ كلٌّ منها بالتعاون مع صنّاع في ساو باولو وغراس واسطنبول.",
    fragrance: {
      name: "العطر",
      description:
        "مكتبة صغيرة من التراكيب الزيتية المحايدة — خالية من الكحول، متوافقة مع الحلال. منسوجة حول أخشاب الأمازون والعود والحمضيات الباردة.",
    },
    skin: {
      name: "العناية",
      description:
        "تركيبات نقية مبنية على مكوّنات نشطة من السيرادو، مُصاغة وفق معايير الحلال الخليجية.",
    },
    adornment: {
      name: "الحُلي",
      description:
        "مجوهرات نصف راقية — معمارية، خالصة، من ذهب معاد تدويره عيار ١٨ وفضة برازيلية.",
    },
    launchTag: "خريف ٢٠٢٦",
    exploreAtelier: "ادخل الدار",
  },
  ingredients: {
    eyebrow: "الأصل",
    heading: "أربع مواد خام. أربعة أصول.",
    body: "تبدأ كل تركيبة بمكوّن واحد يُتتبَّع إلى مصدره — السيرادو، الأمازون، الغابة الأطلسية، سلسلة مانتيكيرا. نُفصح عن الأصل لأننا نريد له أن يعني شيئًا.",
    items: [
      { name: "خشب باو-برازيل", origin: "باهيا · الغابة الأطلسية" },
      { name: "راتنج العنبر الخام", origin: "أمازوناس · الأرض الصلبة" },
      { name: "زهرة الإيبي", origin: "السيرادو · الهضبة الوسطى" },
      { name: "كوارتز صخري", origin: "ميناس جيرايس · مانتيكيرا" },
    ],
  },
  signup: {
    eyebrow: "الدائرة",
    heading: "كن من الأوائل.",
    body: "احجز وصولاً مبكرًا لإصدار الافتتاح. بلا ضجيج — رسالة واحدة حين تُفتح الأبواب.",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    whatsappLabel: "واتساب (اختياري)",
    whatsappPlaceholder: "+971 5X XXX XXXX",
    submit: "اطلب دعوة",
    submitting: "جارٍ الإرسال…",
    successTitle: "أنت على القائمة.",
    successBody: "سنكتب مرة واحدة — حين تُفتح نور.",
    errorTitle: "حدث خطأ ما.",
    errorBody: "يرجى المحاولة بعد لحظة.",
    consent:
      "بالاشتراك فإنك توافق على استلام رسالة إطلاق واحدة. بلا رسائل مزعجة أبدًا.",
  },
  footer: {
    tagline: "دارٌ للترف الهادئ.",
    based: "بين ساو باولو ودبي",
    rights: "جميع الحقوق محفوظة.",
  },
  meta: {
    title: "نور — دارٌ معاصرة للعطر والعناية والحُلي",
    description:
      "نور هي دارُ ترف معاصرة تصوغ العطر والعناية والحُلي للخليج. متجذّرة في الحرفة البرازيلية. الإطلاق خريف ٢٠٢٦.",
  },
  shop: {
    heading: "الدار",
    subheading:
      "ثمانية أشياء، ثلاث حِرَف. كل قطعة مصنوعة يدوياً، في دفعات صغيرة، من مكوّنات ذات أصل واحد.",
    filterAll: "الكل",
    filterFragrance: "العطر",
    filterSkin: "العناية",
    filterAdornment: "الحُلي",
    empty: "لا توجد قطع في هذا الفصل بعد.",
    featured: "التوقيع",
    soldOut: "نفدت الكمية",
    lowStock: "بقي {n} فقط",
    selectSize: "المقاس",
    selectVolume: "الحجم",
    addToBag: "أضف إلى الحقيبة",
    preOrder: "احجز مسبقاً",
    shipsIn: "يُشحن خلال ٤ إلى ٦ أسابيع",
    reservationNote:
      "أنت تنضم إلى دفعة الإنتاج الأولى. يُحصَّل الدفع من بطاقتك اليوم؛ كل قطعة تُصاغ وتُرسل من مرسمنا في ساو باولو خلال أربعة إلى ستة أسابيع.",
    productDetails: "التفاصيل",
    olfactoryNotes: "المكوّنات العطرية",
    ingredients: "المكوّنات",
    origin: "الأصل",
    material: "المادة",
    weight: "الوزن",
    madeIn: "صُنع في",
    otherPieces: "قطع أخرى من الدار",
    backToAtelier: "العودة إلى الدار",
  },
  cart: {
    title: "حقيبتك",
    close: "إغلاق",
    empty: "حقيبتك فارغة.",
    browseAtelier: "ادخل الدار →",
    remove: "إزالة",
    subtotal: "المجموع الفرعي",
    shippingNote:
      "شحن مجاني إلى دول الخليج. تُحسب الضرائب والرسوم عند الدفع.",
    checkout: "الدفع",
  },
  checkout: {
    heading: "الدفع",
    contactSection: "التواصل",
    shippingSection: "عنوان الشحن",
    paymentSection: "الدفع",
    orderSummary: "الطلب",
    emailLabel: "البريد الإلكتروني",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    address1: "العنوان",
    address2: "شقة، جناح (اختياري)",
    city: "المدينة",
    postalCode: "الرمز البريدي",
    country: "الدولة / الإمارة",
    phone: "الهاتف",
    cardNumber: "رقم البطاقة",
    cardExpiry: "شهر / سنة",
    cardCvc: "CVC",
    cardName: "الاسم على البطاقة",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    shippingFree: "مجاني",
    total: "المجموع",
    placeOrder: "إتمام الطلب",
    placing: "جارٍ إتمام الطلب…",
    mockNote:
      "هذه بيئة معاينة. لن يتم تحصيل أي دفعة ولن يتم شحن أي طلب.",
    backToCart: "← العودة إلى الحقيبة",
  },
  confirmation: {
    heading: "شكراً لك.",
    body: "لقد استُلم طلبك. تم إرسال تأكيد إلى بريدك الإلكتروني.",
    orderNumber: "الطلب",
    continueShopping: "العودة إلى الدار",
    supportNote: "أسئلة؟ اكتب إلى hello@nur-atelier.com",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
