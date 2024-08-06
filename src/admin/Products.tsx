import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";

import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useProducts from "../hook/useProduct";
import IProduct from "../interface/product";

const Products = () => {
  const { products, deleteProduct } = useProducts();

  const [arrayProducts, setArrayProducts] = useState<IProduct[]>([]);

  // const Delete = async (id: string) => {
  //   if( confirm("Delete ?")) {
  //     try {
  //       const response = await fetch(`http://localhost:3000/products/${id}`, {
  //         method:"Delete",
  //       });
  //       setArrayProducts(arrayProducts.filter(pro => pro._id !== id))
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  useEffect(() => {
    if (products && products.length > 0) {
      setArrayProducts(products);
    }
  }, [products]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:"center", marginRight:"1.5em" }}>
        <Typography variant="h4" sx={{ my: "0.5em" }}>
          Hi, welcome to Products
        </Typography>
        <Link href="/admin/products/create" sx={{textDecoration:"none", width:"4rem", color:"white", backgroundColor:"#1976d2", borderRadius:"5px", textAlign:"center"}}>Create product</Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">thumbnail</TableCell>
              <TableCell align="right">stock</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayProducts &&
              arrayProducts.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <img src={row.thumbnail} style={{ width: "100px" }}></img>
                  </TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="right">{row.category.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      component={RouterLink}
                      variant="contained"
                      to={`/admin/products/${row._id}`}
                      sx={{ width: "50px" }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        deleteProduct(row._id);
                        setArrayProducts(
                          arrayProducts.filter((pro) => pro._id !== row._id)
                        );
                      }}
                      sx={{ width: "50px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Products;
