import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token")
  let parsedToken : string | null
  token ? parsedToken = JSON.parse(token) : null
  const navigator = useNavigate();
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        headers: {},
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteProduct = async (id: string) => {
    if (confirm("Delete ?")) {
      try {
        await fetch(`http://localhost:3000/products/${id}`, {
          method: "Delete",
          headers:{
            authorization:`bearer ${parsedToken}`
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  };
  const updateProduct = async (id:string,dataToUpdate:any) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "put",
        body: JSON.stringify(dataToUpdate),
        headers: {
          "Content-Type": "application/json",
          authorization:`bearer ${parsedToken}`
        },
      });
      if (response.ok) {
        if (confirm("Updated, go back to products ?")) {
          navigator("/admin/products");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const createProduct = async (dataToCreate:any) => {
    try {
      const response = await fetch(`http://localhost:3000/products`, {
        method: "post",
        body: JSON.stringify(dataToCreate),
        headers: {
          "Content-Type": "application/json",
          authorization:`bearer ${parsedToken}`
        },
      });
      if (response.ok) {
        if (confirm("Created, go back to products ?")) {
          navigator("/admin/products");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, deleteProduct, updateProduct,createProduct };
};

export default useProducts;
