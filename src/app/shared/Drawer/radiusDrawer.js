import React from 'react';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import NavigationMenu from 'material-ui/BottomNavigation';
import AppBar from 'material-ui/AppBar';
import {grey400, lightGreen600, blueGrey800} from 'material-ui/colors';
//import EditorBubbleChart from 'material-ui/SvgIcon/editor/bubble-chart';
// import ActionVisibility from 'material-ui-next/SvgIcon/action/visibility';
//import CommunicationCallSplit from 'material-ui-next/SvgIcon/communication/call-split';
// import ActionBuild from 'material-ui-next/SvgIcon/action/build';
// import ActionDoneAll from 'material-ui-next/SvgIcon/action/done-all';
// import MapsLocalLibrary from 'material-ui-next/SvgIcon/maps/local-library';
// import NavigationArrowDropDown from 'material-ui-next/SvgIcon/navigation/arrow-drop-down';
import Subheader from 'material-ui/List/ListSubheader';
import Avatar from 'material-ui/Avatar';

const containerStyle = {
  overflow: 'hidden',
}

const iconStyle = {
  height: 24,
  width: 24,
  marginTop: '50%',
  marginLeft: '35%',
};

const menuIconStyle = {
  height: 24,
  width: 24,
};

const titleStyle = {
  color: grey400,
  marginLeft: '15%',
  fontSize: '16px',
};

const itemStyle = {
  color: grey400,
  display: 'inline-block',
  fontSize: '12px',
  width: '256px',
};

const imgStyle = {
  marginBottom: -18,
  marginRight: 5,
  marginLeft: 5,
  height: 50,
  width: 50,
};

const accountStyle = {
  height: 150,
  background: 'url(https://s3.amazonaws.com/public-image-test/jcp-background.png)',
};

const imgUrl = 'https://s3.amazonaws.com/public-image-test/360iRadius.png';
const img2Url = 'https://s3.amazonaws.com/public-image-test/Jcpenney_Logo.png';
const spotify = 'https://s3.amazonaws.com/public-image-test/Spotify-Logo.png';
const hrblock = 'https://s3.amazonaws.com/public-image-test/HRBlock.png';

export default class RadiusDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  closeDrawer = () => this.setState({open: false});

  render() {

    return (
      <div>
        <NavigationMenu
          style={iconStyle}
          color={grey400}
          onTouchTap={this.handleToggle}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          style={containerStyle}
          onRequestChange={this.closeDrawer}
          containerStyle={{ backgroundColor: blueGrey800 }}>
            <List style={{ padding: 0 }}>
              <ListItem
                style={accountStyle}
                primaryTogglesNestedList="true"
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Spotify"
                    style={{ color: grey400 }}
                    leftAvatar={<Avatar src={spotify} size={45} />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="H & R Block"
                    style={{ color: grey400, marginBottom: '500%', overflow: 'hidden' }}
                    leftAvatar={<Avatar src={hrblock} size={45} />}
                  />
                  ]}
                >
                <div className="userView">
                  <Avatar src={img2Url} size={55} />
                  <p><b>JCPenney</b></p>
                  <p>Last log in: 3/1/2017</p>
                </div>
              </ListItem>
            </List>
            <List style={{ backgroundColor: blueGrey800 }}>
              <Subheader style={titleStyle}>Radius Apps</Subheader>
              <ListItem
                style={itemStyle}
                primaryText="Operations"
                primaryTogglesNestedList="true"
                // rightToggle={<NavigationArrowDropDown color={grey400}/>}
                // leftIcon={<EditorBubbleChart style={menuIconStyle} color={grey400} />}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Dashboard"
                    style={itemStyle}
                    containerElement={<Link to="/operations" />}
                  />
                  ]}
                />
              <ListItem
                style={itemStyle}
                primaryText="Monitoring"
                primaryTogglesNestedList="true"
                // rightToggle={<NavigationArrowDropDown color={grey400}/>}
                // leftIcon={<ActionVisibility style={menuIconStyle} color={grey400} />}
                />
              <ListItem
                style={itemStyle}
                primaryText="Forecasting"
                primaryTogglesNestedList="true"
                // rightToggle={<NavigationArrowDropDown color={grey400}/>}
                // leftIcon={<CommunicationCallSplit style={menuIconStyle} color={grey400} />}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Basket Analyzer"
                    style={itemStyle}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Overwatch"
                    style={itemStyle}
                  />,
                  <ListItem
                    key={3}
                    primaryText="Product Recommender"
                    style={itemStyle}
                  />,
                  <ListItem
                    key={4}
                    primaryText="Searchlight"
                    style={itemStyle}
                    containerElement={<Link to="/forecasting/searchlight" />}
                  />
                  ]}
                />
              <ListItem
                style={itemStyle}
                primaryText="Construction"
                primaryTogglesNestedList="true"
                // rightToggle={<NavigationArrowDropDown color={grey400}/>}
                // leftIcon={<ActionBuild style={menuIconStyle} color={grey400} />}
                />
              <ListItem
                style={itemStyle}
                primaryText="Conversion/Optimization"
                primaryTogglesNestedList="true"
                // rightToggle={<NavigationArrowDropDown color={grey400}/>}
                // leftIcon={<ActionDoneAll style={menuIconStyle} color={grey400} />}
                />
              <ListItem
                style={itemStyle}
                primaryText="3rd Party Library"
                primaryTogglesNestedList="true"
                // rightToggle={<NavigationArrowDropDown color={grey400}/>}
                // leftIcon={<MapsLocalLibrary style={menuIconStyle} color={grey400} />}
                />
            </List>
          </Drawer>
      </div>
    );
  }
}
