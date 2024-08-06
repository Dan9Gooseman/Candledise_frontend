import { Container, CssBaseline } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../component/NavBar";
import Hero from "../component/Hero";
import Footer from "../component/Footer";

const ClientLayout = () => {
  const location = useLocation()
  return (
    <>
      <CssBaseline />
      <Container maxWidth={"xl"} disableGutters>
        <NavBar></NavBar>
        {location.pathname==="/shopping-cart" ? "" : <Hero></Hero>}
        <Outlet />
        <Footer />
      </Container>
    </>
  );
};
export default ClientLayout;

        {/* who are we ? */}
        {/* what do we offer */}
        {/* Best selling */}
        {/* All time favourite */}
        {/* banner */}
        {/* Custommer Feedback */}
        {/* Call to action  */}