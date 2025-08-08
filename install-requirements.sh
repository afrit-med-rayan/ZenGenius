#!/bin/bash

echo "========================================"
echo "   ZenGenius - Installation Script"
echo "========================================"
echo

echo "[1/4] Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install root dependencies"
    exit 1
fi

echo
echo "[2/4] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi

echo
echo "[3/4] Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi

echo
echo "[4/4] Installation complete!"
cd ..

echo
echo "========================================"
echo "   Installation Successful!"
echo "========================================"
echo
echo "Next steps:"
echo "1. Configure your .env files (see README.md)"
echo "2. Run: npm run dev"
echo