import {
  Box,
  Button,
  ButtonProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import useCategory from "../hook/useCategory";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form } from "react-router-dom";
import useProducts from "../hook/useProduct";

const FormTextField = styled(TextField)({
  marginTop: "1.5em",
  "& input:valid + fieldset": {
    borderColor: "black",
    borderWidth: 1,
  },
  "& input:hover": {
    borderColor: "#ED9455",
    borderWidth: 1,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 1,
  },
  "& input:valid:focus + fieldset": {
    borderColor: "#ED9455",
    borderLeftWidth: 4,
    padding: "4px !important", // override inline-style
  },
});
const FormButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  backgroundColor: "#ED9455",
  "&:hover": {
    backgroundColor: "#FE8344",
  },
  marginTop: "1.5rem",
  width: "100%",
}));
type TInput = {
  title: string;
  rate: number;
  description: string;
  scent: string;
  price: number;
  stock: number;
  active: boolean;
  thumbnail: string;
  category: {
    _id: string;
    name: string;
  };
};
const CreateProduct = () => {
  const { createProduct } = useProducts();
  const { categories } = useCategory();

  const Validate = {
    title: { required: { value: true, message: "must have value" } },
    rate: { required: { value: true, message: "must have value" } },
    description: { required: { value: true, message: "must have value" } },
    scent: { required: { value: true, message: "must have value" } },
    price: { required: { value: true, message: "must have value" } },
    stock: { required: { value: true, message: "must have value" } },
    active: { required: { value: true, message: "must have value" } },
    thumbnail: { required: { value: true, message: "must have value" } },
    category: { required: { value: true, message: "must have value" } },
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm<TInput>({
    defaultValues: {
      title: "",
      rate: 1,
      description: "",
      scent: "",
      price: 1,
      stock: 1,
      active: true,
      thumbnail: "",
      category: { _id: "", name: "" },
    },
  });
  const onCreate: SubmitHandler<TInput> = async (data: TInput) => {
    const dataToCreate = { ...data, category: data.category._id };
    createProduct(dataToCreate);
  };
  const watchThumbnailURL = watch("thumbnail", "");
  const watchTitle = watch("title", "");
  useEffect(() => {
    // fetchCurrentProductData(id as string);
  }, []);
  return (
    <>
      <Box sx={{ marginBottom: "3em" }}>
        <Typography variant="h4" sx={{ my: "0.5em" }}>
          Updating: {watchTitle}
        </Typography>
        <Form onSubmit={handleSubmit(onCreate)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Box>
                <FormTextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  type="text"
                  InputLabelProps={{ style: { color: "black" } }}
                  {...register("title", Validate.title)}
                  {...field}
                />
                <Box sx={{ height: "20px" }}>
                  {errors.title && (
                    <Typography color={"#ff1111"}>
                      {errors.title.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
          <Controller
            name="rate"
            control={control}
            render={({ field }) => (
              <Box>
                <FormTextField
                  fullWidth
                  label="rate"
                  variant="outlined"
                  type="text"
                  InputLabelProps={{ style: { color: "black" } }}
                  {...register("rate", Validate.rate)}
                  {...field}
                />
                <Box sx={{ height: "20px" }}>
                  {errors.rate && (
                    <Typography color={"#ff1111"}>
                      {errors.rate.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Box>
                <FormTextField
                  fullWidth
                  label="description"
                  variant="outlined"
                  type="text"
                  InputLabelProps={{ style: { color: "black" } }}
                  {...register("description", Validate.description)}
                  {...field}
                />
                <Box sx={{ height: "20px" }}>
                  {errors.description && (
                    <Typography color={"#ff1111"}>
                      {errors.description.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
          <Controller
            name="scent"
            control={control}
            render={({ field }) => (
              <Box>
                <FormTextField
                  fullWidth
                  label="scent"
                  variant="outlined"
                  type="text"
                  InputLabelProps={{ style: { color: "black" } }}
                  {...register("scent", Validate.scent)}
                  {...field}
                />
                <Box sx={{ height: "20px" }}>
                  {errors.scent && (
                    <Typography color={"#ff1111"}>
                      {errors.scent.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Box>
                <FormTextField
                  fullWidth
                  label="price"
                  variant="outlined"
                  type="text"
                  InputLabelProps={{ style: { color: "black" } }}
                  {...register("price", Validate.price)}
                  {...field}
                />
                <Box sx={{ height: "20px" }}>
                  {errors.price && (
                    <Typography color={"#ff1111"}>
                      {errors.price.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <Box>
                <FormTextField
                  fullWidth
                  label="stock"
                  variant="outlined"
                  type="text"
                  InputLabelProps={{ style: { color: "black" } }}
                  {...register("stock", Validate.stock)}
                  {...field}
                />
                <Box sx={{ height: "20px" }}>
                  {errors.stock && (
                    <Typography color={"#ff1111"}>
                      {errors.stock.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <Box sx={{ my: "1.5em" }}>
                <InputLabel id="demo-simple-select-label">Active</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Active"
                  onChange={(e: SelectChangeEvent<string>) => {
                    field.onChange(e.target.value === "true");
                  }}
                  value={String(field.value)}
                >
                  <MenuItem value={"true"}>True</MenuItem>
                  <MenuItem value={"false"}>False</MenuItem>
                </Select>
              </Box>
            )}
          />
          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <Box sx={{ display: "flex" }}>
                {watchThumbnailURL && (
                  <img
                    src={watchThumbnailURL}
                    style={{ width: "100px", marginRight: "1em" }}
                  ></img>
                )}
                <FormTextField
                  fullWidth
                  label="thumbnail"
                  variant="outlined"
                  type="text"
                  InputLabelProps={{ style: { color: "black" } }}
                  {...register("thumbnail", Validate.thumbnail)}
                  {...field}
                />
                <Box sx={{ height: "20px" }}>
                  {errors.thumbnail && (
                    <Typography color={"#ff1111"}>
                      {errors.thumbnail.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Box sx={{ my: "1.5em" }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="category"
                  onChange={(e: SelectChangeEvent<string>) => {
                    const selectedCategory = categories.find(
                      (cat) => cat._id === e.target.value
                    );
                    field.onChange(selectedCategory || { _id: "", name: "" });
                  }}
                  value={field.value ? field.value._id : ""}
                >
                  {categories &&
                    categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            )}
          />
          <FormButton variant="contained" type="submit">
            Create
          </FormButton>
        </Form>
      </Box>
    </>
  );
};

export default CreateProduct;
