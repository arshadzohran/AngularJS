import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 250,
  width: 250,
  margin: 50,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: '#FFF',
};

const ClickPaper = (props) => (
  <Paper style={style} zDepth={1}>
    <p className="paper-message">
      {props.message}
    </p>
    {props.children}
  </Paper>
);

export default ClickPaper;
