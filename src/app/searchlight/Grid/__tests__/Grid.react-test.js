import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RadiusTheme from '../../../shared/Resources/RadiusTheme';
import Grid from '../Grid';

it('Grid renders correctly', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={RadiusTheme}>
      <Grid />
    </MuiThemeProvider> 
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
