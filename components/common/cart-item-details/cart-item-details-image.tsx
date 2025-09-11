import Image from "next/image";

type CartItemDetailsImageProps = {
  src: string;
};

export const CartItemDetailsImage = ({ src }: CartItemDetailsImageProps) => {
  return (
    <div className="overflow-hidden md:h-[100px] md:w-[90px] h-[80px] w-[70px] relative rounded-lg">
      <Image
        src={src}
        alt="image"
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
        className="object-cover w-full h-full"
      />
    </div>
  );
};
