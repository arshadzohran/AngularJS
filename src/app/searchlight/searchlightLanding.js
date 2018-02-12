import React, { Component } from 'react';
import RecentList from '/src/app/searchlight/RecentList/RecentList';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/Button';

import Paper from 'material-ui/Paper';

import * as styles from './searchlightLanding.css';

// Store
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

// Actions
import {getRecentOptimizations} from '/src/app/searchlight/SearchlightActions';

class SearchlightLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridView: false,
      chartView: true,
    }
  }

  static defaultProps = {
    recentOptimizations: [],
  };

  static propTypes = {
    getRecentOptimizations: React.PropTypes.func,
    recentOptimizations: React.PropTypes.array,
  };

  componentWillMount() {
    this.props.getRecentOptimizations();
  }

  render() {
    return (
      <div>
        <h2 className={styles.header}>
          <Link to="/forecasting" className={styles.breadcrumb}>Forecasting</Link> > Searchlight
        </h2>
        <RaisedButton primary={true} className={styles.button}>
          <Link style={{ display: 'block', height: '100%', color: "white", backgroundColor: "#2E7D32", textDecoration: 'none', width: '250px' }} to="/forecasting/searchlight">
          Run Default Optimization
          </Link>
        </RaisedButton>
        <h2 className={styles.header2}>Recent Optimizations</h2>
        <div className={styles.recentListContainer}>
          <RecentList recentOpts={this.props.recentOptimizations} loadRecentOpts={this.props.loadMoreRecentOptimizations} hasMoreOpts={this.props.hasMoreOptimizations} />
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    recentOptimizations: state.searchlight.recents,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getRecentOptimizations}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchlightLanding);
