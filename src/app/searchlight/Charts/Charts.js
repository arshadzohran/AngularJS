import React from 'react';

//Utils
import c3 from 'c3';
import Dimensions from 'react-dimensions';
import MetricUtils from '/src/app/shared/MetricUtils';

// Styles
import * as styles from './Charts.css';

const chartId = "searchlightChart";
const chartSelector = `#${chartId}`;

class Charts extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    metrics: React.PropTypes.array,
    containerWidth: React.PropTypes.number,
  };

  static defaultProps = {
    metrics: [],
    containerWidth: 700,
  };

  componentDidUpdate() {
    this.createChart(this.props);
  }

  createChart(props) {
    const date = props.metrics.map(metric => metric.Combo);
    const cost = props.metrics.map(metric => metric.TC);
    const revenue = props.metrics.map(metric => Number.parseInt(metric.TR));

    cost.unshift('cost');
    revenue.unshift('revenue');

    let chart = c3.generate({
      axis: {
        x: {
          tick: {
            count: 5,
          },
          type: 'category',
          categories: date,
        },
        y: {
          label: 'Cost',
        },
        y2: {
          label: 'Revenue',
          show: true,
        },
      },
      bindto: chartSelector,
      data: {
        axes: {
          cost: 'y',
          revenue: 'y2',
        },
        columns: [
          cost,
          revenue,
        ],
        types: {
          y: 'line',
          y2: 'bar',
        },
      },
      size: {
        width: this.props.containerWidth || 1500,
      },
      tooltip: {
        format: {
            value: d3.format('$.0f') // apply this format to both y and y2
        }
    }
    });
  }

  render() {
    return (
      <div className={styles.contentWrapper}>
        <div className={styles.chartContainer}>
          <div
            id={chartId}
            className={styles.chartArea}>
          </div>
        </div>

      </div>
    );
  }
};

export default Dimensions()(Charts);
