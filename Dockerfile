# Use official Node.js image as base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to the container
COPY package.json package-lock.json ./

# Install dependencies (including dev dependencies for building TypeScript and running nodemon)
RUN npm install

# Install TypeScript globally (if needed)
RUN npm install -g typescript

# Install nodemon globally (since it's in your devDependencies)
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Build the TypeScript code (to transpile to /dist)
RUN npm run build

# Expose the port that the Express app will run on
EXPOSE 3000

# Start the app (use nodemon in development mode)
CMD ["npm", "run", "dev"]
