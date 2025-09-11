import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { Ingredient } from "@/prisma/generated/prisma";
import { FormIngredient } from "@/components/common/form/ingredient";

interface IngredientDialogProps {
  allIngredients: Ingredient[];
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
}

export const IngredientDialog = ({
  allIngredients,
  selectedIngredients,
  addIngredient,
}: IngredientDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          Додати інгредієнти
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Вибір інгредієнтів</DialogTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 max-h-80 overflow-auto scrollbar">
          {allIngredients.map((ingredient) => (
            <FormIngredient
              key={ingredient.id}
              name={ingredient.name}
              price={ingredient.price}
              imageUrl={ingredient.imageUrl}
              onClick={() => addIngredient(ingredient.id)}
              active={selectedIngredients.has(ingredient.id)}
            />
          ))}
        </div>
        <DialogClose asChild>
          <Button variant="destructive" size="sm" className="mt-3">
            Додати
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
