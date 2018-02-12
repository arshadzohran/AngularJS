import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import {grey400, blueGrey800} from 'material-ui/colors';
//import EditorBubbleChart from 'material-ui/SvgIcon/editor/bubble-chart';
// import ActionVisibility from 'material-ui-next/SvgIcon/action/visibility';
//import CommunicationCallSplit from 'material-ui-next/SvgIcon/communication/call-split';
// import ActionBuild from 'material-ui-next/SvgIcon/action/build';
// import ActionDoneAll from 'material-ui-next/SvgIcon/action/done-all';
//import MapsLocalLibrary from 'material-ui/SvgIcon/maps/local-library';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';

const iconStyle = {
  height: 24,
  width: 24,
  marginTop: '50%',
  marginLeft: '5%',
};

const menuIconStyle = {
  height: 24,
  width: 24,
};

const itemStyle = {
  paddingTop: 7.5,
  paddingBottom: 7.5,
};

const imgStyle = {
  paddingBottom: 7.5,
};

export default class RadiusMiniDrawer extends React.Component {

  render() {
    const imgUrl = 'https://s3.amazonaws.com/public-image-test/Jcpenney_Logo.png';
    return (
      <div>
        <div>Inside Radius Mini Drawer </div>
        <Drawer containerStyle={{ width: '60px', top: 64, backgroundColor: blueGrey800 }}>
          <List>
            <ListItem containerElement={<Link to="/" />}>
              <Avatar src={imgUrl} size={25} />
            </ListItem>
            <ListItem
              style={itemStyle}
              // leftIcon={<EditorBubbleChart style={menuIconStyle} color={grey400} />}
              containerElement={<Link to="/operations" />}
              />
            <ListItem
              style={itemStyle}
              // leftIcon={<ActionVisibility style={menuIconStyle} color={grey400} />}
              />
            <ListItem
              style={itemStyle}
              // leftIcon={<CommunicationCallSplit style={menuIconStyle} color={grey400} />}
              containerElement={<Link to="/forecasting" />}
              />
            <ListItem
              style={itemStyle}
              // leftIcon={<ActionBuild style={menuIconStyle} color={grey400} />}
              />
            <ListItem
              style={itemStyle}
              // leftIcon={<ActionDoneAll style={menuIconStyle} color={grey400} />}
              />
            <ListItem
              style={itemStyle}
              // leftIcon={<MapsLocalLibrary style={menuIconStyle} color={grey400} />}
              />
          </List>
        </Drawer>
      </div>
    );
  }
}
