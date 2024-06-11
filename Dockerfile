
FROM node:20.14 as builder
WORKDIR /app
 
# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install
 
# Copy the rest of the application files
COPY . .
 
# Build the Next.js application
RUN npm run build
 
# Stage 2: Create the final image
FROM node:20.14 as runner
WORKDIR /app
 
# Copy all files from the builder stage
COPY --from=builder /app .
 
# Expose the port and set the entry point
EXPOSE 3000
CMD ["npm", "start"]
 