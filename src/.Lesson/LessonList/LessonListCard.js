import React from 'react';
import { makeStyles } from '@material-ui/core';
import { convertEpochToDateString } from '../../.Utilities/helpers';
import { Link } from 'react-router-dom';
import MoreMenu from './MoreMenu';

const useStyles = makeStyles({
    card: {
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #ccc',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: '#eee',
      },
      textDecoration: "none",
    },
    link: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      textDecoration: "none",
      color: '#555',
    },
    cardLeft: {
      padding: "5px",
    },
    cardCenter: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '5px 0 5px 10px',
    },
    cardRight: {
      fontSize: '10px',
      color: '#ccc',
    },
    cardNumber: {
      zIndex: 110,
    },
    cardTitle: {
      fontSize: "14px"
    },
    cardDate: {
      zIndex: 110,
      color: '#999',
      fontSize: '11px',
    },
    media: {
      height: 140,
    },
});

const LessonListCard = (props) => {
  const classes = useStyles();
  
  return (
      <div className={classes.card}>
        <Link to={`/course/${props.courseId}/lesson/${props.lessonId}`} className={classes.link}>
          <div className={classes.cardLeft}>
            <div className={classes.cardNumber}>
              #{props.lesNum}
            </div>
          </div>
          <div className={classes.cardCenter}>
            <div className={classes.cardTitle}>{props.title}</div>
            <div className={classes.cardDate}>{convertEpochToDateString(props.date)}</div>
          </div>
        </Link>
        <div className={classes.cardRight}>
          <MoreMenu courseId={props.courseId} lessonId={props.lessonId} />
        </div>
      </div>
  );
}
 
export default LessonListCard;