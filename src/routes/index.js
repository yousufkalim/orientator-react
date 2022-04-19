import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../containers/Home.js";
import Login from "../containers/Login";
import CGU from "../containers/CGU";
import Confidential from "../containers/Confidential";
import MentionsLegal from "../containers/MentionsLegal";
import Blog from "../containers/Blog";
import Videos from "../containers/Videos";
import Article from "../containers/Article";
import Admin from "./Admin";

const index = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/CGU" component={CGU} />
      <Route exact path="/confidentialite" component={Confidential} />
      <Route exact path="/MentionsLegal" component={MentionsLegal} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/channel" component={Videos} />
      <Route exact path="/blog/:id" component={Article} />
      <Route exact path="/*" render={() => <Admin />} />
    </Switch>
  );
};

export default index;
