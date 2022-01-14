# Node Fundamentals - RESTFULL API | TESTING | DEPLOYMENT

### Config
   #### package.json
        "scripts": {"test": "jest --watchAll --verbose --runInBand --coverage"}

   #### Set JWT Private Key with Environment Variable then run `node index.js` or `nodemon`
        set vidly_jwtPrivateKey=mySecretKey


   #### Testing Environment
   To get into test environment `set NODE_ENV=test`

### Reference Links

Winston - https://github.com/winstonjs/winston
<br>
Jest Mock Functions - https://jestjs.io/docs/mock-functions
<br>
Run In Band - https://jestjs.io/docs/cli#--runinband

### Packages
   - Moment - Deals with date and time `npm i moment`

### Dependencies For Deployment
   - Helmet - Protects application from web vulnerabilities `npm i helmet`
   - Compression - It compresses the http response that we sent to client `npm i compression`

### Add file under `vidly > startup > prod.js`
   #### code
      const helmet = require("helmet");
      const compression = require("compression");

      module.exports = function (app) {
        // we call it as a function in order to get a middleware function
        app.use(helmet());
        app.use(compression());
      };

### Setup Heroku
   - Install Heroku
   - run `heroku -v` 
   - run `heroku login` 
   - Note - If login fails then `set HTTP_PROXY=http://proxy.server.com:1234`

### Package.json config for deployment
   #### Add
      "scripts": {
       "test": "jest --watchAll --verbose --runInBand --coverage",
       "start":"node index.js"
      },
      "engines":{
         "node": "v12.19.0"
      },
Note - Add current version of node that your application uses `node -v`

### Note

Module 10 Authentication & Authorization |
Module 11 Handling & Logging Errors.
Both done in vidly project

