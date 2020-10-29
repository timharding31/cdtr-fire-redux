import React from 'react';
import { connect } from 'react-redux';
import './App.css';

const App = ({ log, firebase }) => {
    log();
    console.log(firebase);
  return (
      <>
      <p>test</p>
      </>
  );
}

const mstp = ({ firebase }) => ({
    firebase
});

const mdtp = dispatch => ({
    log: () => console.log(dispatch)
})



export default connect(mstp, mdtp)(App);
