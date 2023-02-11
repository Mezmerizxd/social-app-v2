# Auto setup server for Ubuntu
echo "Automated server setup for Ubuntu"

# Check if we are on Ubuntu
if [ ! -f /etc/os-release ]; then
    echo "This script is only for Ubuntu"
    exit 1
fi

# Update system
echo "Updating system..."
sudo apt-get -y update
sudo apt-get -y upgrade

# Install nginx
echo "Installing nginx..."
sudo apt-get -y install nginx
# Edit nginx config 
sudo echo "
server {
    listen 80;
    server_name mezmerizxd.net;

    server_name _;

    location / {
        proxy_pass http://localhost:3000;
    }
}

server {
    listen 80;
    server_name portfolio.mezmerizxd.net;

    location / {
        proxy_pass http://localhost:4173;
    }
}
" > /etc/nginx/conf.d/default.conf

# Start nginx
echo "Starting nginx..."
sudo systemctl enable nginx
sudo systemctl start nginx

# Install docker
echo "Installing docker..."
sudo apt-get -y remove docker docker-engine docker.io containerd runc
sudo apt-get -y update
sudo apt-get -y install ca-certificates curl gnupg lsb-release
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get -y update
sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Install docker-compose
echo "Installing docker-compose..."
sudo apt-get -y install docker-compose

# Restart nginx & docker service
echo "Restarting nginx & docker..."
sudo systemctl restart nginx
sudo systemctl restart docker

# Setup ufw ports
echo "Setting up ufw ports..."
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000
sudo ufw allow 3001
sudo ufw allow 3002

# Install node version manager (nvm)
echo "Installing nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
sudo nvm install 16.17.0
sudo nvm use 16.17.0

# Setup node packages
echo "Setting up node packages..."
npm install -g yarn

echo "Done!"