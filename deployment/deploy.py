#!/usr/bin/env python3
"""
Aether Forge Deployment Script

This script automates the deployment process for Aether Forge.
"""

import os
import sys
import subprocess
import argparse
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(f"logs/deployment-{datetime.now().strftime('%Y-%m-%d-%H-%M-%S')}.log")
    ]
)

logger = logging.getLogger(__name__)

def run_command(command, cwd=None):
    """Run a shell command and log the output."""
    logger.info(f"Running command: {command}")
    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        shell=True,
        cwd=cwd
    )
    stdout, stderr = process.communicate()
    
    if stdout:
        logger.info(f"Command output: {stdout}")
    if stderr:
        logger.error(f"Command error: {stderr}")
        
    return process.returncode

def deploy_docker():
    """Deploy using Docker."""
    logger.info("Starting Docker deployment...")
    
    # Navigate to the docker directory
    docker_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "docker")
    
    # Build and start the Docker containers
    result = run_command("docker-compose up -d --build", cwd=docker_dir)
    
    if result == 0:
        logger.info("Docker deployment successful!")
    else:
        logger.error("Docker deployment failed!")
        
    return result

def deploy_kubernetes():
    """Deploy using Kubernetes."""
    logger.info("Starting Kubernetes deployment...")
    
    # Navigate to the kubernetes directory
    k8s_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "kubernetes")
    
    # Apply the Kubernetes manifests
    result = run_command("kubectl apply -f .", cwd=k8s_dir)
    
    if result == 0:
        logger.info("Kubernetes deployment successful!")
    else:
        logger.error("Kubernetes deployment failed!")
        
    return result

def main():
    """Main function for the deployment script."""
    parser = argparse.ArgumentParser(description="Aether Forge Deployment Script")
    parser.add_argument("--platform", choices=["docker", "kubernetes"], default="docker",
                        help="Platform to deploy on (default: docker)")
    args = parser.parse_args()
    
    # Ensure logs directory exists
    os.makedirs("logs", exist_ok=True)
    
    # Deploy based on the selected platform
    if args.platform == "docker":
        return deploy_docker()
    elif args.platform == "kubernetes":
        return deploy_kubernetes()

if __name__ == "__main__":
    sys.exit(main()) 