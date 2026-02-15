# Stage 1: Build the Application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json* ./

# Install dependencies clean and fast
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the static site (Outputs to /dist)
RUN npm run build

# Stage 2: Serve with Nginx (Production Ready)
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom high-performance Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]