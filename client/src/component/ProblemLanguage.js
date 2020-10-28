
import React, {useState,useEffect} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Collapse from 'react-bootstrap/Collapse'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const ProblemLanguage = (props) =>{
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'C', value: '1' },
        { name: 'Python', value: '2' },
        { name: 'Java', value: '3' },
      ];
    return(
       <>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)
            }
            onClick={()=>props.setLanguage(radios[idx].value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    )
}
export default ProblemLanguage;



