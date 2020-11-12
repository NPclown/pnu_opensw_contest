import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import 'codemirror/lib/codemirror.css';
import AddEditor from '../components/AddEditor'
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddSourceEd from '../components/AddSourceEd'
import AddAll from '../components/AddAll'

// function TabPanel(props) {
//   const { children, value, index, boxClass, typoClass, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box className={boxClass} p={3}>
//           <Typography className={typoClass}>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     display: 'flex',
//     height: '100%',
//   },
//   tabs: {
//     borderRight: `1px solid ${theme.palette.divider}`,
//   },
//   TabPanel : {
//     width : '100%',
//     height : '100%'
//   },
//   Box : {
//     height : '100%'
//   },
//   Typo : {
//     height : '100%'
//   }
// }));



export default function AddProblem(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [title,setTitle] =useState("")
  const [cont,setCont] =useState("")
  const [testcase,setTestcase] =useState("")
  const [code,setCode] =useState("")
  const [init,setInit] =useState("")
  const [score,setScore] =useState("")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toBackendAdd = async(e) => {
    e.preventDefault()
    var result2;
        try{
            result2 = await Axios.post(`/api/workbooks`,{name:title, 
              cont:cont,inits:init, code: code, score: score,sample: testcase });
        } catch(error) {
            alert(error)
        }
    }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="문제이름" {...a11yProps(0)} />
        <Tab label="문제내용" {...a11yProps(1)} />
        <Tab label="테스트케이스" {...a11yProps(2)} />
        <Tab label="점수" {...a11yProps(5)} />
        <Tab label="제출하기" onClick ={(e)=>{toBackendAdd(e);alert("제출완료")}}{...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AddAll></AddAll>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddEditor value={value} setCont={setCont} placeholder= '문제를 작성해 주세요.'></AddEditor>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.TabPanel} boxClass={classes.Box} typoClass={classes.Typo}>
        <AddSourceEd value={value} setTestcase={setTestcase} placeholder= '테스트케이스를 작성해 주세요.'></AddSourceEd>
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.TabPanel} boxClass={classes.Box} typoClass={classes.Typo}>
        <AddSourceEd value={value} setScore={setScore} placeholder= '점수를 작성해 주세요.'></AddSourceEd>
      </TabPanel>
      <TabPanel index={6}>
        제출이 완료되었습니다.
      </TabPanel>
    </div>
  );
}
