import Image from "next/image";

interface FormIngredientCardProps {
  imageUrl: string;
  name: string;
}

export const FormIngredientCard = ({
  name,
  imageUrl,
}: FormIngredientCardProps) => {
  return (
    <div className="bg-accent rounded-lg shadow-md relative">
      <div className="overflow-hidden h-[120px] relative rounded-t-lg">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-1 p-2">
        <span className="text-sm">{name}</span>
      </div>
    </div>
  );
};
