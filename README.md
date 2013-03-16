# CUT Group

This is the website for http://cutgroup.smartchicagoapps.org/

## Deployment

To deploy the site, run these commands:
    
    make staging

After validating the deployment at the staging site, http://cutgroup-staging.smartchicagoapps.org, deploy to production:
    
    make deploy

Before deploying, minify the Javascript:

    make minify

Minification requires the [`uglifyjs`](https://github.com/mishoo/UglifyJS#install-npm) application. Assuming you have `npm` installed, run:

    npm install -g uglify-js

## Configuration

Before deployment, setup your environment to interact with AWS S3.

  1. Install the [s3cmd](http://s3tools.org/s3cmd) tool. If you use homebrew, run:

    brew install s3cmd

  2. Configure the .s3cfg file:

    s3cmd --configure -c .s3cfg

  3. When prompted, enter your AWS access key and secret key. Use the defaults (enter) for all other prompts.

## LICENSE

![](http://i.creativecommons.org/l/by/3.0/80x15.png) This work is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/deed.en_US)
