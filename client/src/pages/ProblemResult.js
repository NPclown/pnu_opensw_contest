import React, {useState,useEffect} from 'react';
import '../assets/main.css';
import SplitPane, { Pane } from 'react-split-pane';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Row, Col,Container} from 'react-bootstrap';
import TestCaseModal from './TestCaseModal';
import ProblemCode from './ProblemCode';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import Problem from './Problem';
import ProblemTitle from '../component/ProblemTitle'
import ProblemLanguage from '../component/ProblemLanguage'
import Axios from 'axios';

function ProblemResult(props) {

    return(
        <div className="PorblemResult">
            <div className="codestyle">
              소스결과
            </div>
            
        </div>

      
  );
}
export default ProblemResult;


