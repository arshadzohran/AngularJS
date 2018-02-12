import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Datamap from '../charts/datamap';
import EditorBubbleChart from 'material-ui-next/SvgIcon/editor/bubble-chart';
import Avatar from 'material-ui/Avatar';
import MoreVertIcon from 'material-ui-next/SvgIcon/navigation/more-vert';
import Progress from '../charts/progress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/Button';
// import ActionTimeline from 'material-ui-next/SvgIcon/action/timeline';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {yellow700, red900, green700} from 'material-ui/styles/colors';

import Charts from '../charts/chart';

import * as styles from './dashboards.css';

import statesDefaults from '../charts/chart-data';

// Store
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

// Actions
import * as Actions from '/src/app/searchlight/SearchlightActions';

const dashStyle = {
  height: 550,
  width: 950,
  margin: 20,
  display: 'inline-block',
};

const sideStyle = {
  height: 550,
  width: 250,
  margin: 20,
  display: 'inline-block',
};

const bottomStyle = {
  height: 550,
  width: 1535,
  margin: 20,
  display: 'inline-block',
};

const logoimg = 'https://s3.amazonaws.com/public-image-test/360i-logo.png';
const jlimg = 'http://pics.360i.com/static/img/justin.livingston/resized/map-secondary';
const khimg = 'http://pics.360i.com/static/img/kenneth.hamner/resized/map-secondary';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    searchlightMetrics: [],
  }

  static propTypes = {
    getSearchlightMetrics: React.PropTypes.func,
  };

  componentWillMount() {
    this.props.getSearchlightMetrics();
  }

  render() {
    return (
      <div>
        <div className={styles.topRow}>
          <Paper style={dashStyle} zDepth={1}>
            <div className={styles.header}>
              <h3 style={{marginBottom: 0}}>
                Account Updates
                <MoreVertIcon
                  style={{
                    color: '#E0E0E0',
                    height: '45px',
                    width: '45px',
                    float: 'right',
                    display: 'inline-block',
                    paddingRight: '1%',
                  }}
                  />
              </h3>
              <p style={{marginTop: '2px'}}>
                Get the latest updates across all of your campaigns in progress
              </p>
            </div>
            <div className={styles.context}>
              <div className={styles.maps}>
                <p>Active Overview</p>
                <Datamap
                  scope="usa"
                  geographyConfig={{
                    highlightColor: '#D4E157',
                    popupTemplate: (geography, data) =>
                      `<div class='hoverinfo'>${geography.properties.name}\n\nData: ${data.value}`
                  }}
                  data={statesDefaults}
                  labels
                />
              </div>
              <div className={styles.overview}>
                <p>JCPenney Overview</p>
                <Progress
                  className={styles.progress}
                  chartId="progress1Chart"
                  label="Series 1 progress"
                />
                <Progress
                  className={styles.progress}
                  chartId="progress2Chart"
                  label="Series 2 progress"
                  />
              </div>
              <FloatingActionButton className={styles.report}>
                {/* <ActionTimeline /> */}
              </FloatingActionButton>
            </div>
          </Paper>
          <Paper style={sideStyle} zDepth={1}>
            <div className={styles.header}>
              <h3 style={{marginBottom: 0}}>Issue Tracker</h3>
              <p style={{marginTop: '2px'}}>Week of 3/2/2017</p>
            </div>
            <div className={styles.issues}>
              <ul>
                <h3 style={{ color: red900 }}>URGENT</h3>
                <li>Make Money</li>
                <li>Spend Money</li>
                <li>Make More Money</li>
              </ul>
              <Divider />
              <ul>
                <h4 style={{ color: yellow700 }}>IMMEDIATE</h4>
                <li>Finish searchlight</li>
                <li>Fill out radius</li>
                <li>Incorporate Active Directory</li>
              </ul>
              <Divider />
              <ul>
                <h4 style={{ color: green700 }}>UPCOMING</h4>
                <li>Add more clients to radius</li>
                <li>Make money</li>
                <li>Make more money</li>
              </ul>
            </div>
          </Paper>
          <Paper style={sideStyle} zDepth={1}>
            <div className={styles.header}>
              <h3 style={{marginBottom: 0}}>Team Members</h3>
              <p style={{marginTop: '2px'}}>JCPenney Media Team</p>
            </div>
            <List>
              <ListItem className={styles.listItem} leftAvatar={
                  <Avatar src={logoimg} size={50} />
                }>
                Cheryl Edwards
              </ListItem>
              <ListItem style={{marginTop: '15%'}} leftAvatar={
                  <Avatar src={jlimg} size={50} />
                }>
                Justin Livingston
              </ListItem>
              <ListItem style={{marginTop: '15%'}}  leftAvatar={
                  <Avatar src={khimg} size={50} />
                }>
                Kenneth Hamner
              </ListItem>
              <ListItem style={{marginTop: '15%'}}  leftAvatar={
                  <Avatar src={logoimg} size={50} />
                }>
                Alecia Riehle
              </ListItem>
            </List>
            <FlatButton
              className={styles.flatButton}
              style={{ marginTop: '25%', marginLeft: '5%' }}
              label="Add a New Team Member" />
          </Paper>
        </div>
        <div className={styles.topRow}>
          <Paper
            style={bottomStyle}
            zDepth={1}>
            <Charts
              className={styles.chart}
              metrics={this.props.searchlightMetrics} />
          </Paper>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    searchlightMetrics: state.searchlight.investmentDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
