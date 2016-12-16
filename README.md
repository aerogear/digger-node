# AeroGear Digger Node.js client


[![Build Status](https://travis-ci.org/aerogear/digger-node.png)](https://travis-ci.org/aerogear/digger-node)
[![License](https://img.shields.io/:license-Apache2-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

AeroGear digger node.js command line client. 
Create Jenkins job and build your application using Jenkinsfile located in your source code.

## Project Info

|                 | Project Info  |
| --------------- | ------------- |
| License:        | Apache License, Version 2.0  |
| Build:          | Node  |
| Documentation:  | https://github.com/aerogear/digger-jenkins  |
| Issue tracker:  | https://issues.jboss.org/browse/AGDIGGER  |
| Mailing lists:  | [aerogear-users](http://aerogear-users.1116366.n5.nabble.com/) ([subscribe](https://lists.jboss.org/mailman/listinfo/aerogear-users))  |
|                 | [aerogear-dev](http://aerogear-dev.1069024.n5.nabble.com/) ([subscribe](https://lists.jboss.org/mailman/listinfo/aerogear-dev))  |
| IRC:            | [#aerogear](https://webchat.freenode.net/?channels=aerogear) channel in the [freenode](http://freenode.net/) network.  |

## Installation

Install command line tool

`npm install -g digkins`

## Sample use case

Login to Jenkins. Your credentials will be stored in configuration.
```
digkins login http://myjenkins.com
```

Create job that would use your repository as source code
```
digkins job create my-job https://github.com/android/project master
```

Trigger build
```
digkins job build my-androip-build
```

## Supported commands
```
  Trigger build for Jenkins job
  digkins job build <jobname>                

  Create jenkins job for git repository with Jenkinsfile
  digkins job create <name> [repository] [branch]  

  Setup jenkins credentials and login into jenkins 
  digkins login <url> [user] [password] 

  Stream jenkins logs for triggered build
  digkins log <job> <buildNumber>       
  
  Get job artifacts for specified build
  digkins artifact <job> <buildNumber>   

  Generate bash completion script
  digkins completion                     
```
## Development

1. Install node.js
2. Checkout repository
3. Link library to use directly from source code

`npm link .` 

