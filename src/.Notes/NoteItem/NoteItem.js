import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Avatar, makeStyles, Typography, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { red } from '@material-ui/core/colors';
import { convertEpochToDateTimeString } from '../../.Utilities/helpers';
import Linkify from 'react-linkify';
import MoreMenu from './NoteOptionsMenu';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '500px',
      margin: '10px 0'
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

const NoteItem = ({ note, teachers, students, courseId, index }) => {
    const classes = useStyles();
    const usersCombined = (teachers && students) ? [...teachers, ...students] : null;
    const date = convertEpochToDateTimeString(note.epoch);
    const [email, setEmail] = useState();

    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    useEffect(() => {
        let email = '';
        if (teachers) {
            teachers.map(el => {
                if (el.uid === note.user) {
                    email = el.email
                }
            })
        }
        setEmail(email);
    },[teachers])

    console.log(usersCombined);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="profile-pic" className={classes.avatar}>
                    CL
                    </Avatar>
                }
                action={
                  <MoreMenu courseId={courseId} index={index} note={note} />
                }
                title={email}
                subheader={date}
            />
      <CardContent>
        <Linkify componentDecorator={componentDecorator}>
            <Typography variant="body2" color="textSecondary" component="p">
                {note.body}
            </Typography>
        </Linkify>
      </CardContent>
    </Card>
    );
}

const mapStateToProps = state => {
    return {
        teachers: state.course.data.teachers,
        students: state.course.data.studens,
    }
}
 
export default connect(mapStateToProps,null)(NoteItem);