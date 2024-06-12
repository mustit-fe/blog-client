# Stage 1: Build the application
FROM node:20.14-alpine as builder

# Set working directory for the builder stage
WORKDIR /blog-client

# Copy all files to the working directory
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Create the final image
FROM node:20.14-alpine as runner

# Set working directory for the runner stage
WORKDIR /blog-client

# Copy only the necessary files from the builder stage
COPY --from=builder /blog-client/.next ./.next
COPY --from=builder /blog-client/public ./public
COPY --from=builder /blog-client/package*.json ./
COPY --from=builder /blog-client/next.config.mjs ./
COPY --from=builder /blog-client/.env.local ./.env.local

# Install only production dependencies
RUN npm install --production

# Expose the port and set the entry point
EXPOSE 3000
CMD ["npm", "start"]
