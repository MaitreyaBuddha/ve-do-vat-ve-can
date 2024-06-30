#!/bin/bash

# Create a virtual environment
python3 -m venv myenv

# Activate the virtual environment
source myenv/bin/activate

# Install the necessary packages
pip install -r requirements.txt