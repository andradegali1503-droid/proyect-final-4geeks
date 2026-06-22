const menuAndaluz = [
  {
    name: "Tostada con tomate y aceite",
    description: "Pan tostado con tomate triturado natural y aceite de oliva virgen extra.",
    price: 2.8,
    category: "Desayunos",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Tostada con jamon serrano",
    description: "Tostada crujiente con tomate, aceite de oliva y jamon serrano.",
    price: 3.9,
    category: "Desayunos",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Mollete de Antequera mixto",
    description: "Mollete andaluz relleno de jamon cocido y queso fundido.",
    price: 4.2,
    category: "Desayunos",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Cafe con leche",
    description: "Cafe espresso con leche caliente, ideal para desayunos y meriendas.",
    price: 1.8,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Zumo de naranja natural",
    description: "Zumo recien exprimido de naranjas frescas.",
    price: 2.5,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Salmorejo cordobes",
    description: "Crema fria de tomate con huevo duro y jamon serrano picado.",
    price: 6.5,
    category: "Entrantes",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Gazpacho andaluz",
    description: "Sopa fria de tomate, pepino, pimiento y aceite de oliva.",
    price: 5.9,
    category: "Entrantes",
    image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Ensaladilla rusa",
    description: "Ensaladilla casera con patata, atun, mayonesa y aceitunas.",
    price: 6.2,
    category: "Entrantes",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Croquetas caseras de jamon",
    description: "Croquetas cremosas de bechamel y jamon serrano.",
    price: 8.5,
    category: "Entrantes",
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Huevos rotos con jamon",
    description: "Patatas fritas caseras con huevos y jamon serrano.",
    price: 10.9,
    category: "Almuerzos",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Flamenquin cordobes",
    description: "Rollo crujiente de lomo relleno de jamon, servido con patatas.",
    price: 11.8,
    category: "Almuerzos",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Pescaito frito",
    description: "Surtido de pescado frito al estilo andaluz con limon.",
    price: 13.5,
    category: "Almuerzos",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Rabo de toro",
    description: "Estofado tradicional de rabo de toro cocinado a fuego lento.",
    price: 15.9,
    category: "Almuerzos",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Paella mixta",
    description: "Arroz con pollo, marisco y verduras, ideal para compartir.",
    price: 14.5,
    category: "Almuerzos",
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Plato combinado andaluz",
    description: "Lomo a la plancha con huevo, patatas fritas y ensalada.",
    price: 12.4,
    category: "Almuerzos",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Tarta de queso casera",
    description: "Tarta de queso cremosa servida con mermelada de frutos rojos.",
    price: 4.9,
    category: "Postres",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Arroz con leche",
    description: "Postre tradicional con canela y toque de limon.",
    price: 4.2,
    category: "Postres",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Agua mineral",
    description: "Botella de agua mineral fria.",
    price: 1.5,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1564419431639-7b8a992a79d3?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Refresco",
    description: "Refresco a elegir: cola, naranja o limon.",
    price: 2.3,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Cerveza",
    description: "Cerveza bien fria, servida en vaso o copa.",
    price: 2.6,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    available: true
  },
  {
    name: "Tinto de verano",
    description: "Bebida fresca con vino tinto suave y gaseosa.",
    price: 3.2,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    available: true
  }
];

module.exports = menuAndaluz;
