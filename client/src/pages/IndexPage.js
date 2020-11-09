import React ,{useState,useEffect} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import Spacer from '../components/Spacer';
import Axios from 'axios';
import workspace from '../components/Workspace'

function IndexPage (props) {
  const [state,setState]=useState({data:[], isLoading:true})

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
        <h1>Problem List!</h1>
        <div className="d-flex flex-wrap">
        {state.data.map((list, index)=>{
          return(
            <CardBody>
              <CardTitle className="font-weight-bold">{list.name}</CardTitle>
              <Link to={`/workspace/${list.id}`}><Button>Open</Button></Link>
              <Spacer width={6} />
            </CardBody>
            ) })}
        </div>
      </div>
        )
}

export default IndexPage;
