import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import Addtest from './Addtest'
import AddScore from './AddScore'

import '../assets/AddAll.css'

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
  const [title, setTitle] = useState(props.title);
  const [schema, setSchema] = useState(props.schema);
  const [testcase,setTestcase] =useState(props.testcase)
  const [score,setScore] =useState(props.score)

  const handleClick = (e) => {
    e.preventDefault()
    props.setTitle(title)
    props.setSchema(schema)
    props.setTestcase(testcase)
    props.setScore(score)
    const tmp = [...props.complete];
    tmp[0].state = true;
    props.setComplete(tmp)
    alert("등록 완료!")
  }

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
              <input value={title} placeholder="문제 제목" onChange={e => setTitle(e.target.value)}></input>
              </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>테스트케이스 입력 양식</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className ="makeStyles-root-171">
              <input value={schema} placeholder="string string" onChange={e => setSchema(e.target.value)}></input>
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
            
            <Addtest testcase={testcase} setTestcase={setTestcase}></Addtest>
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
            <AddScore score={score} setScore={setScore}></AddScore>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Button onClick={(e)=>{handleClick(e)}} variant="contained" color="primary" disableElevation>
            저장
        </Button>
    </div>
  );
}

