import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../assets/AddAll.css'
import Button from '@material-ui/core/Button';
import Addtest from './Addtest'
import AddScore from './AddScore'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>문제 제목</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className ="makeStyles-root-171">
              <input value={props.title} onChange={e => props.setTitle(e.target.value)}></input>
              </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>테스트케이스(input,output)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Addtest setTestcase={props.setTestcase}></Addtest>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>점수(input,output)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <AddScore setScore={props.setScore}></AddScore>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Button onClick={()=>{alert("등록완료")}} variant="contained" color="primary" disableElevation>
            저장
        </Button>
    </div>
  );
}

