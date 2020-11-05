import React, {useState} from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import '../assets/ProblemLanguage.css'
const ProblemLanguage = (props) =>{
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'c', value: 1 },
        { name: 'cpp', value: 2 },
        { name: 'python', value: 3 },
        { name: 'python3', value: 4 },
      ];
    return(
      <div className="problem-language">
       <>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={String(radio.value)}
              checked={radioValue ===String(radio.value)}
              onChange={(e) => setRadioValue(e.currentTarget.value)
            }
            onClick={()=>props.setLanguage({name:radios[idx].name, value:radios[idx].value})}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
      </div>
    )
    
}
export default ProblemLanguage;



