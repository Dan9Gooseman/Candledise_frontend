import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import IProduct from "../interface/product";
import { useEffect, useState } from "react";
import LinearIndeterminate from "../component/LinearIndeterminate";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser from "../hook/useUser";

const ProductDetailContainer = styled(Box)<BoxProps>(() => ({
  color: "black",
  backgroundColor: "#FFFBDA",
  padding: "3em 0",
}));

const ProductInfo = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100%",
  width: "80%",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "80%",
  },
  [theme.breakpoints.down("lg")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ProductDetailTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 400,
  textAlign: "center",
  margin: "1.5em 0",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "50%",
    textAlign: "left",
  },
}));

const ProductDetailPrice = styled(Typography)(({ theme }) => ({
  color: "#666666",
  fontSize: "18px",
  paddingBottom: "1.5em",
  marginBottom: "1.5em",
  borderBottom: "1px solid #666666",
  display: "block",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ProductDetailButton = styled(Button)<ButtonProps>(() => ({
  width: "100%",
  margin: "1em 0",
  textTransform: "uppercase",
  height: "50px",
}));

const ProductDetail = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const increQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };
  type formInput = {
    product: string;
    quantity: number;
  };
  const { register, handleSubmit, setValue } = useForm<formInput>({
    defaultValues: {
      product: product?._id || "",
      quantity: 1,
    },
  });
  const fetchOneProduct = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:3000/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            setProduct(data.data);
            setValue("product", data.data._id);
            setLoading(false);
          }, 3000);
        });
    } catch (err) {
      console.error(err);
    }
  };
  const addToCart: SubmitHandler<formInput> = async (data) => {
    console.log({
      userID: user?._id,
      products: [{ ...data, currentPrice: product?.price }],
    });
    // const cartWithItem:CartItem = {}
    // cartID: 66b0e1902570f3f2ca52290d
  };
  useEffect(() => {
    fetchOneProduct();
  }, []);
  useEffect(() => {
    setValue("quantity", quantity);
  }, [quantity]);
  return (
    <>
      {isLoading && <LinearIndeterminate />}
      {product && (
        <Container maxWidth={"xl"} disableGutters>
          <ProductDetailContainer>
            <Grid container columnSpacing={{ lg: 4 }}>
              <Grid item xs={12} lg={6}>
                <Box sx={{ display: "flex", justifyContent: "right" }}>
                  <Box
                    component="img"
                    sx={{ width: { xs: "100%", lg: "80%" } }}
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ProductInfo>
                  <ProductDetailTitle variant="h1">
                    {product.title}
                  </ProductDetailTitle>
                  <ProductDetailPrice>${product.price}</ProductDetailPrice>
                  <form onSubmit={handleSubmit(addToCart)}>
                    <input
                      className=""
                      type="text"
                      readOnly
                      hidden
                      value={product._id}
                      {...register("product")}
                    ></input>
                    <Box sx={{ display: "flex" }}>
                      <button
                        className="quantity__btn quantity__btn--1"
                        type="button"
                        onClick={() => decreQuantity()}
                      >
                        -
                      </button>
                      <input
                        className="quantity__input"
                        type="text"
                        readOnly
                        value={quantity}
                        {...register("quantity", { min: 1, max: 50 })}
                      />
                      <button
                        className="quantity__btn quantity__btn--2"
                        type="button"
                        onClick={() => increQuantity()}
                      >
                        +
                      </button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginBottom: "1em",
                      }}
                    >
                      <ProductDetailButton
                        type="submit"
                        variant="outlined"
                        sx={{
                          backgroundColor: "#ED9455",
                          color: "white",
                          borderColor: "#ED9455",
                        }}
                      >
                        Add to cart
                      </ProductDetailButton>
                    </Box>
                  </form>
                  <Typography component={"p"}>{product.description}</Typography>
                </ProductInfo>
              </Grid>
            </Grid>
          </ProductDetailContainer>
        </Container>
      )}
    </>
  );
};

export default ProductDetail;
