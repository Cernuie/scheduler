# Interview Scheduler

## Overview

This interview scheduler app is a full stack application built with React that allows you to schedule an appointment with the interviewers available for the day. The web app will show a schedule of the week, along with which student and interviewer are interviewing in the hour. The app also shows how many spots are left for the day.

The user can click on an available day, and be able to create, edit, or delete interviews. 
The app is single page in functionality, which means that any action will show up on the page without refreshing.

React was used for the single page functionality, while axios was used for interacting with the database. 
Tests were done via storyboard, jest, and cypress.

## Screenshots


!["Screenshot of Home Page"](https://github.com/Cernuie/scheduler/blob/master/docs/Screenshot%20from%202021-02-24%2019-54-50.png)

!["Adding interview"](https://github.com/Cernuie/scheduler/blob/master/docs/Adding%20Interview.png)

!["Deleting interview"](https://github.com/Cernuie/scheduler/blob/master/docs/Deleting%20Interview.png)

!["Component Tree"](https://github.com/Cernuie/scheduler/blob/master/docs/component%20tree.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
