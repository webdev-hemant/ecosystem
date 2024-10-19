# Define an array of your microservices
SERVICES=("api-gateway" "auth-microservice" "chat-microservice" "publicPost-microservice" "s3_clone" "ecosystem")

# 1. Loop through each service directory
for SERVICE in "${SERVICES[@]}"; do
    echo "Deploying $SERVICE..."

    # Navigate to the service directory
    cd /home/ubuntu/be/$SERVICE || exit

    # Pull the latest changes from Git
    echo "Pulling latest changes for $SERVICE..."
    git add .
    git stash
    git pull origin main

      # Skip npm install for the 'ecosystem' folder
    if [ "$SERVICE" != "ecosystem" ]; then
        # Install dependencies
        echo "Installing dependencies for $SERVICE..."
        npm install
    else
        echo "Skipping npm install for $SERVICE..."
    fi

    echo "$SERVICE git pull successfully!"
done

echo "All services latest changes pulled successfully!"

# Stop all PM2 processes
pm2 stop api-gateway s3_clone auth-microservice chat-microservice publicPost-microservice

# Delete all PM2 processes
pm2 delete api-gateway s3_clone auth-microservice chat-microservice publicPost-microservice

# Flush logs
pm2 flush

# Start all processes again
cd /home/ubuntu/be/ecosystem || exit
pm2 start ecosystem.config.js --env production
