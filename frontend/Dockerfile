# Stage 1: Build the React app using Node.js
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the rest of the React app code
COPY . .

# Build the React app for production
RUN npm run build

# Verify build was created (for debugging)
RUN ls -la /app/dist || echo "Build directory not found!"

# Stage 2: Use Nginx to serve the built React app
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Create nginx config for React Router
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copy the built React app from the previous stage to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Create a health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Expose port 80 for Nginx (frontend)
EXPOSE 80

# Run Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
