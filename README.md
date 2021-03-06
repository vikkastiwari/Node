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

### Next
   - push your code to github
   - run `heroku create app_name` in cmd prompt (we can pass name of the app in cmd as well - its optional) 
   - with `git remote -v` we can list remote repository
   - to deploy run `git push heroku master` | `git push` 
   - to view logs `heroku logs --app your_app_name` in my case app_name = vast-peak-35424
Note - To view logs in more detail goto dashboard and run bash and run `ls` command and then run `cat log-filename.log` 

### Set variables
   - app_name = vast-peak-35424 
   - run `heroku config:set vidly_jwtPrivateKey=1234 --app app_name` to set enivronment variables
   - run `heroku config:set NODE_ENV=production --app app_name` to set node env
   - run `heroku config --app app_name` to log all config variables that we have set

### Configure mongodb setup
   - goto dashboard > resources > add on's > mlab 
   - but as mlab now comes under mongodb goto mongodb atlas and create free cluster
   - get the mongodb cluster uri

### configure custom-environment-variables.json
   #### configuration
        {
            "jwtPrivateKey":"vidly_jwtPrivateKey",
            "db":"vidly_db"
        }
   #### set variable `vidly_db`
        `heroku config:set vidly_db=mongodb-atlas-connection-uri-string --app app_name`
   #### push files to github
        - git add .
        - git commit -m"added env var"
        - git push

### Note

- Module 10 Authentication & Authorization | Module 11 Handling & Logging Errors. Both done in vidly project
- The way we added validation in returns.js and genres.js using validate middleware repplicate it wherever required
