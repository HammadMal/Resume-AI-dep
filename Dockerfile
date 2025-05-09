FROM node:18

# Install Python, pip, and venv
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

# Create symlink for python command
RUN ln -s /usr/bin/python3 /usr/bin/python

# Set working directory
WORKDIR /app

# Setup Python virtual environment and install dependencies
RUN python3 -m venv /app/venv
COPY backend/python/requirements.txt ./python/
# Use the venv's pip to install packages
RUN /app/venv/bin/pip install -r python/requirements.txt

# Copy package files and install Node.js dependencies
COPY backend/package*.json ./
RUN npm install

# Copy application code
COPY backend/ ./

# Expose the port the app runs on
EXPOSE 5000

# Important: Modify the analyzerController.js to use the virtual environment python
RUN sed -i 's/spawn('"'"'python'"'"'/spawn('"'"'\/app\/venv\/bin\/python'"'"'/' ./controllers/analyzerController.js

# Command to run the application
CMD ["npm", "start"]