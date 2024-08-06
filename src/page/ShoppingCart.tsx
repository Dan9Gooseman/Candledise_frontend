import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "./ShoppingCart.scss";
import { useEffect, useState } from "react";
type cartDetailType = {
  product:string,
  quantity:number,
  _id: string
}
const ShoppingCart = () => {
  const cartIDLocal = localStorage.getItem("cartid");
  const [cartDetail, setCartDetail] = useState<cartDetailType[]>([]);

  useEffect(() => {
    // Define the asynchronous function inside useEffect
    const allCartItemOfUser = async (cartID: string) => {
      if (!cartID) {
        console.error("No cart ID found in localStorage");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/carts/${cartID}`);

        if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const itemList = await response.json();
        setCartDetail(itemList.products);
        console.log(itemList.products)

        // Update state with the fetched cart details
        setCartDetail(itemList);
      } catch (err) {
        console.error("Failed to fetch cart details:", err);
      }
    };

    allCartItemOfUser(cartIDLocal as string);
  }, [cartIDLocal]); // cartIDLocal is a dependency

  return (
    <>
      <Container
        maxWidth={"xl"}
        sx={{
          backgroundColor: "#FFFBDA",
          py: "2rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>PRODUCT</TableCell>
                  <TableCell align="right">PRICE</TableCell>
                  <TableCell align="right">QUANTITY</TableCell>
                  <TableCell align="right">TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {
                  cartDetail.map((item) => (
                    <TableRow key={item.product}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell align="right">PRICE</TableCell>
                      <TableCell align="right">QUANTITY</TableCell>
                      <TableCell align="right">TOTAL</TableCell>
                    </TableRow>
                  ))
                } */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box component={Paper} sx={{ minWidth: "20rem", padding: "0.5rem" }}>
          <Typography sx={{ borderBottom: "3px solid #ED9455" }}>
            Order summary
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              my: "1rem",
              justifyContent: "space-between",
              borderBottom: "1px solid lightgray",
            }}
          >
            <Typography>Subtotal</Typography>
            <Typography>${}</Typography>
          </Box>
          <Box>
            <form>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    marginBottom: "1rem",
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  Coupon Code
                </Typography>
                <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Enter Coupon code here"
                  defaultValue={""}
                />
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    my: "1rem",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>${}</Typography>
                </Box>
                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#ED9455",
                    ":hover": { backgroundColor: "#FE8344" },
                  }}
                  variant="contained"
                >
                  PROCEED TO CHECKOUT
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ShoppingCart;
