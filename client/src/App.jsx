import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Cookies from 'js-cookie'


function App() {

  const [tab, setTab] = useState('home')
  const access_token = Cookies.get('ACCESS_TOKEN')

  useEffect(() => {
    if (access_token) {
      setTab('logout');
    } else {
      setTab('login');
    }
  }, [access_token]);

  function handleTab(tab) {
    setTab(tab);
  }

  return (
    <>

    <Header tab={tab} handleTab={handleTab}/>
    <Body tab={tab} handleTab={handleTab}/>

    </>

  );
}

export default App;
