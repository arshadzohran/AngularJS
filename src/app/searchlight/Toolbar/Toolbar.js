import React, { Component } from 'react';

// Material
import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/Button';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

// Icons
// import AssessmentIcon from 'material-ui-next/SvgIcon/action/assessment';
// import EventIcon from 'material-ui-next/SvgIcon/action/event';
// import GetAppIcon from 'material-ui-next/SvgIcon/action/get-app';
// import ViewListIcon from 'material-ui-next/SvgIcon/action/view-list';

// Utilities
import MetricUtils from '/src/app/shared/MetricUtils';
import FilterMetricConstants from '/src/app/shared/FilterMetricConstants';
import moment from 'moment';

import DownloadButton from '/src/app/searchlight/Download/Download';

import * as styles from './Toolbar.css';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: '',
      division: null,
      endDate: null,
      startDate: null,
      efficiency_target: '',
      efficiency_type: null,
    };
  }

  static propTypes = {
    efficiencyTypes: React.PropTypes.array,
    divisions: React.PropTypes.array,
    handleGridClick: React.PropTypes.func,
    showGridView: React.PropTypes.bool,
  };

  static defaultProps = {
    efficiencyTypes: [],
    divisions: [],
  };

  formatDate = (thisDate) => moment(thisDate).format('M/D/Y');

  handleBudgetChange(event, budget) {
    this.setState({budget: budget});
  }
  handleDivisionChange = (event, index, division) => this.setState({division});
  handleEndDateChange = (event, endDate) => this.setState({endDate});
  handleStartDateChange = (event, startDate) => this.setState({startDate});
  handleTypeChange = (event, index, efficiency_type) => this.setState({efficiency_type});
  handleTargetChange = (event, efficiency_target) => this.setState({efficiency_target});

  handleApplyClick(event) {
    const filters = {
      budget: this.state.budget,
      filters: MetricUtils.divisionToCombo(this.state.division),
      daterange: [moment(this.state.startDate).format("YYYY-MM-DD"), moment(this.state.endDate).format("YYYY-MM-DD")],
      cpr: this.state.efficiency_target,
      returnfunction: 'ROAS',
    };
    this.props.handleApplyFilter(filters);
  }

  handleClearClick(event) {
    this.setState({
      budget: '',
      division: null,
      endDate: null,
      startDate: null,
      efficiency_target: '',
      efficiency_type: null,
    });
    this.props.clearFilters();
  }

  renderDivisions() {
    return this.props.divisions.map((division, i) => {
      return <MenuItem value={division} primaryText={division} />
    });
  }

  renderEfficiencyTypes() {
    return this.props.efficiencyTypes.map((type, i) => {
      return <MenuItem value={MetricUtils.toID(type)} primaryText={type} />
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2 className={styles.header}>Cost vs Revenue</h2>
          <div className={styles.headerIconContainer}>
            <Avatar
              className={`${styles.avatarButton} ${styles.greenRoundButton}`}
              onClick={this.props.handleGridClick}
              // icon={this.props.showGridView ? <AssessmentIcon /> : <ViewListIcon />}
              />
            <DownloadButton
              className={styles.downloadButton}
              crossSectionCsv={this.props.crossCsvData}
              timeCsv={this.props.csvData}
              />
          </div>
        </div>

        <div className={styles.formContainer}>
          <TextField
            floatingLabelText="Budget"
            floatingLabelFixed
            onChange={this.handleBudgetChange.bind(this)}
            value={this.state.budget}
            inputStyle={{color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF'}}
            underlineFocusStyle={{color: '#FFFFFF'}}
            />
          <SelectField
            hintText="- Select -"
            floatingLabelText="Efficiency Type"
            floatingLabelFixed
            value={this.state.efficiency_type}
            onChange={this.handleTypeChange}
            selectedMenuItemStyle={{color: '#0D47A1'}}
            labelStyle={{color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF'}}>
            {this.renderEfficiencyTypes()}
          </SelectField>
          <TextField
            floatingLabelText="Efficiency Target"
            floatingLabelFixed
            onChange={this.handleTargetChange.bind(this)}
            value={this.state.efficiency_target}
            inputStyle={{color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF'}}
            underlineFocusStyle={{color: '#FFFFFF'}}
            />
          <SelectField
            hintText="- Select -"
            floatingLabelText="Division"
            floatingLabelFixed
            value={this.state.division}
            onChange={this.handleDivisionChange}
            selectedMenuItemStyle={{color: '#0D47A1'}}
            labelStyle={{color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF'}}>
            {this.renderDivisions()}
          </SelectField>
          <div className={styles.datePicker}>
            <DatePicker
              autoOk
              className={styles.dateField}
              floatingLabelText="Start Date"
              floatingLabelFixed
              formatDate={this.formatDate}
              onChange={this.handleStartDateChange}
              value={this.state.startDate}
              inputStyle={{color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF'}}
              />
            {/* <EventIcon className={styles.datePickerIcon} /> */}
          </div>
          <div className={styles.datePicker}>
            <DatePicker
              autoOk
              className={styles.dateField}
              floatingLabelText="End Date"
              floatingLabelFixed
              formatDate={this.formatDate}
              onChange={this.handleEndDateChange}
              value={this.state.endDate}
              inputStyle={{color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF'}}
              />
            {/* <EventIcon className={styles.datePickerIcon} /> */}
          </div>
          <div className={styles.buttonContainer}>
            <RaisedButton
              className={styles.applyButton}
              label="apply"
              onClick={this.handleApplyClick.bind(this)}
              type="submit"
              />
            <RaisedButton
              className={styles.clearButton}
              label="clear"
              onClick={this.handleClearClick.bind(this)}
              type="submit"
              />
          </div>
        </div>

      </div>
    );
  }
};
