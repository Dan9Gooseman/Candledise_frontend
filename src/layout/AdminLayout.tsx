import {
  BoxProps,
  Container,
  CssBaseline,
  Grid,
  styled
} from "@mui/material";
import SideBar from "../component/SideBar";
import TopBar from "../component/TopBar";
import RouteProtector from "../routes/RouteProtector";

const CustomGridItem = styled(Grid)<BoxProps>(({ theme }) => ({
  display: "block",
  width:"100%+20px",
  maxHeight: "100vh",
  overflow: "hidden",
  position: "relative",
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
  scrollbarGutter: "stable",
  "&:hover": {
    overflowY: "scroll",
  },
  "&::-webkit-scrollbar": {
    position: "absolute",
    right:0,
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "rgb(249, 250, 251)",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgb(100,100,255)",
    borderRadius: "6px",
  },
}));

const AdminLayout = () => {
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth={"xl"}
        disableGutters
        sx={{ backgroundColor: "rgb(249, 250, 251)", height: "100vh" }}
      >
        <Grid container >
          <CustomGridItem item lg={2}>
            <SideBar/>
          </CustomGridItem>
          <Grid item lg={10} xs={12} >
            <TopBar/>
            {/* Outlet */}
            <RouteProtector/>  
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminLayout;
