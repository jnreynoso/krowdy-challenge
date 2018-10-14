# Fullstack

Krowdy Challenge

**API** built with Node + React + AWS Cognito + AWS Amplify

**WebApp** built with React + Ant Design. 

## 📝 Features
- [x] SMS Verification
- [x] Email Verification
- [x] Change Password
- [x] Change Email and Priority

## ▶️ Running
- Clone repo `git clone git@github.com:jnreynoso/krowdy-challenge.git`
- Install NPM modules `npm install`
- Modify `.env` for webapp port (optional)

## 🏗 Core Structure
    riqra-challenge
      ├── backend (api.example.com)
      │   ├── src
      │   │   ├── config
      │   │   ├── models
      │   │   ├── schema
      │   │   ├── setup
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── frontend (example.com)
      │   ├── public
      │   ├── src
      │   │   ├── components
      │   │   ├── images
      │   │   ├── mutations
      │   │   ├── querys
      │   │   ├── styles
      │   │   └── index.js
      │   │
      │   ├── .env
      │   └── package.json
      │
      ├── .gitignore
      └── README.md

## 📘 Guides
### API
- Adding new Module (Eg: Users):
  - Copy `/backend/src/models/thought.js` to `/backend/src/models/user.js` and modify the file for table name and respective fields
  - Add an entry to the `models` object in `/backend/src/models/index.js`
  - Copy `/backend/src/schema/thoughts` to `/backend/src/schema/users` and modify `type.js`, `resolvers.js` and `fields/query.js` and `fields/mutations.js`
  - Import `/backend/src/schema/users/fields/query.js` in `/backend/src/schema/query.js`
  - Import `/backend/src/schema/users/fields/mutations.js` in `/backend/src/schema/mutations.js`

