import React from 'react'
import Split from 'react-split';
import { TabContent, TabPane, Nav, NavItem, NavLink, Table, Button } from 'reactstrap';

function AddProblem(){
    return(
        <Split
        direction="horizontal"
        sizes={[50, 50]}
        minSize={0}
        gutterSize={12}
        className="split-parent-horizontal"
        >
        <div className="problem-pane">
          문제치시오
        </div>
        <Split direction="vertical" sizes={[70, 30]} minSize={[100, 0]} gutterSize={4}>
        <div>
            여기는 코드치시오
        </div>
        <TabPane>
            여기는 결과
        </TabPane>
        </Split>
      </Split>
    )
}

export default AddProblem;
