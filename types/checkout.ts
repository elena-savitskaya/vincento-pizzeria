export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  deliveryType: "delivery" | "pickup";
  address?: string;
  city?: string;
  postalCode?: string;
  deliveryTime: "asap" | "scheduled";
  deliveryHour?: string;
  paymentMethod: "google-pay" | "card";
}

export interface FormErrors {
  [key: string]: string;
}

export interface PaymentMethodData {
  supportedMethods: string;
  data: {
    environment: string;
    apiVersion: number;
    apiVersionMinor: number;
    allowedCardNetworks: string[];
    allowedAuthMethods: string[];
    merchantInfo: {
      merchantId?: string;
      merchantName: string;
    };
  };
}

export interface PaymentDetails {
  total: {
    label: string;
    amount: {
      currency: string;
      value: string;
    };
  };
  displayItems: Array<{
    label: string;
    amount: {
      currency: string;
      value: string;
    };
  }>;
}
