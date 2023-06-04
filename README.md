# Your-Exp Front-End
This repository contains the client-side application for Your-Exp, a FullStack networking web application. The application is deployed at:

## https://your-exp.onrender.com

The front-end of the application has been developed using React and MUI (Material-UI). It allows users to create a profile, share and interact with content, and connect with friends and family through adding posts, pictures, and commenting on them.

The application has been deployed on Render as a static website, providing a seamless and efficient user experience.

## Dummy Account Information
To explore the functionalities of the application, you can use the following dummy account:

Login: dummyuser@wp.pl (copy and paste thie email)

Password: smith1234 (copy and paste thie password)

Feel free to log in with these credentials and navigate through the application to get a better understanding of its features.


### This FullStack networking web application allows users to:

- Create profiles
- Share and interact with content
- Connect with friends and family through adding posts, pictures, and commenting on them

### Users can also:

- Manage their profile details
- Search for other users using the search engine
- Restrict the visibility of their posts to friends

### The application provides features to:
- Add and remove friends easily
- Enhance the social networking experience.


## Structure of /src directory:


            └── src
                ├── assets
                │   ├── add.png
                │   ├── main.jpg
                │   └── noAvatar.png
                ├── components
                │   ├── Error
                │   │   ├── Error.js
                │   │   └── NotFound.js
                │   ├── Friends
                │   │   ├── Blocked
                │   │   │   ├── Blocked.js
                │   │   │   └── blockedStyle.js
                │   │   ├── Friends.js
                │   │   ├── FriendsMobile.js
                │   │   └── friendsStyle.js
                │   ├── Home
                │   │   └── HomeFeed.js
                │   ├── Init
                │   │   ├── ForgottenPassword
                │   │   │   ├── Email.js
                │   │   │   ├── ForgottenPassword.js
                │   │   │   └── forgottenPasswordStyle.js
                │   │   ├── RegisterMenu
                │   │   │   ├── Email.js
                │   │   │   ├── RegisterMenu.js
                │   │   │   └── registerMenuStyle.js
                │   │   └── SignInMenu
                │   │       ├── Email.js
                │   │       ├── SignInMenu.js
                │   │       └── signInMenuStyle.js
                │   └── Profile
                │       ├── Profile.js
                │       └── profileStyle.js
                ├── functions
                |   ├── addCommente.js
                |   ├── errorHandler.js
                |   ├── validateEmail.js
                │   └── validation.js
                ├── styles
                |   └── personTypography.js
                ├── App.css
                ├── App.js
                ├── App.test.js
                ├── index.css
                ├── index.js
                ├── reportWebVitals.js
                ├── setupTests.js
                ├── StyledCustomization.js
                └── theme.js
