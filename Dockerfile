# Stage 1: Build the application
FROM node:20.14-alpine as builder

# Set working directory
WORKDIR /blog-client

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the final image
FROM node:20.14-alpine as runner

# Set working directory
WORKDIR /blog-client

# Copy only necessary files from the builder stage
COPY --from=builder /blog-client/.next ./.next
COPY --from=builder /blog-client/public ./public
COPY --from=builder /blog-client/package*.json ./
COPY --from=builder /blog-client/next.config.js ./
COPY --from=builder /blog-client/next-i18next.config.js ./
COPY --from=builder /blog-client/.env ./.env

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the port and set the entry point
EXPOSE 3000
CMD ["npm", "start"]
