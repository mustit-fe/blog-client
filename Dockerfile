# Stage 1: Build the application
FROM node:20.14 as builder
WORKDIR /app

# Copy all files and install dependencies
COPY . /app
RUN npm install
RUN npm run build

# Stage 2: Create the final image
FROM node:20.14 as runner
WORKDIR /app

# Copy all files from the builder stage
COPY --from=builder /app .

# Expose the port and set the entry point
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
