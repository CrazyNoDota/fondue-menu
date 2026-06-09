export type Lang = "ru" | "kz" | "en";

type L = { ru: string; kz: string; en: string };

export type MenuItem = {
  name: string;
  price: string; // formatted without currency symbol, e.g. "3 200" or "950 / 1 350"
  tag?: L;
  note?: string;
  image?: string; // optional dedicated photo; otherwise a category fallback is used
  desc?: L; // optional short description shown on the dish detail page
};

export type MenuCategory = {
  id: string;
  title: L;
  items: MenuItem[];
};

const HIT: L = { ru: "хит", kz: "хит", en: "top" };
const SPICY: L = { ru: "остро", kz: "ащы", en: "spicy" };
const CHEF: L = { ru: "от шефа", kz: "шефтен", en: "chef’s" };

export const LANGS: { code: Lang; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "kz", label: "ҚАЗ" },
  { code: "en", label: "EN" },
];

export const MENU: MenuCategory[] = [
  {
    id: "salads",
    title: { ru: "Салаты", kz: "Салаттар", en: "Salads" },
    items: [
      {
        name: "Цезарь с курицей",
        price: "3 200",
        tag: HIT,
        image: "/img/caesar.jpg",
        desc: {
          ru: "Классический Цезарь с сочной курицей-гриль, хрустящими сухариками и пармезаном.",
          kz: "Грильде пісірілген тауық еті, қытырлақ кеспе нан мен пармезанмен классикалық Цезарь.",
          en: "Classic Caesar with grilled chicken, crisp croutons and parmesan.",
        },
      },
      { name: "Цезарь с креветками", price: "3 500" },
      { name: "Хрустящие баклажаны в кисло-сладком соусе", price: "2 750" },
      { name: "Греческий", price: "2 900" },
    ],
  },
  {
    id: "starters",
    title: { ru: "Закуски", kz: "Тіскебасарлар", en: "Starters" },
    items: [
      { name: "Жареные креветки", price: "3 300" },
      { name: "Хрустящие крылышки", price: "4 500", note: "1 кг" },
      { name: "Хрустящие крылышки", price: "2 750", note: "0,5 кг" },
      { name: "Наггетсы", price: "1 690" },
    ],
  },
  {
    id: "soups",
    title: { ru: "Супы", kz: "Сорпалар", en: "Soups" },
    items: [
      { name: "Суп лапша куриная", price: "1 650" },
      { name: "Чечевичный крем-суп", price: "1 450" },
      {
        name: "Рамён с курицей",
        price: "1 850",
        tag: HIT,
        image: "/img/ramen.jpg",
        desc: {
          ru: "Ароматный бульон, пшеничная лапша и нежная курица с традиционными топпингами.",
          kz: "Хош иісті сорпа, бидай кеспесі және дәстүрлі қоспалармен жұмсақ тауық еті.",
          en: "Fragrant broth, wheat noodles and tender chicken with classic toppings.",
        },
      },
      { name: "Рамён с говядиной", price: "2 250" },
      { name: "Том ям", price: "2 400", tag: SPICY },
      { name: "Шорпа из баранины", price: "2 450" },
    ],
  },
  {
    id: "mains",
    title: { ru: "Вторые блюда", kz: "Ыстық тағамдар", en: "Mains" },
    items: [
      { name: "Стейк Тибон", price: "2 900", tag: CHEF },
      {
        name: "Стейк Рибай",
        price: "2 900",
        tag: CHEF,
        image: "/img/steak.jpg",
        desc: {
          ru: "Сочный стейк рибай из мраморной говядины, приготовленный на углях до идеальной прожарки.",
          kz: "Көмірде піскен мраморлы сиыр етінен жасалған, мінсіз пісірілген шырынды рибай стейк.",
          en: "Juicy ribeye of marbled beef, char-grilled to the perfect doneness.",
        },
      },
      { name: "Томлёные говяжьи рёбрышки", price: "2 900" },
      { name: "Бефстроганов", price: "3 550" },
    ],
  },
  {
    id: "eastern",
    title: { ru: "Восточная кухня", kz: "Шығыс асханасы", en: "Eastern Cuisine" },
    items: [
      { name: "Куырдак с кониной", price: "3 200" },
      { name: "Куырдак с бараниной", price: "3 200" },
      { name: "Казан кебаб", price: "3 400", tag: HIT },
      { name: "Бешбармак", price: "3 850", tag: CHEF },
    ],
  },
  {
    id: "pasta",
    title: { ru: "Паста", kz: "Паста", en: "Pasta" },
    items: [
      { name: "Болоньезе", price: "2 850" },
      { name: "Феттучини с курицей и грибами", price: "2 550" },
    ],
  },
  {
    id: "pizza",
    title: { ru: "Пицца", kz: "Пицца", en: "Pizza" },
    items: [
      { name: "Маргарита", price: "2 550" },
      {
        name: "Пепперони",
        price: "3 200",
        tag: HIT,
        image: "/img/pizza.jpg",
        desc: {
          ru: "Тонкое тесто, пикантная пепперони и тянущаяся моцарелла из дровяной печи.",
          kz: "Жұқа қамыр, ащылау пепперони және отын пешінен шыққан созылмалы моцарелла.",
          en: "Thin crust, spicy pepperoni and stretchy mozzarella from the wood-fired oven.",
        },
      },
      { name: "Курица с грибами", price: "2 950" },
      { name: "Хачапури по-аджарски", price: "2 550" },
    ],
  },
  {
    id: "fastfood",
    title: { ru: "Фастфуд", kz: "Фаст фуд", en: "Fast Food" },
    items: [
      { name: "Двойной бургер с говяжьей котлетой", price: "1 900" },
      { name: "Двойной чизбургер с говяжьей котлетой", price: "1 900" },
      {
        name: "Qazyburger с казы",
        price: "1 900",
        tag: CHEF,
        image: "/img/burger.jpg",
        desc: {
          ru: "Фирменный бургер с домашней казы, говяжьей котлетой и соусом от шефа.",
          kz: "Үй қазысы, сиыр котлеті және шеф тұздығымен фирмалық бургер.",
          en: "Signature burger with house qazy, a beef patty and the chef’s own sauce.",
        },
      },
      { name: "Донер куриный", price: "1 850" },
      { name: "Донер с говядиной", price: "2 250" },
      { name: "Донер ассорти", price: "2 000" },
    ],
  },
  {
    id: "sides",
    title: { ru: "Гарниры и хлеб", kz: "Гарнирлер мен нан", en: "Sides & Bread" },
    items: [
      { name: "Картофель фри", price: "1 190" },
      { name: "Картофельные дольки", price: "1 190" },
      { name: "Рис", price: "850" },
      { name: "Овощи гриль", price: "1 450" },
      { name: "Лепёшка", price: "450" },
    ],
  },
  {
    id: "desserts",
    title: { ru: "Десерты", kz: "Тәттілер", en: "Desserts" },
    items: [{ name: "Десерты в ассортименте", price: "2 450" }],
  },
  {
    id: "sauces",
    title: { ru: "Соусы", kz: "Тұздықтар", en: "Sauces" },
    items: [
      { name: "Кетчуп", price: "650" },
      { name: "Сырный соус", price: "650" },
      { name: "Грибной соус", price: "650" },
      { name: "Барбекю", price: "650" },
      { name: "Тартар соус", price: "650" },
      { name: "Халапеньо", price: "650" },
    ],
  },
  {
    id: "hot",
    title: { ru: "Горячие напитки", kz: "Ыстық сусындар", en: "Hot Drinks" },
    items: [
      { name: "Зелёный чай", price: "1 350" },
      { name: "Ташкентский чай", price: "1 850" },
      { name: "Марокканский чай", price: "1 850" },
      {
        name: "Карак чай",
        price: "2 250",
        tag: HIT,
        image: "/img/karak.jpg",
        desc: {
          ru: "Насыщенный чай со сгущённым молоком и специями, заваренный по восточному рецепту.",
          kz: "Қою сүт пен дәмдеуіштер қосылған, шығыс рецептімен қайнатылған қою шай.",
          en: "Rich tea with condensed milk and spices, brewed the Eastern way.",
        },
      },
      { name: "Масала чай", price: "2 250" },
      { name: "Ягодный чай", price: "2 150" },
      { name: "Шиповник-мята", price: "2 250" },
      { name: "Облепиховый чай", price: "2 450" },
      { name: "Да Хун Пао", price: "2 550" },
      { name: "Пуэр", price: "2 250" },
      { name: "Лимон", price: "450" },
      { name: "Мёд", price: "450" },
      { name: "Молоко", price: "450" },
    ],
  },
  {
    id: "cold",
    title: { ru: "Холодные напитки", kz: "Салқын сусындар", en: "Cold Drinks" },
    items: [
      { name: "Лимонады в ассортименте", price: "2 350" },
      { name: "Морс клюква", price: "2 250" },
      { name: "Морс чёрная смородина", price: "2 250" },
      { name: "Компот из сухофруктов", price: "1 350" },
      { name: "Натуральные соки в ассортименте", price: "1 690" },
      { name: "Кымыз", price: "2 500", tag: CHEF },
      { name: "Coca-Cola", price: "950 / 1 350", note: "0,33 / 1 л" },
      { name: "Вода", price: "650", note: "0,5 л" },
    ],
  },
];

