type CartItemDetailsPriceProps = {
  value: number;
};

export const CartItemDetailsPrice = ({ value }: CartItemDetailsPriceProps) => {
  return <h2 className="font-bold">{value} грн</h2>;
};
