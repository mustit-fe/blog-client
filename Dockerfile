# Stage 1: Build the application
FROM node:20.14 as builder
WORKDIR /blog-client

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files and build
COPY . .
RUN npm run build

# Stage 2: Create the final image
FROM node:20.14 as runner
WORKDIR /blog-client

# Only copy necessary files from the builder stage
COPY --from=builder /blog-client/.next .next
COPY --from=builder /blog-client/node_modules node_modules
COPY --from=builder /blog-client/public public
COPY --from=builder /blog-client/package*.json ./

# Expose the port and set the entry point
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
