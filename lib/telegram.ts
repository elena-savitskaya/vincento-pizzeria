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
      ? `📍 <b>Адреса:</b> ${order.address}, ${order.city}\n`
      : "🏪 <b>Самовивіз</b>\n";

  const itemsInfo = formatItems(order.items);

  return `
<b>🍕 НОВЕ ЗАМОВЛЕННЯ</b>

<b>#${order.id}</b>

👤 <b>Ім'я:</b> ${order.fullName}
📱 <b>Телефон:</b> <code>${order.phone}</code>
${deliveryInfo}
📦 <b>Деталі замовлення:</b>
${itemsInfo}

💰 <b>Сума:</b> ${order.totalAmount} грн
💳 <b>Спосіб оплати:</b> ${formatPaymentMethod(order.paymentMethod)}
  `.trim();
}

function formatItems(items: unknown): string {
  if (!items || (Array.isArray(items) && items.length === 0)) {
    return "Немає товарів";
  }

  if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items) as OrderItem[];
      return parsed
        .map((item) => {
          let itemText = `• ${item.name} (${item.quantity || 1}x)`;

          if (item.ingredients && item.ingredients.length > 0) {
            const ingredientsList = item.ingredients
              .map((ing) => ing.name)
              .join(", ");
            itemText += `\n  Додаткові інгрідієнти: ${ingredientsList}`;
          }

          return itemText;
        })
        .join("\n");
    } catch {
      return items;
    }
  }

  if (Array.isArray(items)) {
    return items
      .map((item: OrderItem) => {
        let itemText = `• ${item.name || item.productName} (${item.quantity || 1}x)`;

        if (item.ingredients && item.ingredients.length > 0) {
          const ingredientsList = item.ingredients
            .map((ing) => ing.name)
            .join(", ");
          itemText += `\n  Додаткові інгрідієнти: ${ingredientsList}`;
        }

        return itemText;
      })
      .join("\n");
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
