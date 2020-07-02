import React from 'react';
import { Card, CardActionArea, CardContent, Typography, makeStyles } from '@material-ui/core';
import { convertEpochToDateString } from '../../.Utilities/helpers';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
    card: {
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      padding: '5px',
      color: '#333',
      borderBottom: '1px solid #ccc',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: '#eee',
      }
    },
    cardLeft: {
      zIndex: 110,
      padding: '5px',
    },
    cardCenter: {
      zIndex: 110,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '5px 0 5px 10px',
    },
    cardRight: {
      zIndex: 110,
      fontSize: '10px',
      color: '#ccc',
    },
    cardNumber: {
      zIndex: 110,
    },
    cardTitle: {
      zIndex: 110,
    },
    cardDate: {
      zIndex: 110,
      color: '#999',
      fontSize: '12px',
    },
    media: {
      height: 140,
    },
});

const LessonListCard = (props) => {
  const classes = useStyles();
  
  return (
      <div className={classes.card}>
        <div className={classes.cardLeft}>
          <div className={classes.cardNumber}>
            #{props.lesNum}
          </div>
        </div>
        <div className={classes.cardCenter}>
          <div className={classes.cardTitle}>{props.title}</div>
          <div className={classes.cardDate}>{convertEpochToDateString(props.date)}</div>
        </div>
        <div className={classes.cardRight}>
          <MoreIcon />
        </div>
      </div>
  );
}
 
export default LessonListCard;