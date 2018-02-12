import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/Button';
import RaisedButton from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
// import GetAppIcon from 'material-ui-next/SvgIcon/action/get-app';

import * as styles from './Download.css';

export default class DownloadButton extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Cross Section"
        primary={true}
        onTouchTap={this.props.crossSectionCsv}
      />,
      <FlatButton
        label="Time Allocation"
        primary={true}
        onTouchTap={this.props.timeCsv}
      />,
    ];

    return (
      <div className={styles.downloadButtonContainer}>
        <Avatar
          className={`${styles.avatarButton} ${styles.whiteRoundButton}`}
          onTouchTap={this.handleOpen}
          // icon={<GetAppIcon />}
        />
        <Dialog
          title="Download CSV"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Choose the file you wish to download...
        </Dialog>
      </div>
    );
  }
}
