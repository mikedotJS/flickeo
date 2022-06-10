# Flickeo

This project is a frontend skill test. It is a micro bookmark app where you can save Flickr and Vimeo URLs and it displays some informations using the NoEmbed API.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NOEMBED_API_URL`

## Demo

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/202273b933cd4001923a99126fe55d64" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Run Locally

Clone the project

```bash
  git clone https://github.com/mikedotJS/flickeo.git
```

Go to the project directory

```bash
  cd flickeo
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

with watch

```bash
  npm run test:watch
```

## Notes

This project features :

- a few key unit tests
- linting with ESLint and Prettier
- Parcel for the bundling
- no third libraries are used except for React
- TypeScript
- a few comments here and there for the potential optimizations
