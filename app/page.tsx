import { Suspense } from "react";
import {
  Container,
  Filters,
  FiltersDrawer,
  Pagination,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/common";
import { GetSearchParams, findPizzas } from "@/lib";
import { FilterIcon } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const sp = await searchParams;
  const categories = await findPizzas(sp);

  return (
    <>
      <TopBar categories={categories} />
      <Container>
        <section className="flex lg:gap-8 gap-2 lg:flex-row flex-col items-start">
          <div className="w-[250px] p-2 lg:block hidden">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="lg:hidden block">
            <FiltersDrawer>
              <div className="flex items-center gap-2">
                <FilterIcon className="md:w-6 md:h-6 w-4 h-4 text-foreground" />
                <Title text="Фільтрація" size="sm" className="font-bold" />
              </div>
            </FiltersDrawer>
          </div>
          <div className="flex-1 flex flex-col justify-between md:p-2 p-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  categoryId={category.id}
                  items={category.products}
                />
              ))}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
