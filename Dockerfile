# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy prisma directory
COPY prisma/ prisma/

# Generate Prisma client
RUN npx prisma generate

# Bundle app source
COPY . .

# Expose the port the app runs in
EXPOSE 3003

# Set environment variables to production
ENV NODE_ENV production

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]