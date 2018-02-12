# Radius/Searchlight Web App

This project is intended to be the front-end for the Radius project, which includes Searchlight.  The early goals of the project are to present a functioning web application as a Proof-of-Concept.  There is a lot of work to do, please ask a repo admin if you would like to contribute to the project.

The tools used across the application are:

    - React.js
    - Redux
    - Material UI
    - Webpack
    - Babel
    - D3/C3 (charting)

## Getting Started
To test:

1. `npm install`
2. `npm run dev`
3. The application will be running at `localhost:8085`

To build/run (production):

1. `npm install`
2. `npm run build`
3. `npm run start`
4. The application will be running at `localhost:3000`

Deployment:

The application is deployed using the AWS CodeStar continuous deployment pipeline.  To deploy, you should:

1. If you have cloned the Bitbucket repository, add `https://git-codecommit.us-east-1.amazonaws.com/v1/repos/radius` as a remote on the project (must have AWS credentials set up for your IAM user to connect to the repo)
2. Add, commit, and push your changes to the AWS CodeCommit repository.  If you commit to the master branch, the CodePipeline will automatically kick off the build and deploy to Elastic Beanstalk when it is finished.
3. Go here: http://radiusapp.w82axpg5wm.us-east-1.elasticbeanstalk.com


updated

 "react": "^16.2.0",
   "react-addons-css-transition-group": "^15.6.2",
   "react-dimensions": "^1.3.1",
   "react-dom": "^16.2.0",
   "react-file-download": "^0.3.5",
   "react-redux": "latest",
   "react-redux-loading-bar": "^3.1.1",
   "react-router": "^4.2.0",
   "react-router-redux": "^5.0.0-alpha.8",
   "react-tap-event-plugin": "^3.0.2",
   "redux": "latest",
   "redux-thunk": "^2.2.0",
