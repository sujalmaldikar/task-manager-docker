
# Use Node.js 24 Alpine as the base image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application source code
COPY src/ ./src/

# Backend listens on port 5000 inside Docker
EXPOSE 5000

# Start the backend application
CMD ["npm", "start"]
