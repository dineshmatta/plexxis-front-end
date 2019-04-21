# Plexxis Interview Exercise

## Displaying Employee records in React applicaton from postgres database via Nodejs Backend

## Backend changes

Github Repo: https://github.com/dineshmatta/plexxis-node-api

1) All Backend changes are done in a seperate repository mentioned above
2) This backend application is a nodejs application with expressjs 
3) This app integerates with postgres relational database using node-postgress 'pg' npm package
4) This application uses ES6 syntax for creatign express application using babel and babel presets
5) All database configs are done in db/config.js file

## Focus points for this app (where I spent most of my time)

1) Going through node-postgress documentation website to figure out the format/syntax of queries
2) Refactoring application with ES6 syntax
3) Debugging endpoints when I was not receiving proper response form the API's(had to use RETURNING * from insert queries to get back the result)

## Backend Enhancements - TODO

1) Adding server side validation which validates the proper json modal
2) Error handling can be done in a better way
3) This backend can be deployed to any cloud platform (eg Aws RDS service for postgress db)


## Front End React Application

1) Upgraded react version from 16.4 to latest 16.8
2) Made App.js component as a parent component and rendering all child components by passing props
3) child components includes:
  i) Header Component
  ii) ModalForm Component - which calls AddEditForm Component to render the add/edit form inside the Modal Component
  iii) ReactDataTable component which is basically a records listing components which uses react-table to show employees data in a tabular format
4) ReactDataTable component dynamically creates columns from the data it received from database via props, it ignores id columns and dynamically add actions column(which includes icons for editing and deleting employee records).
5) AddEditForm components maintains a seperate state for all the data changes made in the Add/Edit forms and when user submits the form it sends back all state data to parent component via props method invocation.
6) When form is updated/Saved AddEditForm components makes api calls to backend api and saves the data, after that it triggers props callbacks to inform the parent components to update the state and close the ModalForm.


## Focus points for this app (where I spent most of my time)

1) Figuring out the front-end library, eventually I ended up using react-bootstrap for this project as I wanted to keep it simple and react-bootstrap solves the purpose
2) Spent some time in finding out right components/styling to use from this library
3) Figuring out the data flow(should I use redux or parent component will hold the state and pass it child components via props), here also eventually I ended up using Parent/Child component patterns instead of using Redux. As I feel redux will be overkill for this kind of app requirements where there is not too deep child components involved


## Front-end Enhancements that can be done - TODO

1) Client side validation can implement which ensures right data is being sent to backend
2) Notification/Alert messages can be implemented to show user when records are added/updated/deleted - Due to time constraints could not implement this feature
3) Redux Can be used to manage state of the application at single store, but as I mentioned for this app redux will be a overkill
4) Styling can be further improved - Again due to lack of time just used basic styling