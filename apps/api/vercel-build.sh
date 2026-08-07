#!/bin/bash
set -e

echo "=== Vercel Monorepo Build Started ==="

# 1. Build the shared types package
echo "Building @algoverse/shared-types..."
npm run build --workspace=@algoverse/shared-types

# 2. Replace symlink with real directory so Vercel bundles it correctly
echo "Resolving @algoverse/shared-types symlink for serverless runtime..."
rm -rf node_modules/@algoverse/shared-types
mkdir -p node_modules/@algoverse/shared-types

cp -r ../../packages/shared-types/dist node_modules/@algoverse/shared-types/dist
cp ../../packages/shared-types/package.json node_modules/@algoverse/shared-types/package.json

# 3. Run Prisma migrations
echo "Deploying database migrations..."
npx prisma migrate deploy

# 4. Build NestJS App
echo "Building NestJS backend..."
npm run build

echo "=== Vercel Monorepo Build Completed ==="
