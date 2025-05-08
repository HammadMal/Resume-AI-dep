FROM node:18

# Install Python, pip, and venv
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

# Set working directory
WORKDIR /app

# Copy package files and install Node.js dependencies
COPY backend/package*.json ./
RUN npm install

# Setup Python virtual environment and install dependencies
RUN python3 -m venv /app/venv
COPY backend/python/requirements.txt ./python/
RUN /app/venv/bin/pip install -r python/requirements.txt

# Copy application code
COPY backend/ ./

# Expose the port the app runs on
EXPOSE 5000

# Modify the Python path in the analyze.py script to use the virtual environment
RUN sed -i 's|python |/app/venv/bin/python |g' ./controllers/analyzerController.js

# Command to run the application
CMD ["npm", "start"]