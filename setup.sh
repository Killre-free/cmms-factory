#!/bin/bash

echo "CMMS Factory - Setup Script"
echo "==========================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

echo "✓ Node.js $(node -v) detected"

# Install dependencies
echo "Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your configuration"
fi

echo "✓ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your database and secrets"
echo "2. Run 'npm run db:push' to create database schema"
echo "3. Run 'npm run db:seed' to populate sample data"
echo "4. Run 'npm run dev' to start development server"
