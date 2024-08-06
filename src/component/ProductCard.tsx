import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IProduct from '../interface/product';

type ProductCardProps = {
  product: IProduct
}

export default function ProductCard({product}: ProductCardProps) {

  return (
    <Card sx={{":hover":{scale:"1.05"}, transition:"scale 0.3s ease"}}>
      <CardMedia
        component="img"
        alt={product.title}
        image={product.thumbnail}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div" sx={{height:"4em", ":hover":{textDecoration:"underline"}}}>
            {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{marginTop:"0.5em"}}>
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}