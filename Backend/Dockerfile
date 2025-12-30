# Step 1: Use Node.js official image
FROM node:20

# Step 2: Create app directory
WORKDIR /app

# Step 3: Copy package.json first (better caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy project files
COPY . .

# Step 6: Expose port (change if your app runs on a different port)
EXPOSE 5000

# Step 7: Start the server
CMD ["npm", "start"]
