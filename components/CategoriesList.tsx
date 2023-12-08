import Link from "next/link";
import { TCategory } from "@/app/types";

const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const response = await fetch(process.env.NEXTAUTH_URL + "/api/categories");

    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.error("Error Fetching Categories : ", error);
  }
  return null;
};

export const CategoriesList = async () => {
  const categories = await getCategories();

  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categories &&
        categories.map((category) => (
          <div key={category.id}>
            <Link
              className="px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer"
              href={`/category/${category.catName}`}
            >
              {category.catName}
            </Link>
          </div>
        ))}
    </div>
  );
};
