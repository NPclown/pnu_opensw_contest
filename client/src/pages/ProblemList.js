import React, {useState,useEffect} from 'react';
import Axios from 'axios'
import '../assets/problemList.css'
import { Link , Redirect} from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
function ProblemList(props) {

    const [state,setState]=useState({data:{}, isLoading:true})

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

    return state.isLoading ? (
      <div className="loading">
          <div>로딩중</div>
      </div>
      )  :
      (
        <div className="App">
            <div className="header">
                문제 목록
                <Button className="add-button" variant="secondary">
                    문제추가
                </Button>
            </div>  
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>문제 번호</th>
                    <th>문제 이름</th>
                    </tr>
                </thead>
                {state.data.map((list, index)=>{
                return(
                <tbody>
                    <tr>
                    <td>{list.id}</td>
                    <Link to = {`/${list.id}`} key={index}>
                    <td>{list.name}</td>
                    </Link>
                    </tr>
                </tbody>
                )   
                })}                
            </Table>
        </div>
  );
}
export default ProblemList;

    
