#!/bin/sh

# To run this script file:
# Move command prompt to the dir where this file resides
# $ chmod +rx gke-deploy.sh
# $ ./gke-deploy.sh {docker_image_tag}

echo "Start deploying backend app onto GCP..."

# Get the latest code from remote repository
git pull

echo "Building a new docker image..."
sudo docker build -t gcr.io/algebraic-hub-132823/net10-backend-image:$1 .
echo "Uploading the image onto Google Container Registry (GCR)..."
sudo gcloud docker push gcr.io/algebraic-hub-132823/net10-backend-image:$1

echo "Update image version to this line: - image: gcr.io/PROJECT_ID/image_name:{version}"
sudo kubectl edit deployment net10-backend-image-v1

sudo kubectl get deployments



echo "Deployment onto GCP completed successfully"
