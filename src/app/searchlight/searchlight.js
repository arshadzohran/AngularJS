import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Charts from '/src/app/searchlight/Charts/Charts';
import ForecastSummary from '/src/app/searchlight/ForecastSummary/ForecastSummary';
import Grid from '/src/app/searchlight/Grid/grid';
import Toolbar from '/src/app/searchlight/Toolbar/Toolbar';
import { Link } from 'react-router';
import MetricUtils from '/src/app/shared/MetricUtils';

const fileDownload = require('react-file-download');

import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

import * as styles from './searchlight.css';

// Store
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

// Actions
import {
  getSearchlightMetrics,
  getSearchlightDefault,
  getSearchlightFormData,
  getSearchlightMetricFormat,
  applyMetricFilter,
  clearMetricFilter } from '/src/app/searchlight/SearchlightActions';

class Searchlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridView: false,
      chartView: true,
    }
  }

  static defaultProps = {
    metricFormat: {},
    searchlightMetrics: [],
    loadingBar: true,
    ecsFailures: false,
    apiFailure: false,
  };

  static propTypes = {
    clearMetricFilter: React.PropTypes.func,
    getSearchlightMetrics: React.PropTypes.func,
    getSearchlightDefault: React.PropTypes.func,
    searchlightMetrics: React.PropTypes.array,
    searchlightDefault: React.PropTypes.array,
    loadingBar: React.PropTypes.bool,
    ecsFailures: React.PropTypes.array,
    apiFailure: React.PropTypes.bool,
  };

  componentWillMount() {
    this.props.getSearchlightMetrics();
    this.props.getSearchlightDefault();
    this.props.getSearchlightFormData();
    this.props.getSearchlightMetricFormat();
  }

  handleGridClick(event) {
    this.setState({
      gridView: !this.state.gridView,
      chartView: !this.state.chartView,
    });
  }

  handleDownloadCrossCsvClick(event) {
    let metrics = this.props.searchlightMetrics;
    let csvData = MetricUtils.convertToCSV(metrics);
    fileDownload(csvData, 'crossSection.csv')
  }

  handleDownloadClick(event) {
    let metrics = this.props.searchlightDefault;
    let csvData = MetricUtils.convertToCSV(metrics);
    fileDownload(csvData, 'timeAllocation.csv');
  }


  render() {
    return (
      <div>
        <h2 className={styles.header}>
          <Link to="/forecasting" className={styles.breadcrumb}>Forecasting</Link> > Searchlight
        </h2>
        <ReactCSSTransitionGroup
          transitionName="loadingCircle"
          transitionEnterTimeout={0}
          transitionLeaveTimeout={300}>
          <div className={this.apiFailure && styles.hide}>
            <div className={!this.props.loadingBar && styles.hide}>
              <div className={styles.progressCircle}>
                <h3 className={styles.loadingHeader}>Crunching the numbers...</h3>
                <CircularProgress size={100} thickness={6} color="#0288D1" />
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="searchlight"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <div className={this.apiFailure && styles.hide}>
            <div className={this.props.loadingBar && styles.hide}>
              <div className={!this.props.apiFailure && styles.hide}>
                <h2>There was a problem running your optimization!</h2>
                <p>Please try again...</p>
              </div>
              <div className={!this.props.ecsFailures && styles.hide}>
                <h2>Your optimization failed to run!</h2>
                <p>Please contact an admin.</p>
              </div>
              <Paper
                className={styles.containerElement}
                zDepth={2}>
                <div className={styles.content}>
                  <div className={!this.state.gridView && styles.hide}>
                    <Grid
                      metrics={this.props.searchlightDefault}
                      metricFormat={this.props.metricFormat}
                      />
                  </div>
                  <div className={!this.state.chartView && styles.hide} style={{ width: '100%' }}>
                    <Charts metrics={this.props.searchlightDefault} />
                  </div>
                </div>
                <Toolbar
                  divisions={this.props.searchlightFormData.divisions}
                  efficiencyTypes={this.props.searchlightFormData.efficiencyTypes}
                  handleGridClick={this.handleGridClick.bind(this)}
                  handleApplyFilter={this.props.applyMetricFilter.bind(this)}
                  clearFilters={this.props.clearMetricFilter.bind(this)}
                  showGridView={this.state.gridView}
                  csvData={this.handleDownloadClick.bind(this)}
                  crossCsvData={this.handleDownloadCrossCsvClick.bind(this)}
                  />
                <ForecastSummary metrics={this.props.searchlightMetrics} timeAllocation={this.props.searchlightDefault} />
              </Paper>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    searchlightDefault: state.searchlight.metrics,
    searchlightMetrics: state.searchlight.untouchedMetrics,
    searchlightFormData: state.searchlight.formData,
    metricFormat: state.searchlight.metricFormat,
    loadingBar: state.loadingBar,
    ecsFailures: state.searchlight.ecsFailures,
    apiFailure: state.searchlight.apiFailure
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSearchlightMetrics,
    getSearchlightDefault,
    getSearchlightFormData,
    getSearchlightMetricFormat,
    applyMetricFilter,
    clearMetricFilter
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchlight);
