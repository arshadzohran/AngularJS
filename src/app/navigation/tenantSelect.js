import React from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
// import ActionViewQuilt from 'material-ui-next/SvgIcon/action/view-quilt';

import * as styles from './tenantSelect.css';

const jcp = 'https://s3.amazonaws.com/public-image-test/jcpfull.jpg';
const spotify = 'https://s3.amazonaws.com/public-image-test/spotifyfull.jpg';
const hrblock = 'https://s3.amazonaws.com/public-image-test/hrblockfull.jpg';

export default class TenantSelect extends React.Component {
  render() {
    return (
      <div>
        {/* <ActionViewQuilt className={styles.quilt} style={{ height: '40px', width: '40px' }} /> */}
        <h2 className={styles.header}>Select a Client</h2>
        <div className={styles.container}>
          <div className={styles.bigColumn}>
            <Link to="/operations">
              <Paper className={styles.bigPaper} zDepth={1}>
                <img className={styles.clientLogo} src={jcp} />
              </Paper>
            </Link>
          </div>
          <div className={styles.smallColumn}>
            <Paper className={styles.smallPaper} zDepth={1}>
              <img className={styles.clientLogo} src={spotify} />
            </Paper>
            <Paper className={styles.smallPaper} zDepth={1}>
              <img className={styles.clientLogo} src={hrblock} />
            </Paper>
          </div>
        </div>
      </div>
    )
  };
};
