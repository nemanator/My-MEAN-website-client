echo "mongodb install script is running"
echo "adding a new apt-key"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
echo "updating apt"
sudo apt-get update

sudo apt-get purge libssl

echo "installing mongodb"
sudo apt-get install -y mongodb-org-shell
echo "mongodb install script comleted"
