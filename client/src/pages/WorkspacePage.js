import React, { useState,useEffect } from 'react';
import Split from 'react-split';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Problem from '../components/Problem';
import './WorkspacePage.css';
import Workspace from '../components/Workspace';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function WorkspacePage(props){
  const [state,setState]=useState({data:{}, isLoading:true})
  const classes = useStyles();

  useEffect(() => {
    const getData = async() => {
        try{
            var result = await Axios.get(`/api/workbooks/${props.match.params.id}`);
            setState({data : result.data.data.items, isLoading:false})
        } catch(error) {
            alert(error)
            setState({data : {}, isLoading:true})
        }
    }
    getData();
  },[props.match.params.id])

  return state.isLoading ? (
    <div className={classes.root}>
      <CircularProgress />
    </div>
    ) : (
    <Split
    direction="horizontal"
    sizes={[50, 50]}
    minSize={0}
    gutterSize={12}
    className="split-parent-horizontal"
    >
      <div className="problem-pane">
        <Problem cont={state.data.cont} />
      </div>
      <Workspace id = {props.match.params.id} data = {state.data}/>
    </Split>
  )
}

export default WorkspacePage;

