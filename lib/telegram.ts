import axios from "axios";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface OrderNotification {
  id: number;
  fullName: string;
  phone: string;
  address?: string;
  city?: string;
  deliveryType: string;
  totalAmount: number;
  items?: unknown;
  paymentMethod: string;
}

interface OrderItem {
  name?: string;
  productName?: string;
  quantity?: number;
  price?: number;
  pizzaSize?: number;
  pizzaType?: number;
  ingredients?: Array<{ name: string; price: number }>;
}

export async function sendOrderNotification(order: OrderNotification) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram не налаштовано: відсутні змінні окруження");
    return;
  }

  try {
    const message = formatOrderMessage(order);

    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }
    );

    console.log(`[TELEGRAM] Повідомлення про замовлення #${order.id} відправлено`);
  } catch (error) {
    console.error("[TELEGRAM] Помилка при відправці повідомлення:", error);
  }
}

function formatOrderMessage(order: OrderNotification): string {
  const deliveryInfo =
    order.deliveryType === "delivery"
      ? `📍 <b>Доставка:</b> ${order.address}, ${order.city}`
      : "🏪 <b>Самовивіз</b>";

  const itemsInfo = formatItems(order.items);

  return `

<b>🍕 НОВЕ ЗАМОВЛЕННЯ #${order.id}</b>

👤 <b>Клієнт:</b> ${order.fullName}
📱 <b>Телефон:</b> <code>${order.phone}</code>
${deliveryInfo}

────────────────────────────
<b>Деталі замовлення:</b>

${itemsInfo}

💰 <b>СУМА:</b> <b>${order.totalAmount}</b> грн
💳 <b>ОПЛАТА:</b> ${formatPaymentMethod(order.paymentMethod)}
  `.trim();
}

function formatItems(items: unknown): string {
  if (!items || (Array.isArray(items) && items.length === 0)) {
    return "❌ Товари не вказані";
  }

  const formatItem = (item: OrderItem): string => {
    const name = item.name || item.productName || "Товар";
    let itemText = `<b>${name}</b>`;

    const specs: string[] = [];

    if (item.pizzaSize) {
      specs.push(`${item.pizzaSize} см`);
    }

    if (item.quantity && item.quantity > 1) {
      specs.push(`x${item.quantity}`);
    }

    if (specs.length > 0) {
      itemText += `\n   Розмір: <i>(${specs.join(" • ")})</i>`;
    }

    if (item.price) {
      itemText += ` - ${item.price} грн`;
    }

    if (item.ingredients && item.ingredients.length > 0) {
      const ingredientsList = item.ingredients
        .map((ing) => `${ing.name}`)
        .join(", ");
      itemText += `\n   ➕ Додано: ${ingredientsList}`;
    }

    return itemText;
  };

  if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items) as OrderItem[];
      return parsed.map((item, index) => `${index + 1}. ${formatItem(item)}`).join("\n\n");
    } catch {
      return items;
    }
  }

  if (Array.isArray(items)) {
    return items.map((item: OrderItem, index: number) => `${index + 1}. ${formatItem(item)}`).join("\n\n");
  }

  return "Детальна інформація про товари";
}

function formatPaymentMethod(method: string): string {
  const methods: Record<string, string> = {
    "google-pay": "Google Pay",
    card: "Кредитна карта",
    cash: "Готівка при доставці",
    invoice: "По рахунку",
  };

  return methods[method] || method;
}
