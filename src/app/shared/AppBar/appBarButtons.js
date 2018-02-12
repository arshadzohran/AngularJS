import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui-icons/Settings';
import ActionAccountCircle from 'material-ui-icons/AccountCircle';
import ActionSearch from 'material-ui-icons/Search';
import {grey400} from 'material-ui/colors';

const iconStyle = {
  height: 24,
  width: 24,
};

const AppBarButtons = () => (
  <div>
    <IconButton tooltip="Search">
      <ActionSearch style={iconStyle} color={grey400} />
    </IconButton>

    <IconButton tooltip="Account">
      <ActionAccountCircle style={iconStyle} color={grey400} />
    </IconButton>

    <IconButton tooltip="Settings">
      <ActionSettings style={iconStyle} color={grey400} />
    </IconButton>
  </div>
);

export default AppBarButtons;
