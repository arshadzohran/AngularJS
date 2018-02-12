import React from 'react';
import { withRouter } from 'react-router';
import auth from './auth';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import RadiusTheme from '../shared/Resources/RadiusTheme';
import * as styles from './login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: false};
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const email = this.refs.email.getValue();
    const pass = this.refs.pass.getValue();

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
    })
  }

  render() {
    const imgUrl = 'https://s3.amazonaws.com/public-image-test/360i-logo.png';
    return (
      <MuiThemeProvider className={styles.theme}>
        <div className={styles.container}>
          <Paper className={styles.paper} zDepth={5}>
            <div className={styles.branding}>
              <img src={imgUrl} />
              <h1>radius</h1>
              <h2>Login</h2>
            </div>
            <div className={styles.loginarea}>
              <form onSubmit={this.handleSubmit} className={styles.formarea}>
                <TextField ref="email" hintText="email*" fullWidth={true} /><br />
                <TextField ref="pass" hintText="password*" type="password" fullWidth={true} /><br/>
                <Checkbox label="Remember Me" className={styles.checkbox} />
                <br />
                <RaisedButton
                  label="Log In"
                  primary={true}
                  fullWidth={true}
                  type="submit" />
                {this.state.error && (
                  <Snackbar
                    open={true}
                    message="Incorrect Login Information!"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
                )}
              </form>
            </div>
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }

}





// import React from 'react';
// import { withRouter } from 'react-router';
// import auth from './auth';
// // import cognitoAuth from './cognitoAuth';
// import TextField from 'material-ui/TextField';
// import Checkbox from 'material-ui/Checkbox';
// import RaisedButton from 'material-ui/Button';
// import Paper from 'material-ui/Paper';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Snackbar from 'material-ui/Snackbar';
// import RadiusTheme from '../shared/Resources/RadiusTheme';
// import * as styles from './login.css';
//
// export default class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {error: false};
//   }
//
//   handleSubmit = (event) => {
//     event.preventDefault();
//     const email = this.refs.email.getValue();
//     const pass = this.refs.pass.getValue();
//
//     auth.login(email, pass => {
//       const { location } = this.props
//
//       if (location.state && location.state.nextPathname) {
//         this.props.router.replace(location.state.nextPathname)
//       } else {
//         this.props.router.replace('/')
//       }
//     })
//   }
//
//   render() {
//     const imgUrl = 'https://s3.amazonaws.com/public-image-test/360i-logo.png';
//     return (
//       <MuiThemeProvider className={styles.theme}>
//         <div className={styles.container}>
//           <Paper className={styles.paper} zDepth={5}>
//             <div className={styles.branding}>
//               <img src={imgUrl} />
//               <h1>radius</h1>
//               <h2>Login</h2>
//             </div>
//             <div className={styles.loginarea}>
//               <form onSubmit={this.handleSubmit} className={styles.formarea}>
//                 <TextField ref="email" hintText="email*" fullWidth={true} /><br />
//                 <TextField ref="pass" hintText="password*" type="password" fullWidth={true} /><br/>
//                 <Checkbox label="Remember Me" className={styles.checkbox} />
//                 <br />
//                 <RaisedButton
//                   label="Log In"
//                   primary={true}
//                   fullWidth={true}
//                   type="submit" />
//                 {this.state.error && (
//                   <Snackbar
//                     open={true}
//                     message="Incorrect Login Information!"
//                     autoHideDuration={4000}
//                     onRequestClose={this.handleRequestClose} />
//                 )}
//               </form>
//             </div>
//           </Paper>
//         </div>
//       </MuiThemeProvider>
//     )
//   }
//
// }
