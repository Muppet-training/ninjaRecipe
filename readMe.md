# How To Start A Fullstack Development Environment

This set up will include Npm, Node.js, Express, MongoDb, React

## Steps to start

* [ ] Create folder & open Vs in folder
* [ ] Ensure the folder name has no spaces between it
* [ ] Once in vs pres ctrl then ~ to open terminal
* [ ] Type `node -v` & `npm -v` to ensure node.js is set up correctly

## Add package.js

CD into the folder you just created to install the package.json file

```
$ npm init
```

## Connect dev code to Github

Type each query in one at a time to ensure you catch an error if one pops up

```
$ git init
```

```
$ git add .
```

```
$ git commit -m "First commit"
```

```
$ git remote add origin (remote repository URL -> Ex: https://github.com/Muppet-training/ninjaRecipe.git)
```

```
$ git remote -v
```

```
$ git push origin master
```

Create `.gitIgnore` file to prevent certain folders & files from being uploaded into the Github repo

```
$ echo "node_modules" >> .gitignore
```

## Get MongoDb running in the background

Install it following [this tutorial](https://www.youtube.com/watch?v=A5fiWcVcADw&index=2&list=PL4cUxeGkcC9jBcybHMTIia56aV21o2cZ8)
Go to the folder where mongod.exe is located
Then type a similar query to this to get the database running

```
C:\mongodb\bin> $ mongod.exe
```

## Install Express

Adding --save to the query ensures the package is added to the "dependencies": in package.json

```
$ npm install express --save
```

## Add index.js + Configuration Code

In the package.json file it says we need to launch the app from index.js
So add a file to the main folder

```
$ touch index.js
```

Add the below code to index.js

```javascript
const express = require("express");

//Set up express app
const app = express();

app.get("/", (req, res, next) => {
  console.log("Get Reuest");
  res.end();
});

// Listen for requests
app.listen(process.env.port || 5000, function() {
  console.log("App is listen for requests...");
});
```

Then run this code in the termianl to check if code is working correctly

```
$ node index
```

Once complete install Nodemon for automatic file tracking
Use `--save-dev` to save it to you dev dependencies

```
$ npm install nodemon ---save-dev
```

Now run Nodemon or add `nodemon index` to the npm start script

```
$ nodemon index
```

## Set up your API handling

Create a folder in the main folder called `routes`

```
$ mkdir routes
```

Then add a file into routes called `api.js`

```
$ cd routes
```

```
$ touch api.js
```
