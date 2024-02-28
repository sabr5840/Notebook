# React Native Notebook App

A simple React Native mobile application for note-taking, utilizing Firebase for data storage and React Navigation for navigation.

## Components Used

- **React Native**: A JavaScript framework for building mobile applications.
- **Firebase (Firestore)**: Real-time cloud database for storing notes.
- **React Navigation**: Library for handling navigation in React Native.
- **React Firebase Hooks**: Hooks for using Firebase services with React.

## Features

- Add, view, and delete notes.
- Edit existing notes.
- Save additional details for each note.

## Firebase Usage

The application uses Firebase Firestore, a NoSQL cloud database, for storing and retrieving notes. Firestore is seamlessly integrated into the app using the react-firebase-hooks/firestore library.

Collection: Notes are stored in a collection named "notes" within the Firestore database.
CRUD Operations:
Create (Add): New notes are added to the "notes" collection using the addDoc function.
Read (View): Notes are retrieved using the useCollection hook, providing real-time updates to the UI.
Update (Edit): Existing notes are updated using the updateDoc function on the respective document.
Delete: Notes are deleted using the deleteDoc function on the corresponding document.
