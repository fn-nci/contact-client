# Contact Manager Client

A React application for managing contacts with CRUD operations.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Docker

To build and run in Docker:

```bash
# Build the image
docker build -t contact-client .

# Run the container
docker run -p 8443:8443 contact-client
``` 