import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import ToDoPage from "./ToDoPage"
import ParserList from "./ParserList"
import ParserItem from "./ParserItem"
import Other from "./Other"

const RouterPage = () => {
    return(
        <div>
            <div className="header">
                <Link className="page" to="/">Tab-1</Link>
                <Link className="page" to="/parser-page">Tab-2</Link>
            </div>
            <div>
                <Switch>
                    <Route exact path="/" component={ToDoPage} />
                    <Route exact path="/parser-page" component={ParserList} />
                    <Route path="/parser-page/parser-item/:timestamp" component={ParserItem} />
                    <Route component={Other} />
                </Switch>
            </div>
        </div>
    )
}

export default RouterPage;