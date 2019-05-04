# Cast-Bucket

📻 A cross-platform , open-source podcast listening experience for developers.


## Tech Stack

- [Create React App](https://github.com/facebook/create-react-app)
- [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) (Monorepo)
- [React](https://github.com/facebook/react)
- [React Native](https://github.com/facebook/react-native)
- [React Native Web](https://github.com/necolas/react-native-web)
- [Redux](https://github.com/reduxjs/react-redux)
- [Redux Saga](https://github.com/redux-saga/redux-saga/)
- [Emotion](https://emotion.sh/docs/introduction)

<br/>

## Contributing

Bug reports, feature requests and other contributions are more than welcome! <br/>
Whenever possible, please make a pull request with the implementation instead of just requesting it.

If the feature is big, open an issue first for discussion.

### Running it locally

#### Requirements

- [Node.js](https://nodejs.org/) (latest)
- [Yarn](https://yarnpkg.com/)

> **Note:** On Windows, you might need to install Bash commands (e.g. via [git-scm](https://git-scm.com/downloads) or via [linux bash shell](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/))

#### How to run

- `git clone https://github.com/cast-bucket/cast-bucket.git`
- `cd cast-bucket.git`
- `yarn`
- `yarn prepare` 
-  To avoid CORS issues, add the following host entry in your /etc/hosts file
    ```bash
      127.0.0.1 localhost.cast-bucket.com
    ```

##### Web
- `yarn start:web`
-  Open http://localhost.cast-bucket.com:3000/ in the browser of your choice.
(Running `yarn start:web` indicates that app is running on the host and port - localhost:3000. However, in the /etc/hosts file we have created an alias named localhost.cast-bucket.com so we can use the alias for browsing.)


##### Mobile
-  To start the [metro bundler](https://facebook.github.io/metro/)
```
  $ yarn start:mobile
```

-  To run the app on android
```
  $ yarn android
```

Once an emulator or a physical device is connected to your system, the app should automatically install and open. Follow the [Debugging Instructions](https://facebook.github.io/react-native/docs/debugging) from the react-native docs to setup :fire: Hot Reloading and Live Reload in your device to ease the development process.

## Community 

<br/>Join our Slack Community: [Slack Invitation](https://join.slack.com/t/cast-bucket/shared_invite/enQtNjI1NzY0NjEyOTQ4LWRkMzM3MDRmNGU2ODI5MGJmMWU4NjViZDUxZThjOTA2MTU1Yzc3ODFhYzI4NTIwYjIzYjlmYzA1MTQ3NGY1NTQ)
