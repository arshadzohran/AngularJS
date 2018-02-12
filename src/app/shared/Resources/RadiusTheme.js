import { blueGrey900, blueGrey800, blueGrey700, grey800, lightblue700, grey100, grey500, darkBlack, white, grey300, blue800 } from 'material-ui/colors';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createMuiTheme } from 'material-ui/styles';

const RadiusTheme = createMuiTheme({
spacing: Spacing,
    zIndex: zIndex,
fontFamily: 'Roboto, sans-serif',
fontWeight: 300,
palette: {
    primary1Color: blueGrey900,
    primary2Color: blueGrey700,
    accent1Color: lightblue700,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey500,
    pickerHeaderColor: blue800,
  },
});

export default RadiusTheme;
