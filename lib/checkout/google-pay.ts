import { PaymentMethodData, PaymentDetails } from "@/types/checkout";
import { toastError } from "@/lib";

declare global {
  interface Window {
    PaymentRequest?: typeof PaymentRequest;
  }
}

export const processGooglePay = async (
  totalAmount: number,
  cartItems: Array<{ name: string; price: number; quantity: number }>
): Promise<string | null> => {
  if (!window.PaymentRequest) {
    toastError("Google Pay не підтримується вашим браузером");
    return null;
  }

  const paymentMethods: PaymentMethodData[] = [
    {
      supportedMethods: "https://google.com/pay",
      data: {
        environment: "PRODUCTION",
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedCardNetworks: ["VISA", "MASTERCARD"],
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        merchantInfo: {
          merchantId: process.env.NEXT_PUBLIC_GOOGLE_MERCHANT_ID,
          merchantName: "Vincento Pizza",
        },
      },
    },
  ];

  const paymentDetails: PaymentDetails = {
    total: {
      label: "Загальна сума",
      amount: {
        currency: "UAH",
        value: totalAmount.toString(),
      },
    },
    displayItems: cartItems.map((item) => ({
      label: item.name,
      amount: {
        currency: "UAH",
        value: (item.price * item.quantity).toString(),
      },
    })),
  };

  try {
    const paymentRequest =
      new (window.PaymentRequest as typeof PaymentRequest)(
        paymentMethods as unknown as PaymentMethodData[],
        paymentDetails as unknown as PaymentDetails
      );

    const paymentResponse = await paymentRequest.show();
    await paymentResponse.complete("success");

    return JSON.stringify({
      method: paymentResponse.methodName,
      details: paymentResponse.details,
    });
  } catch (error) {
    console.error("Google Pay error:", error);
    toastError("Помилка при обробці платежу");
    return null;
  }
};
