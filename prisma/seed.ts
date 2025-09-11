import { hashSync } from "bcrypt";
import { categories, _ingredients, products } from "./constants";
import { prisma } from "./prisma-client";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@gmail.com",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Admin",
        email: "admin@gmail.com",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Маргарита",
      imageUrl:
        "https://media.istockphoto.com/id/1256139066/fi/valokuva/italialaista-pizzaa-juustojen-ja-tomaattien-kera.jpg?s=612x612&w=0&k=20&c=cGVlm971AkvBekbuGppTCgt3JvDYha5hmW0pD3i2lcI=",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 }, // "Вершкова моцарела"//
          { id: 2 }, // "Сир чеддер"//
          { id: 16 }, // "Томатний соус"//
          { id: 27 }, // "Свіжий базилік"//
          { id: 28 }, // "Оливкова олія"//
        ],
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Пепероні",
      imageUrl:
        "https://media.istockphoto.com/id/1918995396/fi/valokuva/tasty-pepperoni-pizza-with-red-bell-peper.jpg?s=612x612&w=0&k=20&c=vKF2ny8XLIav5gzFLsomBgKAMAmxA38YwJ7d7rz5PTw=",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 4 }, // "Пармезан"//
          { id: 7 }, // "Сир гауда"//
          { id: 8 }, // "Пепероні"//
          { id: 16 }, // "Томатний соус"//
          { id: 21 }, // "Томати"//
        ],
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "П'ять сирів",
      imageUrl:
        "https://media.istockphoto.com/id/1744442094/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%96%D1%86%D0%B0-quattro-fromaggi-%D0%BD%D0%B0-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D1%96%D0%B9-%D0%B4%D0%BE%D1%88%D1%86%D1%96-%D0%BF%D1%96%D1%86%D0%B0-%D1%87%D0%BE%D1%82%D0%B8%D1%80%D0%B8-%D1%81%D0%B8%D1%80%D0%B8-%D0%B0%D0%B1%D0%BE-%D0%BF%D1%96%D1%86%D0%B0-%D0%BA%D0%B2%D0%B0%D1%82%D1%80%D0%BE-%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D0%B4%D0%B6%D1%96-%D0%B7.jpg?s=612x612&w=0&k=20&c=jATr9KKYxYYSAQdezqheb7xsEBwfwRDB4AbN3q0vQ-0=",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 1 }, // "Вершкова моцарела"//
          { id: 2 }, // "Сир чеддер"//
          { id: 3 }, // "Горгонзола"//
          { id: 5 }, // "Емменталь"//
          { id: 6 }, // "Сир фета"//
          { id: 17 }, // "Вершковий соус"//
        ],
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "М'ясна",
      imageUrl:
        "https://media.istockphoto.com/id/1361357017/fi/valokuva/liha-italialaista-pizzaa-paahtopaistilla-pihviviipaleita-sulatettua-juustoa.jpg?s=612x612&w=0&k=20&c=oTiirBUG05UcdkSM3DkGNVnnwEIunBnQGp2rSpa--2s=",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 7 }, // "Сир гауда"//
          { id: 9 }, // "Шинка"//
          { id: 10 }, // "Бекон"//
          { id: 11 }, // "Баварські ковбаски"//
          { id: 12 }, // "Курка"//
          { id: 14 }, // "Гострий соус"//
          { id: 21 }, // "Томати"//
          { id: 22 }, // "Перець болгарський"//
        ],
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Гавайська",
      imageUrl:
        "https://media.istockphoto.com/id/1671506638/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%96%D1%86%D0%B0-%D0%B7-%D0%BA%D1%83%D1%80%D0%BA%D0%BE%D1%8E-%D1%96-%D0%B0%D0%BD%D0%B0%D0%BD%D0%B0%D1%81%D0%B0%D0%BC%D0%B8-%D0%B3%D0%B0%D0%B2%D0%B0%D0%B9%D1%81%D1%8C%D0%BA%D0%B0-%D0%BF%D1%96%D1%86%D0%B0.jpg?s=612x612&w=0&k=20&c=zn5SYxoixzL0zVj4ddR0qKnXY7B7MYec5oEfxffGwLI=",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 2 }, // "Сир чеддер"//
          { id: 3 }, // "Горгонзола"//
          { id: 12 }, // "Курка"//
          { id: 13 }, // "Соус альфредо"//
          { id: 19 }, // "Ананас"//
        ],
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Фермерська",
      imageUrl:
        "https://media.istockphoto.com/id/500618356/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%B0%D0%BC%D0%BE%D1%80%D0%BE%D0%B1%D0%BD%D0%B0-%D0%BF%D1%96%D1%86%D0%B0-%D0%B7-%D1%80%D0%B0%D0%BA%D0%B5%D1%82%D0%BD%D0%B8%D0%BC-%D0%B7%D0%B0%D0%B2%D0%BE%D0%B4%D0%BE%D0%BC.jpg?s=612x612&w=0&k=20&c=o7kywZohOq2XrLBOiAkok_gFCo9pGEZdVIX49dNBtIg=",
      categoryId: 1,
      isNew: true,
      ingredients: {
        connect: [
          { id: 4 }, // "Пармезан"//
          { id: 10 }, // "Бекон"//
          { id: 11 }, // "Баварські ковбаски"//
          { id: 16 }, // "Томатний соус"//
          { id: 18 }, // "Мариновані огірочки"//
          { id: 21 }, // "Томати"//
          { id: 22 }, // "Перець болгарський"//
          { id: 26 }, // "Рукола"//
        ],
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: "Барбекю",
      imageUrl:
        "https://media.istockphoto.com/id/489809469/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B1%D0%B0%D1%80%D0%B1%D0%B5%D0%BA%D1%8E-%D0%BA%D1%83%D1%80%D1%8F%D1%87%D0%B0-%D0%BF%D1%96%D1%86%D0%B0.jpg?s=612x612&w=0&k=20&c=HMcdFj3oOeeiBxVD_q-Oeh4EFZm6pEqc5hRlhkFr5Fk=",
      categoryId: 1,
      ingredients: {
        connect: [
          { id: 2 }, // "Сир чеддер" //
          { id: 9 }, // "Шинка" //
          { id: 12 }, // "Курка" //
          { id: 15 }, // "Соус барбекю" //
          { id: 18 }, // "Мариновані огірочки" //
          { id: 21 }, // "Томати" //
          { id: 23 }, // "Карамелізована цибуля" //
          { id: 27 }, // "Свіжий базилік" //
        ],
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: "Сирна з грущею",
      imageUrl:
        "https://media.istockphoto.com/id/1373003755/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%B2%D1%96%D0%B6%D0%B0-%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D1%8F-%D0%BF%D1%96%D1%86%D0%B0.jpg?s=612x612&w=0&k=20&c=sv01UXaTvd86ot2BpOhkUqUZzzXBfD8pd0Ac1pj3VAU=",
      categoryId: 1,
      isNew: true,
      ingredients: {
        connect: [
          { id: 2 }, //"Сир чеддер"//
          { id: 5 }, // "Емменталь" //
          { id: 7 }, // "Сир гауда" //
          { id: 13 }, //"Соус альфредо"//
          { id: 20 }, // "Груша" }
          { id: 27 }, // "Свіжий базилік" //
        ],
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      { productId: 1, price: 35 },
      { productId: 2, price: 35 },
      { productId: 3, price: 40 },
      { productId: 4, price: 55 },
      { productId: 5, price: 25 },
      { productId: 6, price: 50 },
      { productId: 7, price: 45 },
      { productId: 8, price: 45 },
      { productId: 9, price: 49 },
      { productId: 10, price: 47 },
      { productId: 11, price: 35 },
      { productId: 12, price: 85 },
      { productId: 13, price: 55 },
      { productId: 14, price: 35 },
      { productId: 15, price: 79 },
      { productId: 16, price: 55 },
      { productId: 17, price: 60 },
      { productId: 18, price: 75 },
      { productId: 19, price: 68 },

      { productId: pizza1.id, pizzaType: 1, size: 30, price: 232 },
      { productId: pizza1.id, pizzaType: 1, size: 35, price: 249 },
      { productId: pizza1.id, pizzaType: 1, size: 40, price: 360 },
      { productId: pizza1.id, pizzaType: 2, size: 30, price: 320 },
      { productId: pizza1.id, pizzaType: 2, size: 35, price: 351 },
      { productId: pizza1.id, pizzaType: 2, size: 40, price: 378 },

      { productId: pizza2.id, pizzaType: 1, size: 30, price: 209 },
      { productId: pizza2.id, pizzaType: 1, size: 35, price: 229 },
      { productId: pizza2.id, pizzaType: 1, size: 40, price: 359 },
      { productId: pizza2.id, pizzaType: 2, size: 30, price: 290 },
      { productId: pizza2.id, pizzaType: 2, size: 35, price: 350 },
      { productId: pizza2.id, pizzaType: 2, size: 40, price: 379 },

      { productId: pizza3.id, pizzaType: 1, size: 30, price: 240 },
      { productId: pizza3.id, pizzaType: 1, size: 35, price: 340 },
      { productId: pizza3.id, pizzaType: 1, size: 40, price: 370 },
      { productId: pizza3.id, pizzaType: 2, size: 30, price: 249 },
      { productId: pizza3.id, pizzaType: 2, size: 35, price: 350 },
      { productId: pizza3.id, pizzaType: 2, size: 40, price: 375 },

      { productId: pizza4.id, pizzaType: 1, size: 30, price: 249 },
      { productId: pizza4.id, pizzaType: 1, size: 35, price: 329 },
      { productId: pizza4.id, pizzaType: 1, size: 40, price: 379 },
      { productId: pizza4.id, pizzaType: 2, size: 35, price: 375 },
      { productId: pizza4.id, pizzaType: 2, size: 40, price: 400 },

      { productId: pizza5.id, pizzaType: 1, size: 30, price: 229 },
      { productId: pizza5.id, pizzaType: 1, size: 35, price: 350 },
      { productId: pizza5.id, pizzaType: 1, size: 40, price: 375 },
      { productId: pizza5.id, pizzaType: 2, size: 30, price: 289 },
      { productId: pizza5.id, pizzaType: 2, size: 35, price: 298 },

      { productId: pizza6.id, pizzaType: 1, size: 30, price: 229 },
      { productId: pizza6.id, pizzaType: 1, size: 35, price: 249 },
      { productId: pizza6.id, pizzaType: 1, size: 40, price: 329 },
      { productId: pizza6.id, pizzaType: 2, size: 30, price: 289 },
      { productId: pizza6.id, pizzaType: 2, size: 35, price: 342 },
      { productId: pizza6.id, pizzaType: 2, size: 40, price: 350 },

      { productId: pizza7.id, pizzaType: 1, size: 30, price: 219 },
      { productId: pizza7.id, pizzaType: 1, size: 35, price: 329 },
      { productId: pizza7.id, pizzaType: 1, size: 40, price: 359 },
      { productId: pizza7.id, pizzaType: 2, size: 30, price: 279 },
      { productId: pizza7.id, pizzaType: 2, size: 35, price: 299 },
      { productId: pizza7.id, pizzaType: 2, size: 40, price: 349 },

      { productId: pizza8.id, pizzaType: 1, size: 30, price: 229 },
      { productId: pizza8.id, pizzaType: 1, size: 35, price: 349 },
      { productId: pizza8.id, pizzaType: 1, size: 40, price: 379 },
      { productId: pizza8.id, pizzaType: 2, size: 30, price: 299 },
      { productId: pizza8.id, pizzaType: 2, size: 35, price: 319 },
      { productId: pizza8.id, pizzaType: 2, size: 40, price: 369 },
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          "https://media.istockphoto.com/id/1323658199/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B7%D0%B1%D0%BB%D0%B8%D0%B7%D1%8C%D0%BA%D0%B0-%D0%BF%D0%BE%D0%B3%D0%BB%D1%8F%D0%B4-%D0%BD%D0%B0-%D0%BB%D1%8E%D0%B4%D0%B5%D0%B9-%D1%8F%D0%BA%D1%96-%D0%BF%D1%80%D0%B8%D0%B9%D0%BC%D0%B0%D1%8E%D1%82%D1%8C-%D1%96-%D1%97%D0%B4%D1%8F%D1%82%D1%8C-%D0%BF%D1%96%D1%86%D1%83-%D0%B2-%D0%BF%D1%80%D0%B8%D0%BC%D1%96%D1%89%D0%B5%D0%BD%D0%BD%D1%96-%D1%80%D0%B0%D0%B7%D0%BE%D0%BC.jpg?s=612x612&w=0&k=20&c=oSXmTLJeVc6IM6zYZU5PuDx9lp0A-gwKZ9g5YuYHJhY=",
      },
      {
        previewImageUrl:
          "https://media.istockphoto.com/id/2165196727/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%B8%D0%B2%D0%BE-%D1%82%D0%B0-%D1%81%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B0-%D0%BF%D1%96%D1%86%D0%B0-%D0%BF%D0%BE%D0%B4%D0%B0%D1%8E%D1%82%D1%8C%D1%81%D1%8F-%D0%BD%D0%B0-%D1%81%D1%82%D1%96%D0%BB.jpg?s=612x612&w=0&k=20&c=iZJ5w73Q4rQ7WMip5QP_vP8wZ4nBQbf-27kLlXcPAtw=",
      },
      {
        previewImageUrl:
          "https://media.istockphoto.com/id/1203052397/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BB%D1%8E%D0%B4%D0%B8-%D1%97%D0%B4%D1%8F%D1%82%D1%8C-%D1%80%D1%96%D0%B7%D0%BD%D1%96-%D0%BF%D1%96%D1%86%D0%B8-%D1%96-%D0%BF%D1%8E%D1%82%D1%8C-%D1%87%D0%B5%D1%80%D0%B2%D0%BE%D0%BD%D0%B5-%D0%B2%D0%B8%D0%BD%D0%BE-%D1%88%D0%B8%D1%80%D0%BE%D0%BA%D0%B8%D0%B9-%D1%81%D0%BA%D0%BB%D0%B0%D0%B4.jpg?s=612x612&w=0&k=20&c=IB2UU5jcDuH7D7k8x3qMt4C7NClfeX3OrpYmb1HgGyA=",
      },
      {
        previewImageUrl:
          "https://media.istockphoto.com/id/184946701/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%96%D1%86%D0%B0.jpg?s=612x612&w=0&k=20&c=oYrX2CMjW8LbqsFYyi8sZUuTms3vki4lopRYBswVgGg=",
      },
      {
        previewImageUrl:
          "https://media.istockphoto.com/id/1400108291/uk/%D0%B2%D1%96%D0%B4%D0%B5%D0%BE/%D0%BD%D1%8C%D1%8E-%D0%B9%D0%BE%D1%80%D0%BA%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-%D1%81%D1%82%D0%B8%D0%BB%D1%8C-%D0%BF%D0%B5%D0%BF%D0%B5%D1%80%D0%BE%D0%BD%D1%96-%D0%BF%D1%96%D1%86%D0%B8-%D0%BD%D0%B0%D1%80%D1%96%D0%B7%D0%B0%D0%BD%D0%B8%D0%B9-%D0%BF%D1%96%D1%86%D0%B8-%D1%80%D1%96%D0%B7%D0%B0%D0%BA-%D0%B2-%D0%BF%D0%BE%D0%B2%D1%96%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC%D1%83-%D1%80%D1%83%D1%81%D1%96-%D1%96-%D0%BC%D0%B0%D0%BA%D1%80%D0%BE.jpg?s=640x640&k=20&c=zxNSjzfcSq7wjcCvFfbGv50MW1llZxYubZ18h2asaqA=",
      },
      {
        previewImageUrl:
          "https://media.istockphoto.com/id/1485373705/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%80%D0%BE%D1%84%D0%B5%D1%81%D1%96%D0%B9%D0%BD%D0%B0-%D0%BF%D0%B5%D0%BA%D0%B0%D1%80%D0%BA%D0%B0-%D1%88%D0%BB%D1%8C%D0%BE%D0%BF%D0%B0%D1%94-%D1%82%D1%96%D1%81%D1%82%D0%BE-%D0%B1%D0%BE%D1%80%D0%BE%D1%88%D0%BD%D0%BE%D0%BC-%D0%BF%D1%96%D0%B4-%D1%87%D0%B0%D1%81-%D0%BF%D1%80%D0%B8%D0%B3%D0%BE%D1%82%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F-%D0%B7%D0%B0%D0%BA%D0%B2%D0%B0%D1%81%D0%BA%D0%B8-%D0%B0%D0%B1%D0%BE-%D1%80%D0%B5%D0%BC%D1%96%D1%81%D0%BD%D0%B8%D1%87%D0%BE%D0%B3%D0%BE-%D1%85%D0%BB%D1%96%D0%B1%D0%B0.jpg?s=612x612&w=0&k=20&c=eY2PfADvjwlDbpcNsXmFvSMW7tl9T7nr3qKVAGgrGsM=",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://media.istockphoto.com/id/909073628/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B4%D0%BE%D0%B4%D0%B0%D1%82%D0%BE%D0%BA-%D0%B4%D0%BB%D1%8F-%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%BE%D0%BA-%D0%BF%D1%96%D1%86%D0%B8-%D0%BD%D0%B0-%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D1%96-%D0%BC%D0%BE%D0%B1%D1%96%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D1%83-%D0%B6%D1%96%D0%BD%D0%BA%D0%B0-%D1%82%D1%80%D0%B8%D0%BC%D0%B0%D1%94-%D1%81%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD-%D0%B2-%D1%80%D1%83%D1%86%D1%96.jpg?s=612x612&w=0&k=20&c=YfsB2mOiaTeEmdCIP13TP-4vBZHvJ2ZEpNVLFgPiOyY=",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://media.istockphoto.com/id/1969858454/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D1%89%D0%B0%D1%81%D0%BB%D0%B8%D0%B2%D0%BE%D1%97-%D0%B6%D1%96%D0%BD%D0%BA%D0%B8-%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D1%86%D1%8F-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B8-%D1%97%D0%B6%D1%96-%D0%BB%D0%B0%D1%82%D0%B8%D0%BD%D0%BE%D0%B0%D0%BC%D0%B5%D1%80%D0%B8%D0%BA%D0%B0%D0%BD%D0%BA%D0%B8-%D1%8F%D0%BA%D0%B0-%D0%BF%D0%BE%D1%81%D0%BC%D1%96%D1%85%D0%B0%D1%94%D1%82%D1%8C%D1%81%D1%8F-%D1%96.jpg?s=612x612&w=0&k=20&c=RsiJTQ4GDrLTjj3wf2fLPeOfiKmNcNr7Er7trECOqvg=",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://media.istockphoto.com/id/540760262/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%96%D1%86%D0%B0-%D0%BC%D1%96%D1%81%D1%86%D0%B5-%D1%88%D0%B5%D1%84-%D0%BA%D1%83%D1%85%D0%B0%D1%80%D1%8F.jpg?s=612x612&w=0&k=20&c=HyxaTfYBBb8i1LvqRuZgzUbCfwefeJcI5ZyERKhks2M=",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
