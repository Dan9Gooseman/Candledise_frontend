import { Box, BoxProps, Typography, styled } from "@mui/material";

const HeroContainer = styled(Box)<BoxProps>(() => ({
  width: "100%",
  backgroundColor: "#555555",
  color:"white",
  position:"relative"
}));
const HeroContent = styled(Box)<BoxProps>(() => ({
  position:"absolute",
  top:0,
  left:0,
  width:"100%",
  height:"100%",
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor: 'rgba(163, 139, 115, 0.4)',
  zIndex:10,
}))
const HeroTitle = styled(Typography)(() => ({
  display:"flex",
  fontSize:"64px",
  fontWeight:"700",
}));
export default function Hero() {
  return (
    // https://www.doftcandles.com/cdn/shop/files/Mobile_banner_1_x800.jpg?v=1709615131
    <HeroContainer>
      <img style={{ maxWidth: "100%", verticalAlign: "middle" }}  src="https://theme.hstatic.net/200000067478/1000857542/14/slideshow_1.jpg?v=196"></img>
      <HeroContent>
        <HeroTitle variant="h1">
            Natural Candles
        </HeroTitle>
        <Typography variant="subtitle1" sx={{fontSize:"24px"}} >Non-toxic, clean-burning and environmental-friendly for your heart and home</Typography>
      </HeroContent>
    </HeroContainer>
  );
}
