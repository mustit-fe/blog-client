# Stage 1: Build the application
FROM node:20.14 as builder
WORKDIR /blog-client

# Copy all files and install dependencies
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Create the final image
FROM node:20.14 as runner
WORKDIR /blog-client

# Copy all files from the builder stage
COPY --from=builder /blog-client .

# Expose the port and set the entry point
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
