import React from 'react';
import { Card, CardActionArea, CardContent, Typography, makeStyles } from '@material-ui/core';
import { convertEpochToDateString } from '../HyphenLesson/helpers';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: '10px',
      textDecoration: 'none',
    },
    media: {
      height: 140,
    },
});
 // props: title
const LessonListCard = (props) => {
  const classes = useStyles();
  
  return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Date: {convertEpochToDateString(props.date)}
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