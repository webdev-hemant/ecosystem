# Stop all PM2 processes
pm2 stop all

# Delete all PM2 processes
pm2 delete all

# Flush logs
pm2 flush

# Start all processes again
pm2 start ecosystem.config.js --env production

