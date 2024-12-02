FROM node:20-slim

# Install required system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up application directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the application code
COPY . /app

# Expose the application port
ENV HOST=0.0.0.0
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
