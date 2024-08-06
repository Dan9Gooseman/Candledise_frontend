import { useEffect, useState } from "react";
type TCategory = {
  _id: string;
  name: string;
};
const useCategory = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const fetchAllCategories = async () => {
    try {
      const response = await fetch(`http://localhost:3000/categories`);
      const categories = await response.json();
      setCategories(categories.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);
  return { categories };
};
export default useCategory;
