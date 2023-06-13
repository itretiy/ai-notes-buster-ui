# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build nextjs app
RUN npm run build

# Expose the port the app will run on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