// Fallback photo per category for dishes without a dedicated image.
const CATEGORY_IMAGE: Record<string, string> = {
  salads: "/img/caesar.jpg",
  starters: "/img/grill-hero.jpg",
  soups: "/img/ramen.jpg",
  mains: "/img/steak.jpg",
  eastern: "/img/grill-hero.jpg",
  pasta: "/img/pasta.jpg",
  pizza: "/img/pizza.jpg",
  fastfood: "/img/burger.jpg",
  sides: "/img/grill-hero.jpg",
  desserts: "/img/grill-hero.jpg",
  sauces: "/img/grill-hero.jpg",
  hot: "/img/karak.jpg",
  cold: "/img/karak.jpg",
};

/** Resolve the best available photo for a dish. */
export function dishImage(catId: string, item: MenuItem): string {
  return item.image ?? CATEGORY_IMAGE[catId] ?? "/img/grill-hero.jpg";
}

export type Featured = {
  image: string;
  to: string; // category id the dish belongs to
  index: number; // position of the dish within that category's items
  name: L;
  price: string;
  tag?: L;
};

export const FEATURED: Featured[] = [
  {
    image: "/img/steak.jpg",
    to: "mains",
    index: 1,
    name: { ru: "Стейк Рибай", kz: "Рибай стейк", en: "Ribeye Steak" },
    price: "2 900",
    tag: CHEF,
  },
  {
    image: "/img/caesar.jpg",
    to: "salads",
    index: 0,
    name: { ru: "Цезарь с курицей", kz: "Тауық етімен Цезарь", en: "Chicken Caesar" },
    price: "3 200",
    tag: HIT,
  },
  {
    image: "/img/ramen.jpg",
    to: "soups",
    index: 2,
    name: { ru: "Рамён с курицей", kz: "Тауық рамені", en: "Chicken Ramen" },
    price: "1 850",
    tag: HIT,
  },
  {
    image: "/img/pizza.jpg",
    to: "pizza",
    index: 1,
    name: { ru: "Пепперони", kz: "Пепперони", en: "Pepperoni" },
    price: "3 200",
    tag: HIT,
  },
  {
    image: "/img/burger.jpg",
    to: "fastfood",
    index: 2,
    name: { ru: "Qazyburger с казы", kz: "Qazyburger", en: "Qazyburger" },
    price: "1 900",
    tag: CHEF,
  },
  {
    image: "/img/karak.jpg",
    to: "hot",
    index: 3,
    name: { ru: "Карак чай", kz: "Карак шай", en: "Karak Tea" },
    price: "2 250",
    tag: HIT,
  },
];

