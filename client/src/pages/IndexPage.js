import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Spacer from '../components/Spacer';
import Axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: '250px',
    marginRight : '50px',
    marginBottom : '30px',
    border : '1px solid black'
  },
  title: {
    fontSize: 25,
    color : 'black'
  },
  row : {
    display: 'flex',
    marginLeft : '30px',
    flexWrap : 'wrap'
  },
  header : {
    marginLeft : '30px'
  },
  Link: {
    textDecoration : 'none'
  }
});


function IndexPage (props) {
  const [state,setState]=useState({data:[], isLoading:true})
  const classes = useStyles();

  useEffect(() => {
      const getData = async() => {
          try{
              var result = await Axios.get(`/api/workbooks`);
              setState({data: result.data.data.items, isLoading:false})
          } catch(error) {
              alert(error)
              setState({data : {}, isLoading:true})
          }
      }
      getData();
  },[])

  return (
    <div className="p-4 h-100" style={{ overflowY: 'auto' }}>
      <h1 className={classes.header}>Problem List!</h1>
      <div className={classes.row}>
      {state.data.map((list, index)=>{
        return(
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {list.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/workspace/${list.id}`} className={classes.Link}>
                <Button size="small" variant="outlined" color="primary">open</Button>
              </Link>
            </CardActions>
            <Spacer width={6} />
          </Card>
          ) })}
      </div>
    </div>
  )
}

export default IndexPage;
