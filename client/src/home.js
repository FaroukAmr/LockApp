import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import img1 from "./images/img1.avif";
import img2 from "./images/img2.avif";
import img3 from "./images/img3.avif";
import './home.css'
import { useContext } from 'react';
import { UserContext } from './usercontext';
export default function Home() {
  const {value,setValue} = useContext(UserContext)
  return (

      <div id="cards" >
    <Card  sx={{ maxWidth: 345 }}>
        
      <CardActionArea href="/signIn">
        <CardMedia
          component="img"
          height="400"
          image={img1}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Lorem Ipsum
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Contrary to popular belief, Lorem Ipsum is not simply random text.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card  sx={{ maxWidth: 345 }}>
      <CardActionArea href="/searchflight">
        <CardMedia
          component="img"
          height="400"
          image={img2}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Lorem ipsum dolor sit amet.
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum neque eget ex elementum pellentesque. Suspendisse augue tortor, finibus in.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>
    <Card  sx={{ maxWidth: 345 }}>
      <CardActionArea href="/searchflight">
        <CardMedia
          component="img"
          height="400"
          image={img3}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>
    </div>
  );
}