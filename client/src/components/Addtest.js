import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    testcaseBox : {
        width:'415px',
        height : '30px',
        fontSize : '16px'
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

function Addtest(props) {
    const [inputList, setInputList] = useState(props.testcase);
    const classes = useStyles();

    // handle input change
    const handleInputChange = (e, index) => {
        e.preventDefault()
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        props.setTestcase(list)
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        props.setTestcase(list)
    };
    
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { input: "",output:""}]);
    };
  
    return(
        <div className="TestCaseModal">
            {inputList.map((x, i) => {
            return (
                <div className="box" key={i}>
                <input
                    className={classes.testcaseBox}
                    name="input"
                    placeholder="Input"
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
    )
}
export default Addtest;