export const I18N: Record<Lang, Record<string, string>> = {
  ru: {
    kicker: "Астана · Ресторан",
    heroTagline: "Стейки на углях, восточная кухня, паста и пицца — в тёплой атмосфере",
    viewMenu: "Смотреть меню",
    howToGet: "Как добраться",
    featuredTitle: "Рекомендуем",
    menuTitle: "Меню",
    currency: "₸",
    infoTitle: "Как нас найти",
    address: "Адрес",
    addressValue: "Астана, Казахстан",
    hours: "Часы работы",
    hoursValue: "Ежедневно · 10:00 – 00:00",
    phone: "Телефон",
    route: "Маршрут в 2ГИС",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    kaspi: "Оплата Kaspi",
    qrNote: "Отсканировали QR — и меню всегда с собой. Цены в тенге, актуальны на сегодня.",
    footerMade: "Электронное меню для ресторана Fondue",
    footerDemo: "Демо-прототип · Фаза 1",
    langLabel: "Язык",
    aboutTitle: "О нас",
    aboutLead: "Место, где встречаются огонь, восток и уют.",
    aboutP1:
      "Fondue — ресторан в самом сердце Астаны, где классические стейки на углях соседствуют с блюдами восточной кухни, ароматной пастой и пиццей на дровах. Мы готовим из локальных и сезонных продуктов, бережно раскрывая вкус каждого блюда.",
    aboutP2:
      "Тёплый свет, неспешные вечера и внимательный сервис — мы создаём атмосферу, в которую хочется возвращаться. Семейный ужин, встреча с друзьями или особенный повод — в Fondue вам всегда рады.",
    menuPanelNote: "Выберите раздел, чтобы посмотреть блюда и цены.",
    categoryCta: "Смотреть",
    backToMenu: "Назад к меню",
    backToCategory: "Назад к разделу",
    dishAbout: "Описание",
    personal: "Личное",
    settingsSection: "Настройки",
    settingsSoon: "Раздел в разработке.",
    cartSection: "Корзина",
    cartEmpty: "В корзине пока пусто.",
    browseMenu: "Перейти в меню",
    addToCart: "В корзину",
    inCart: "В корзине",
    buy: "Купить",
    purchased: "Куплено",
    removeItem: "Удалить",
    clearCart: "Очистить корзину",
    total: "Итого",
    home: "На главную",
  },
  kz: {
    kicker: "Астана · Мейрамхана",
    heroTagline: "Көмірдегі стейктер, шығыс асханасы, паста мен пицца — жылы атмосферада",
    viewMenu: "Мәзірді қарау",
    howToGet: "Қалай жетуге болады?",
    featuredTitle: "Ұсынамыз",
    menuTitle: "Мәзір",
    currency: "₸",
    infoTitle: "Бізді қалай табуға болады",
    address: "Мекенжай",
    addressValue: "Астана, Қазақстан",
    hours: "Жұмыс уақыты",
    hoursValue: "Күнде · 10:00 – 00:00",
    phone: "Телефон",
    route: "2ГИС-те бағыт",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    kaspi: "Kaspi төлемі",
    qrNote: "QR-ды сканерледіңіз — мәзір әрқашан қасыңызда. Бағалар теңгемен, бүгінге өзекті.",
    footerMade: "Fondue мейрамханасына арналған электронды мәзір",
    footerDemo: "Демо-прототип · 1-кезең",
    langLabel: "Тіл",
    aboutTitle: "Біз туралы",
    aboutLead: "От, шығыс және жайлылық тоғысатын орын.",
    aboutP1:
      "Fondue — Астананың жүрегіндегі мейрамхана, мұнда көмірде пісірілген классикалық стейктер шығыс асханасының тағамдарымен, хош иісті паста және отында пісірілген пиццамен үндеседі. Біз жергілікті әрі маусымдық өнімдерден дайындап, әр тағамның дәмін ұқыппен ашамыз.",
    aboutP2:
      "Жылы жарық, асықпайтын кештер және ілтипатты қызмет — біз қайта оралғыңыз келетін атмосфера сыйлаймыз. Отбасылық кешкі ас, достармен кездесу немесе ерекше сәт — Fondue сізді әрқашан қуана қарсы алады.",
    menuPanelNote: "Тағамдар мен бағаларды көру үшін бөлімді таңдаңыз.",
    categoryCta: "Қарау",
    backToMenu: "Мәзірге оралу",
    backToCategory: "Бөлімге оралу",
    dishAbout: "Сипаттамасы",
    personal: "Жеке",
    settingsSection: "Параметрлер",
    settingsSoon: "Бөлім әзірленуде.",
    cartSection: "Себет",
    cartEmpty: "Себет әзірге бос.",
    browseMenu: "Мәзірге өту",
    addToCart: "Себетке",
    inCart: "Себетте",
    buy: "Сатып алу",
    purchased: "Сатып алынды",
    removeItem: "Жою",
    clearCart: "Себетті тазалау",
    total: "Барлығы",
    home: "Басты бетке",
  },
  en: {
    kicker: "Astana · Restaurant",
    heroTagline: "Char-grilled steaks, Eastern cuisine, pasta & pizza — in a warm setting",
    viewMenu: "View Menu",
    howToGet: "Find Us",
    featuredTitle: "Chef’s Picks",
    menuTitle: "Menu",
    currency: "₸",
    infoTitle: "Find Us",
    address: "Address",
    addressValue: "Astana, Kazakhstan",
    hours: "Hours",
    hoursValue: "Daily · 10:00 – 00:00",
    phone: "Phone",
    route: "Route in 2GIS",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    kaspi: "Pay with Kaspi",
    qrNote: "Scan the QR — the menu is always with you. Prices in tenge, current today.",
    footerMade: "Digital menu for Fondue restaurant",
    footerDemo: "Demo prototype · Phase 1",
    langLabel: "Language",
    aboutTitle: "About Us",
    aboutLead: "Where fire, the East and warmth meet.",
    aboutP1:
      "Fondue is a restaurant in the heart of Astana, where char-grilled steaks sit alongside Eastern dishes, fragrant pasta and wood-fired pizza. We cook with local, seasonal produce, drawing out the character of every plate.",
    aboutP2:
      "Warm light, unhurried evenings and attentive service — we craft an atmosphere worth returning to. A family dinner, a night with friends or a special occasion — you are always welcome at Fondue.",
    menuPanelNote: "Pick a section to see its dishes and prices.",
    categoryCta: "View",
    backToMenu: "Back to menu",
    backToCategory: "Back to section",
    dishAbout: "About",
    personal: "Personal",
    settingsSection: "Settings",
    settingsSoon: "This section is coming soon.",
    cartSection: "Cart",
    cartEmpty: "Your cart is empty.",
    browseMenu: "Browse the menu",
    addToCart: "Add to cart",
    inCart: "In cart",
    buy: "Buy",
    purchased: "Purchased",
    removeItem: "Remove",
    clearCart: "Clear cart",
    total: "Total",
    home: "Home",
  },
};

/** Parse a formatted price like "3 200" or "950 / 1 350" into a number (first value). */
export function parsePrice(price: string): number {
  const first = price.split("/")[0];
  const digits = first.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

// Placeholder contact details — confirm with the venue before launch.
export const CONTACT = {
  instagram: "https://www.instagram.com/fondue.astana/",
  phoneDisplay: "+7 700 000 00 00",
  phoneHref: "tel:+77000000000",
  whatsapp: "https://wa.me/77000000000",
  twoGis: "https://2gis.kz/astana",
  kaspi: "#",
};
