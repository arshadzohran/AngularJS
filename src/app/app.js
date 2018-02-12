import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RadiusTheme from '/src/app/shared/Resources/RadiusTheme';
//import Operations from '/src/app/operations/operations';
import RadiusAppBar from '/src/app/shared/AppBar/radiusAppBar';
//import TenantSelect from '/src/app/navigation/tenantSelect';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';

const middleStyle = {
  marginLeft: '5%',
  marginRight: '5%',
  paddingTop: '3%',
};

export default class App extends React.Component {
  render() {
    //console.log(RadiusAppBar);
    return (
      <MuiThemeProvider>

         <RadiusAppBar />
          <div style={middleStyle}>
            {this.props.children || <TenantSelect />}
          </div>

      </MuiThemeProvider>
    )
  };
};

/*

          */
