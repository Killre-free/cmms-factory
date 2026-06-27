#!/bin/bash

echo "CMMS Factory - Cleanup Script"
echo "============================="

read -p "This will remove all data. Continue? (y/N) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Removing node_modules..."
    rm -rf node_modules
    
    echo "Removing .next build..."
    rm -rf .next
    
    echo "Removing database..."
    npx prisma migrate reset --force
    
    echo "✓ Cleanup complete"
else
    echo "Cancelled"
fi
