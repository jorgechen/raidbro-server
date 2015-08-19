# [Material-UI](http://callemall.github.io/material-ui/) - Example Project

This is an example project that uses [Material-UI](http://callemall.github.io/material-ui/).

## Installation
After cloning the repository, install dependencies:
```
cd <project folder>/material-ui/example
npm install
```

Make sure to set up secret keys.  If using Heroku, set up the environment variables with the same names from the secret file.

```
cp SECRET.example.js SECRET.js
```


Now you can run your local server:
```
npm start
```


#Description of [Gulp](https://github.com/gulpjs/gulp) Plugins


##[browserify](https://github.com/substack/node-browserify)
Browsers do not allow us to use the require method from Node.js. With browserify, we can implement dependency management on the browser. It also will bundle the code into one file in an efficient way to not repeat dependiencies that are used more than once.

##[browserSync](http://www.browsersync.io/)
When developing and testing the website, browserSync is a powerful tool that will rebuild and refresh the webpage so you can see the changes you make as you are working.

##markup
Copies all of the files from /src/www to the build folder.

##[gulp_starter](https://github.com/greypants/gulp-starter)
A useful repository that explains how many of gulp's features work and contains an example project to get familiar with it. We use this example to construct our own project.



# Reference

Community made tools http://us.battle.net/en/forum/topic/14729973498

Wowhead linking http://www.wowhead.com/tooltips
