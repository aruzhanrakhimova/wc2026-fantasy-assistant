// ДЕМО-ДАННЫЕ. Это примерный, вымышленный набор игроков для демонстрации логики
// сборки фэнтези-команды по ЧМ-2026 (см. prd.md — fantasy.md). Цены и очки — не реальные.
const TEAMS = [
  "Аргентина", "Франция", "Бразилия", "Англия",
  "Испания", "Португалия", "Германия", "Нидерланды",
];

const PLAYERS = [
  // Аргентина
  { name: "Э. Мартинес", team: "Аргентина", pos: "GK", price: 5.5, points: 24 },
  { name: "Х. Родригес", team: "Аргентина", pos: "GK", price: 4.2, points: 15 },
  { name: "К. Ромеро", team: "Аргентина", pos: "DEF", price: 6.0, points: 30 },
  { name: "Н. Molina", team: "Аргентина", pos: "DEF", price: 5.5, points: 27 },
  { name: "Н. Тальявенте", team: "Аргентина", pos: "DEF", price: 5.0, points: 22 },
  { name: "Р. Де Пауль", team: "Аргентина", pos: "MID", price: 7.5, points: 38 },
  { name: "А. Мак Аллистер", team: "Аргентина", pos: "MID", price: 8.0, points: 41 },
  { name: "Э. Пас", team: "Аргентина", pos: "MID", price: 6.5, points: 29 },
  { name: "Л. Месси", team: "Аргентина", pos: "FWD", price: 13.5, points: 62 },
  { name: "Х. Альварес", team: "Аргентина", pos: "FWD", price: 9.5, points: 45 },

  // Франция
  { name: "М. Меньян", team: "Франция", pos: "GK", price: 5.0, points: 22 },
  { name: "Б. Шевалье", team: "Франция", pos: "GK", price: 4.0, points: 14 },
  { name: "Ж. Кунде", team: "Франция", pos: "DEF", price: 6.0, points: 29 },
  { name: "Т. Эрнандес", team: "Франция", pos: "DEF", price: 6.5, points: 31 },
  { name: "И. Конате", team: "Франция", pos: "DEF", price: 5.5, points: 25 },
  { name: "О. Чуамени", team: "Франция", pos: "MID", price: 6.5, points: 33 },
  { name: "А. Гриезманн", team: "Франция", pos: "MID", price: 9.0, points: 47 },
  { name: "Э. Камавинга", team: "Франция", pos: "MID", price: 6.0, points: 28 },
  { name: "К. Мбаппе", team: "Франция", pos: "FWD", price: 14.0, points: 65 },
  { name: "У. Дембеле", team: "Франция", pos: "FWD", price: 9.5, points: 40 },

  // Бразилия
  { name: "А. Бенто", team: "Бразилия", pos: "GK", price: 4.8, points: 20 },
  { name: "Эдерсон", team: "Бразилия", pos: "GK", price: 5.0, points: 21 },
  { name: "Марвин", team: "Бразилия", pos: "DEF", price: 5.5, points: 26 },
  { name: "Г. Магальяэс", team: "Бразилия", pos: "DEF", price: 5.5, points: 25 },
  { name: "Данило", team: "Бразилия", pos: "DEF", price: 5.0, points: 22 },
  { name: "Б. Гимарайнш", team: "Бразилия", pos: "MID", price: 7.0, points: 34 },
  { name: "Родриго", team: "Бразилия", pos: "MID", price: 9.0, points: 44 },
  { name: "Ж. Педро", team: "Бразилия", pos: "MID", price: 6.5, points: 30 },
  { name: "Винисиус Жуниор", team: "Бразилия", pos: "FWD", price: 13.0, points: 58 },
  { name: "Эндрик", team: "Бразилия", pos: "FWD", price: 8.5, points: 39 },

  // Англия
  { name: "Дж. Пикфорд", team: "Англия", pos: "GK", price: 5.2, points: 23 },
  { name: "Дж. Хендерсон", team: "Англия", pos: "GK", price: 4.0, points: 14 },
  { name: "М. Ганьо", team: "Англия", pos: "DEF", price: 5.5, points: 27 },
  { name: "Дж. Гехи", team: "Англия", pos: "DEF", price: 5.0, points: 24 },
  { name: "Л. Шоу", team: "Англия", pos: "DEF", price: 5.2, points: 23 },
  { name: "Д. Райс", team: "Англия", pos: "MID", price: 7.0, points: 35 },
  { name: "Дж. Беллингем", team: "Англия", pos: "MID", price: 11.0, points: 52 },
  { name: "К. Палмер", team: "Англия", pos: "MID", price: 8.5, points: 40 },
  { name: "Х. Кейн", team: "Англия", pos: "FWD", price: 12.5, points: 55 },
  { name: "Б. Сака", team: "Англия", pos: "FWD", price: 10.0, points: 46 },

  // Испания
  { name: "У. Симон", team: "Испания", pos: "GK", price: 5.0, points: 22 },
  { name: "Д. Рая", team: "Испания", pos: "GK", price: 5.1, points: 22 },
  { name: "Р. Ле Норманд", team: "Испания", pos: "DEF", price: 5.5, points: 26 },
  { name: "М. Куукас", team: "Испания", pos: "DEF", price: 5.0, points: 23 },
  { name: "Д. Карвахаль", team: "Испания", pos: "DEF", price: 5.5, points: 25 },
  { name: "Р. Субименди", team: "Испания", pos: "MID", price: 6.5, points: 31 },
  { name: "Педри", team: "Испания", pos: "MID", price: 9.5, points: 46 },
  { name: "Ф. Руис", team: "Испания", pos: "MID", price: 7.0, points: 33 },
  { name: "Ламин Ямаль", team: "Испания", pos: "FWD", price: 11.5, points: 54 },
  { name: "А. Мората", team: "Испания", pos: "FWD", price: 8.0, points: 36 },

  // Португалия
  { name: "Д. Кошта", team: "Португалия", pos: "GK", price: 5.0, points: 21 },
  { name: "Р. Патрисиу", team: "Португалия", pos: "GK", price: 4.5, points: 18 },
  { name: "Р. Диаш", team: "Португалия", pos: "DEF", price: 6.0, points: 29 },
  { name: "Н. Мендеш", team: "Португалия", pos: "DEF", price: 6.0, points: 28 },
  { name: "А. Виллота", team: "Португалия", pos: "DEF", price: 5.0, points: 22 },
  { name: "Б. Фернандеш", team: "Португалия", pos: "MID", price: 10.0, points: 48 },
  { name: "В. Гуэдеш", team: "Португалия", pos: "MID", price: 6.5, points: 30 },
  { name: "Ж. Невеш", team: "Португалия", pos: "MID", price: 7.5, points: 35 },
  { name: "К. Роналду", team: "Португалия", pos: "FWD", price: 11.0, points: 50 },
  { name: "Гонсалу Рамуш", team: "Португалия", pos: "FWD", price: 8.0, points: 37 },

  // Германия
  { name: "М. Нойер", team: "Германия", pos: "GK", price: 5.3, points: 24 },
  { name: "М. тер Штеген", team: "Германия", pos: "GK", price: 5.1, points: 23 },
  { name: "А. Рюдигер", team: "Германия", pos: "DEF", price: 5.8, points: 27 },
  { name: "Й. Тах", team: "Германия", pos: "DEF", price: 5.5, points: 26 },
  { name: "Д. Раум", team: "Германия", pos: "DEF", price: 5.0, points: 22 },
  { name: "Й. Киммих", team: "Германия", pos: "MID", price: 7.5, points: 36 },
  { name: "Ф. Вирц", team: "Германия", pos: "MID", price: 10.5, points: 49 },
  { name: "Р. Гросс", team: "Германия", pos: "MID", price: 6.0, points: 27 },
  { name: "К. Хавертц", team: "Германия", pos: "FWD", price: 8.5, points: 38 },
  { name: "Н. Фюллькруг", team: "Германия", pos: "FWD", price: 7.5, points: 34 },

  // Нидерланды
  { name: "Б. Верберг", team: "Нидерланды", pos: "GK", price: 4.8, points: 20 },
  { name: "Й. Флиппо", team: "Нидерланды", pos: "GK", price: 4.2, points: 16 },
  { name: "В. ван Дейк", team: "Нидерланды", pos: "DEF", price: 6.5, points: 32 },
  { name: "Й. Тимбер", team: "Нидерланды", pos: "DEF", price: 5.8, points: 27 },
  { name: "Н. Аке", team: "Нидерланды", pos: "DEF", price: 5.2, points: 23 },
  { name: "Ф. де Йонг", team: "Нидерланды", pos: "MID", price: 7.5, points: 35 },
  { name: "Т. Рейндерс", team: "Нидерланды", pos: "MID", price: 6.5, points: 30 },
  { name: "Х. Симонс", team: "Нидерланды", pos: "MID", price: 8.0, points: 38 },
  { name: "К. Гакпо", team: "Нидерланды", pos: "FWD", price: 8.5, points: 39 },
  { name: "М. Депай", team: "Нидерланды", pos: "FWD", price: 8.0, points: 37 },
];

const FORMATION = { GK: 2, DEF: 5, MID: 5, FWD: 3 };
const BUDGET_DEFAULT = 55;
