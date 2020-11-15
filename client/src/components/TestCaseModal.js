import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow, Modal} from '@material-ui/core';
import '../assets/testcasemodal.css'

const useStyles = makeStyles((theme) => ({
    table: {
        width : '650px'
    },
    paper: {
        position: 'absolute',
        width: '750px',
        left: '600px',
        top : '200px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },    
    button : {
        marginTop : '30px',
        marginLeft : '300px'
    }
  }));

  
function TestCaseModal(props) {
    const [inputList, setInputList] = useState([{ input: "", output:""}]);
    const classes = useStyles();

    // handle input change
    const handleInputChange = (e, index) => {
        e.preventDefault()
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        props.setTestCase(inputList)
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        props.setTestCase(list)
    };
    
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { input: "",output:""}]);
    };
  
    return(
        <div className="TestCaseModal">
            <Modal open={props.show} onClose={() => props.setShow(false)} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
            <div className={classes.paper}>
                <div>
                    <div id="contained-modal-title-vcenter">
                        테스트 케이스 추가
                    </div>
                </div>
            <div className="show-grid">                  
                <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                    <TableCell>{props.data.sample.schema}</TableCell>
                    <TableCell>output</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.data.sample.testcase.map((testcase, index)=>{
                return(
                    <TableRow key={index}>
                        <TableCell>{testcase.input}</TableCell>
                        <TableCell>{testcase.output}</TableCell>
                    </TableRow>
                )})}  
                </TableBody>
                </Table>

            {inputList.map((x, i) => {
            return (
                <div className="box" key={i}>
                <input
                    className="testcase-box"
                    name="input"
                    placeholder={props.data.sample.schema}
                    value={x.input}
                    onChange={e => handleInputChange(e, i)}
                />
                <input
                    className="ml10"
                    name="output"
                    placeholder="Output"
                    value={x.output}
                    onChange={e => handleInputChange(e, i)}
                />
                    {inputList.length !== 1 && <Button
                    className="mr10"
                    variant="outlined" color="primary" size ='small'
                    onClick={() => handleRemoveClick(i)}>Remove</Button>}
                    {inputList.length - 1 === i && <Button variant="outlined" color="primary" size ='small' onClick={handleAddClick}>Add</Button>}
                </div>
            );
            })}
      </div>
      <div>
        <Button className={classes.button} variant="outlined" color="primary" size ='small' onClick={()=>props.setShow(false)} >Close</Button>
      </div>
      </div>
      </Modal>
      </div>
    )
}
export default TestCaseModal;

