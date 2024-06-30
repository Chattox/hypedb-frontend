# HypeDB

A lightweight database for tracking games you're interested in, but that aren't quite ready to go on your Steam wishlist

## Features

- Genre tagging
- Custom release date tracking by 4 different date types:
  - Specific _(e.g. 02/11/2023)_
  - Quarter _(e.g. Q4 2023)_
  - Year _(e.g. 2023)_
  - Custom _( cOmInG sOoN™ )_
- Quick sorting by a number of columns:
  - Title
  - HypeScore
  - Release date
  - Date added
  - Last updated
- Extremely polarising colour scheme!

## Run Locally

Clone the project

```bash
  git clone https://github.com/Chattox/hypedb-frontend.git
```

Go to the project directory

```bash
  cd hypedb-frontend
```

Install dependencies

```bash
  npm install
```

Create `.env` file with the following env vars (also found in `.env.example`)

```
PUBLIC_LOCAL_API_URL="" // url to hypedb backend running locally
PUBLIC_PROD_API_URL="" // url for prod hypedb backend
```

Start the server

```bash
  npm run start
```

## But why?

For the longest time I kept all games I was interested in on my Steam wishlist, both games that were out now and ones that were yet to release. I'm interested in a _lot_ of games so my wishlist quickly ballooned into the hundreds.

Steam's wishlist's sorting, especially by release date, is terrible and people were getting daunted looking at my wishlist for secret santa so I decided to move all the unrelease games I was interested in to my Steam followed list instead.

As you can imagine, this turned out to be even worse, so I set about building my own method of keeping track of games I'm interested in, but either aren't out yet or that I feel need longer in development before I wanted to put money down on them.

And thus, HypeDB was born! ✨
