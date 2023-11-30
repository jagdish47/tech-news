import { categoriesData } from "@/data";
import Link from "next/link";

export const CategoriesList = () => {
  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categoriesData &&
        categoriesData.map((category) => (
          <div key={category.id}>
            <Link
              className="px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer"
              href={`/category/${category.name}`}
            >
              {category.name}
            </Link>
          </div>
        ))}
    </div>
  );
};
