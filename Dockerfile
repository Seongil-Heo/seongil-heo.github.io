# Use Node.js LTS-based image
FROM node:20

# Create and move to working directory
WORKDIR /app

# Copy all source code from host
COPY . .

# Install dependencies
RUN npm install @vitejs/plugin-react --save-dev && npm install

# Expose port
EXPOSE 5175
CMD ["npm", "run", "dev", "--", "--host", "--port", "5175"]