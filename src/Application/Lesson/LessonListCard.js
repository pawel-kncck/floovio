import React from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: '10px'
    },
    media: {
      height: 140,
    },
});
 // props: title
const LessonListCard = (props) => {
    const classes = useStyles();
    const lessonDate = new Date(props.date.seconds * 1000)
    
    return (
        <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Date: {lessonDate.toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Number of exercises: {props.exrcNum}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    );
}
 
export default LessonListCard;