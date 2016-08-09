#!/bin/sh

# To run this script file:
# Move command prompt to the dir where this file resides
# $ chmod +rx ecs-deploy.sh
# $ ./ecs-deploy.sh {docker_image_tag}

echo "Start deploying backend app onto AWS..."

# Get the latest code from remote repository
git pull

echo "Building a new docker image..."
sudo docker build -t 450851638300.dkr.ecr.us-east-1.amazonaws.com/net10-backend-image:$1 .

#echo "Enter credentials to log in to AWS, copy and paste the result from the terminal console:"
#aws ecr get-login

echo "Creating repository on EC2 Container Registry (ECR)..."
sudo aws ecr create-repository --repository-name net10-backend-image

echo "Uploading the image onto ECR..."
sudo docker push 450851638300.dkr.ecr.us-east-1.amazonaws.com/net10-backend-image:$1


echo "Deployment onto AWS completed successfully"
