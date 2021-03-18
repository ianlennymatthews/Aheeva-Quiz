# Project Overview: Aheeva-Technical-Task

## Table of Contents

1. [Overview](#overview)
1. [Requirements](#requirements)
1. [Usage](#usage)
1. [Tools Used](#tools-used)

## Overview

### Description:

This is a small mostly front end app that presents quiz like questions to the user!
Try to see how many correct trivia questions you can answer in a row!

Trivia Questions sourced from [Open Trivia DB](https://opentdb.com/api_config.php)

## Requirements

- Node v10.13.0 (LTS as of May 2019) or higher

## Usage

![Alt Text](https://gifyu.com/image/aecl)

#### Client

> The client side is built using React/Webpack:
>
> > `npm run build:dev`: Builds the client-side files in development mode and does not do full bundling. This also activates watch mode by default so it rebuilds whenever you make and save changes
>
> > `npm run build`: Builds the client-side files in production mode, with full bundling. This reduces file size, but is less useful in debugging (some errors do not provide as much detail as in development mod

#### Server

> The server side is built using Node/Express:
>
> 1. Install dependencies with `npm install`
> 2. The path for the main server file is `server/index.js`
>    -- You may start the server via`npm start` for production
>    -- The server uses port 3002 by default!

## Tools-Used

- Front-End: React, Toastify, Axios, Bootstrap, Awesome Button
- Back-End: Node, Express, Axios
