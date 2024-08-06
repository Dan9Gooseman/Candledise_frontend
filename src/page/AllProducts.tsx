import { Box, BoxProps, Container, Grid, Link, styled } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import IProduct from "../interface/product";

const AllProductContainer = styled(Box)<BoxProps>(() => ({
  color: "black",
  backgroundColor: "#FFFBDA",
  padding: "3em 2em",
}));

const AllProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchAllProducts = async () => {
    await fetch("http://localhost:3000/products", {
      headers: {
        // Authorization: `Bearer ${token} `,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data)
        console.log(products);
        
      });
  };

  useEffect(() => {
      fetchAllProducts();
  }, []);


  return (
    <>
      <Container maxWidth={"xl"} disableGutters>
        <AllProductContainer>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 2, md: 3, lg: 4 }}
          >
            {/* print products */}
            {products.map((product) => (
              <Grid key={product._id} item xs={6} sm={4} lg={3}>
                <Link
                  sx={{ textDecoration: "none" }}
                  href={"/products/" + product._id}
                >
                  <ProductCard product={product} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </AllProductContainer>
      </Container>
    </>
  );
};
export default AllProducts;
