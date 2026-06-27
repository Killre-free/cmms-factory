# CMMS Factory - Installation Guide

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+

### Installation Steps

1. Install dependencies
   ```bash
   npm install
   ```

2. Configure environment
   ```bash
   cp .env.example .env
   ```

3. Setup database
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

4. Run development
   ```bash
   npm run dev
   ```

## Docker

```bash
docker compose up -d
```

## Default Credentials

- Admin: admin / Admin@123
- Manager: manager / Manager@123
- Tech: tech1 / Tech@123
- Operator: operator / Operator@123
