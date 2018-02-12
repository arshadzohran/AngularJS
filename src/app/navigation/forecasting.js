import React from 'react';
import ReactDOM from 'react-dom';
import ClickPaper from '../shared/Components/clickablePaper';
//import EditorShowChart from 'material-ui-next/SvgIcon/editor/show-chart';
import {grey400} from 'material-ui/styles/colors';
import CommunicationCallSplit from 'material-ui-next/SvgIcon/communication/call-split';
import { Link } from 'react-router';

const iconStyle = {
  height: '125px',
  width: '125px',
};

const titleStyle = {
  height: '45px',
  width: '45px',
  marginRight: '15px',
  paddingTop: '1%',
};

const textStyle = {
  fontSize: 28,
  fontFamily: 'Roboto',
  fontWeight: 400,
};

const Forecasting = () => (
  <div>
    <h2 style={textStyle}><CommunicationCallSplit style={titleStyle} />Forecasting Apps (4)</h2>
    <ClickPaper message="Basket Analyzer">
      <EditorShowChart style={iconStyle} color={grey400} />
    </ClickPaper>
    <ClickPaper message="Overwatch">
      <EditorShowChart style={iconStyle} color={grey400} />
    </ClickPaper>
    <ClickPaper message="Product Recommender">
      <EditorShowChart style={iconStyle} color={grey400} />
    </ClickPaper>
    <Link to="/forecasting/sl-landing">
      <ClickPaper
        message="Searchlight">
        <EditorShowChart
          style={iconStyle}
          color={grey400}
        />
      </ClickPaper>
    </Link>
  </div>
);

export default Forecasting;
