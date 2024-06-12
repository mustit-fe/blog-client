# Stage 1: Build the application
FROM node:20.14-alpine as builder

# Set working directory
WORKDIR /blog-client

# Copy only the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the final image
FROM node:20.14-alpine as runner

# Set working directory
WORKDIR /blog-client

# Copy only the necessary files from the builder stage
COPY --from=builder /blog-client/.next ./.next
COPY --from=builder /blog-client/public ./public
COPY --from=builder /blog-client/package*.json ./
COPY --from=builder /blog-client/next.config.js ./
COPY --from=builder /blog-client/.env.local ./.env.local

# Install only production dependencies
RUN npm install --production

# Expose the port and set the entry point
EXPOSE 3000
CMD ["npm", "start"]
