#!/bin/bash

# 🚀 Interactive Blog Platform - Quick Start Script

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║  🚀 Interactive Blog Platform - Quick Start                        ║"
echo "║  Merged: Personal Blog Platform + My CRUD App                      ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${YELLOW}[1/5]${NC} Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check if npm is installed
echo -e "${YELLOW}[2/5]${NC} Checking npm..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Check if .env.local exists
echo -e "${YELLOW}[3/5]${NC} Checking environment file..."
if [ ! -f .env.local ]; then
    echo -e "${RED}⚠️  .env.local not found!${NC}"
    echo ""
    echo -e "${YELLOW}Please create .env.local file with:${NC}"
    echo ""
    echo "DATABASE_URL=\"mongodb+srv://username:password@cluster.mongodb.net/blog_db\""
    echo "JWT_SECRET=\"your-secret-key\""
    echo ""
    read -p "Press Enter after creating .env.local..."
else
    echo -e "${GREEN}✓ .env.local found${NC}"
fi

# Install dependencies
echo -e "${YELLOW}[4/5]${NC} Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Setup database
echo -e "${YELLOW}[5/5]${NC} Setting up database..."
npx prisma db push --skip-generate
if [ $? -ne 0 ]; then
    echo -e "${RED}⚠️  Database setup had issues. Make sure MongoDB is accessible.${NC}"
else
    echo -e "${GREEN}✓ Database ready${NC}"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo -e "║ ${GREEN}✓ Setup Complete!${NC}                                              ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}🚀 Ready to start!${NC}"
echo ""
echo "Start development server with:"
echo -e "  ${YELLOW}npm run dev${NC}"
echo ""
echo "Then open:"
echo -e "  ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "For more information, see:"
echo -e "  ${YELLOW}SETUP_GUIDE.md${NC}"
echo -e "  ${YELLOW}MERGE_SUMMARY.md${NC}"
echo ""
