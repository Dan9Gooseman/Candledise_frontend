import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Container,
  Grid,
  Link,
  LinkProps,
  styled,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "react-router-dom";

const FooterContainer = styled(Box)<BoxProps>(() => ({
  width: "100%",
  color: "black",
  backgroundColor: "#FFFBDA",
}));

const FooterTitle = styled(Typography)<TypographyProps>(() => ({
  textTransform: "uppercase",
  fontSize: "20px",
  fontWeight: "400",
  margin:"1rem 0"
}));

const FooterLink = styled(Link)<LinkProps>(() => ({
  color: "black",
  textDecoration: "none",
}));

const FooterTextField = styled(TextField)({
  marginTop:"1.5em",
  '& input:valid + fieldset': {
    borderColor: 'black',
    borderWidth: 1,
  },
  '& input:hover': {
    borderColor:'#ED9455',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderColor:"#ED9455",
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },

});

const FooterButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  backgroundColor: "#ED9455",
  '&:hover': {
    backgroundColor: "#FE8344",
  },
  marginTop:"1.5rem"
}));

const links = [
  "About us",
  "Contact",
  "Terms of Service",
  "Shipping Policy",
  "Privacy Policy",
  "Refund Policy",
];

type InputType = {
    email:string
  };
  

const Footer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<InputType>();
    const onSubmit: SubmitHandler<InputType> = data => console.log(data);
  return (
    <>
      <FooterContainer>
        <Container maxWidth={"xl"} >
          <Grid container rowSpacing={1} columnSpacing={{ sm: 5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <FooterTitle variant="h2">About us</FooterTitle>
                <Typography>
                  X comes from Vietnam, wanting you to experience the world
                  through scents. X brings you sensuous natural fragrances,
                  handcrafted in timeless glass, that ignite a personal memory
                  of a moment gone by.{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "flex", justifyContent: { md: "center" }}}>
                <Box sx={{maxWidth:"10em", display:"flex", flexDirection:"column"}}>
                  <FooterTitle variant="h2">Legal</FooterTitle>
                  {/* LINKS */}
                  {links.map((link) => (
                    <FooterLink key={link} href={"/" + link.toLowerCase().replace(" ", "")}>{link}</FooterLink>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Box sx={{ display: "flex", alignItems: { md: "start" }, flexDirection: "column"}}>
                <Box sx={{ display: "flex", flexDirection: "column"}}>
                  <FooterTitle variant="h2" sx={{ marginBottom: "16px" }}>Newsletter</FooterTitle>
                  <Typography>Subscribe to receive updates, access to exclusive deals, and more.</Typography>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <FooterTextField fullWidth label="Email" variant="outlined" InputLabelProps={{style:{color:"black"}}} {...register("email",{required:true})} />
                    <Box sx={{height:"20px"}}>
                      {errors.email && <Typography color={"#ff1111"}>Please enter your email</Typography>}
                    </Box>
                    <FooterButton variant="contained" type="submit">Subscribe</FooterButton>
                  </Form>
                </Box>
              </Box>
            </Grid>
          </Grid>
        <FooterLink sx={{fontSize:"14px", display:"block", marginTop:"100px", py:"16px", borderTop:"1px solid black", textAlign:"center"}} href="/">Copyright © 2024 By X, All Rights Reserved.</FooterLink>
        </Container>
      </FooterContainer>
    </>
  );
};

export default Footer;
