# ICSClient


When pulling from the remote:

- npm ci
- cd android && ./gradlew clean
- cd ios && pod install
- react-native link

To update the pods: pod update 

Difference between npm ci and npm install: 
- https://stackoverflow.com/questions/48524417/should-the-package-lock-json-file-be-added-to-gitignore 
- https://docs.npmjs.com/cli/v8/commands/npm-ci

Difference between pod install and pod update: https://guides.cocoapods.org/using/pod-install-vs-update.html
