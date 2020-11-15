import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Modal} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        width : '735px',
        fontSize : '16px'
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
    },
    testcaseBox : {
        width:'415px',
        height : '30px',
        fontSize : '16px'
    },
    modalContent : {
        width: '735px !important',
        marginLeft : '-70px'
    },
    ml10 : {
        marginLeft : '10px',
        height : '30px',
        fontSize : '16px'
    },
    mr10 : {
        marginRight : '10px',
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
        aria-describedby="simple-modal-description" className={classes.modalContent}>
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
                    <TableCell size='medium'>{props.data.sample.schema}</TableCell>
                    <TableCell size='medium'>output</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.data.sample.testcase.map((testcase, index)=>{
                return(
                    <TableRow key={index}>
                        <TableCell size='medium'>{testcase.input}</TableCell>
                        <TableCell size='medium'>{testcase.output}</TableCell>
                    </TableRow>
                )})}  
                </TableBody>
                </Table>

            {inputList.map((x, i) => {
            return (
                <div className="box" key={i}>
                <input
                    className={classes.testcaseBox}
                    name="input"
                    placeholder={props.data.sample.schema}
                    value={x.input}
                    onChange={e => handleInputChange(e, i)}
                />
                <input
                    className={classes.ml10}
                    name="output"
                    placeholder="Output"
                    value={x.output}
                    onChange={e => handleInputChange(e, i)}
                />
                    {inputList.length !== 1 && <Button
                    className={classes.mr10}
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

