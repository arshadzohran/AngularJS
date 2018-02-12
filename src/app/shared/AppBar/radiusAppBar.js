import React from 'react';
import AppBar from 'material-ui/AppBar';
import AppBarButtons from './appBarButtons';
import RadiusDrawer from '../Drawer/radiusDrawer';
import RadiusMiniDrawer from '../Drawer/radiusMiniDrawer';
import { Link } from 'react-router';

const imgStyle = {
  marginBottom: -18,
  marginRight: 5,
  height: 50,
  width: 50,
  marginLeft: 5,
};

const style = {
  position: 'fixed',
  zIndex: 50000,
};

const drawerStyle = {
  zIndex: -1000,
};

export default class RadiusAppBar extends React.Component {

  render () {
    const imgUrl = 'https://s3.amazonaws.com/public-image-test/360i-logo.png';
    return (
      <div>
        <div>Redius App Bar Component</div>
        <AppBar
          title={<span><img src={imgUrl} style={imgStyle}/><a style={{ color: '#FFF' }}>radius</a></span>}
          iconElementLeft={
            <RadiusDrawer />
          }
          iconElementRight={<AppBarButtons />}
          style={style}
        >
        </AppBar>
        <RadiusMiniDrawer />
      </div>
    )
  };
};
