import AdbIcon from "@mui/icons-material/Adb";
import {
    Box,
    Link,
    ListItemButton,
    Typography
} from "@mui/material";
import { useLocation } from "react-router-dom";

const managePage = ["Dashboard", "Users", "Products", "Orders", "Sales"];

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Box sx={{ display: "flex", padding: "2em" }}>
        <AdbIcon
          sx={{
            display: { xs: "none", md: "flex" },
            mr: 1,
            color: "rgb(100,100,255)",
          }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "rgb(100,100,255)",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "1em"}}>
        {managePage.map((page) => (
          <Link
            key={page}
            href={"/admin/" + page.toLowerCase()}
            sx={{ display: "block", textDecoration: "none", color: "grey" }}
          >
            <ListItemButton
              selected={
                pathname === "/admin/" + page.toLowerCase() ? true : false
              }
            >
              {page}
            </ListItemButton>
          </Link>
        ))}
      </Box>
    </>
  );
};

export default SideBar;
