import React, {useState} from 'react';
import {Button} from '@material-ui/core';

function Addtest(props) {
    const [inputList, setInputList] = useState(props.testcase);

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
                    className="testcase-box"
                    name="input"
                    placeholder="input"
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
    )
}
export default Addtest;

