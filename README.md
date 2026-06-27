# CMMS Factory - Enterprise Maintenance Management System

⚙️ **Computerized Maintenance Management System** for Factory Operations

A comprehensive, production-ready web application for managing factory maintenance operations, including work orders, machine management, spare parts inventory, and preventive maintenance scheduling.

## Features

✅ **User Authentication & Authorization**
- Role-based access control (Admin, Manager, Technician, Operator)
- Secure login with NextAuth
- Session management

✅ **Machine Management**
- Complete machine database with serial numbers and specifications
- Machine status tracking (Active, Maintenance, Breakdown, etc.)
- Running hours monitoring
- Machine history logs

✅ **Work Order Management**
- Create and track maintenance work orders
- Multiple work order types (Corrective, Preventive, Inspection, etc.)
- Priority levels (Low, Medium, High, Urgent, Critical)
- Status tracking and history
- Photo evidence before/after
- GPS location logging

✅ **Spare Parts Inventory**
- Inventory management with stock tracking
- Automatic low stock alerts
- Supplier management
- Stock transaction history
- Reorder point automation

✅ **Preventive Maintenance**
- PM schedule creation and management
- Automatic work order generation
- Frequency-based scheduling (Daily, Weekly, Monthly, etc.)
- Running hour-based intervals

✅ **Dashboard & Analytics**
- Real-time KPI monitoring
- Work order statistics
- Machine health tracking
- Low stock alerts
- Recent activity feed

✅ **Check Sheets**
- Custom inspection forms
- Photo documentation
- Digital signature capture
- Response tracking

✅ **Audit Logging**
- Complete system activity tracking
- User action logging
- Change history

## Technology Stack

### Frontend
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **React Query** - Data fetching and caching
- **Recharts** - Data visualization
- **NextAuth** - Authentication

### Backend
- **Next.js API Routes** - RESTful API
- **Node.js** - Runtime environment
- **Prisma ORM** - Database management

### Database
- **PostgreSQL 15** - Relational database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and web server

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker (optional)

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/Killre-free/cmms-factory.git
   cd cmms-factory
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - Generate secrets: `openssl rand -base64 32`
   - Configure PostgreSQL connection
   - Set JWT secret

4. **Database Setup**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000 in your browser

### Docker Deployment

```bash
# Copy environment file
cp .env.example .env

# Start all services
docker compose up -d

# Access the application
# http://localhost
```

## Default Credentials

After seeding the database, you can login with:

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Manager | manager | Manager@123 |
| Technician | tech1 | Tech@123 |
| Operator | operator | Operator@123 |

⚠️ **IMPORTANT**: Change these credentials in production!

## Project Structure

```
cmms-factory/
├── app/                          # Next.js app directory
│   ├── (dashboard)/             # Dashboard layout
│   │   ├── page.tsx            # Dashboard home
│   │   ├── machines/           # Machine management
│   │   ├── work-orders/        # Work order management
│   │   ├── spare-parts/        # Spare parts inventory
│   │   ├── preventive-maintenance/
│   │   ├── reports/            # Analytics and reports
│   │   ├── users/              # User management
│   │   └── audit-logs/         # Activity logs
│   ├── api/                     # API routes
│   │   ├── auth/               # Authentication
│   │   ├── machines/           # Machine API
│   │   ├── work-orders/        # Work order API
│   │   ├── spare-parts/        # Spare parts API
│   │   ├── dashboard/          # Dashboard API
│   │   ├── upload/             # File upload
│   │   └── ...
│   ├── auth/                    # Auth pages
│   │   ├── layout.tsx
│   │   └── signin/
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # Reusable components
│   ├── ui/                     # UI components (buttons, inputs, etc)
│   ├── sidebar.tsx
│   ├── user-menu.tsx
│   └── charts.tsx
├── lib/                         # Utility functions
│   ├── auth.ts                 # Auth configuration
│   ├── db.ts                   # Database client
│   ├── hooks.ts                # Custom React hooks
│   ├── utils.ts                # Helper functions
│   └── schemas.ts              # Validation schemas
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
├── styles/                      # Global styles
│   └── globals.css
├── storage/                     # File storage
├── public/                      # Static assets
├── docker-compose.yml          # Docker configuration
├── Dockerfile                  # Container image
├── nginx.conf                  # Nginx configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## Database Schema

### Core Tables
- **User** - System users
- **Role** - User roles
- **Permission** - Access permissions

### Asset Management
- **Machine** - Factory equipment
- **MachineHistory** - Equipment history logs

### Maintenance
- **WorkOrder** - Maintenance tasks
- **WorkOrderHistory** - Task status changes
- **PreventiveMaintenance** - PM schedules
- **CheckSheet** - Inspection forms
- **CheckSheetResponse** - Inspection responses

### Inventory
- **SparePart** - Spare parts catalog
- **StockTransaction** - Inventory movements

### System
- **AuditLog** - Activity tracking
- **Setting** - Configuration values
- **Notification** - System notifications

## API Documentation

### Authentication
```bash
POST /api/auth/signin
GET /api/auth/session
POST /api/auth/signout
```

### Machines
```bash
GET /api/machines
POST /api/machines
GET /api/machines/:id
PUT /api/machines/:id
DELETE /api/machines/:id
```

### Work Orders
```bash
GET /api/work-orders
POST /api/work-orders
GET /api/work-orders/:id
PUT /api/work-orders/:id
```

### Spare Parts
```bash
GET /api/spare-parts
POST /api/spare-parts
GET /api/spare-parts/:id
PUT /api/spare-parts/:id
```

### Dashboard
```bash
GET /api/dashboard/stats
```

## Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cmmsdb"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Application
JWT_SECRET="your-jwt-secret"
APP_NAME="CMMS Factory"
APP_LOGO_URL="/logo.png"
DEFAULT_TIMEZONE="Asia/Bangkok"

# Storage
STORAGE_PATH="./storage"
MAX_FILE_SIZE=10485760

# Email (optional)
SMTP_HOST="smtp.company.com"
SMTP_PORT="587"
SMTP_USER="user@company.com"
SMTP_PASSWORD="password"
SMTP_FROM="cmms@company.com"

# Security
PASSWORD_MIN_LENGTH=8
PASSWORD_REQUIRE_UPPERCASE=true
PASSWORD_REQUIRE_NUMBER=true
PASSWORD_REQUIRE_SPECIAL=true
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:seed      # Seed initial data
npm run db:studio    # Open Prisma Studio

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Features

- ✅ SQL Injection prevention (Prisma ORM)
- ✅ XSS protection (Next.js built-in)
- ✅ CSRF tokens
- ✅ Password hashing (bcryptjs)
- ✅ Session management
- ✅ Role-based access control
- ✅ Audit logging
- ✅ HTTPS ready

## Performance

- Server-side rendering for SEO
- API route caching
- Image optimization
- Database indexing
- Query optimization
- Code splitting

## Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U user -d cmmsdb -c "SELECT 1"

# Reset database
npx prisma migrate reset
```

### Port Already in Use
```bash
# Change port
PORT=3001 npm run dev
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

## Deployment

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
# Build image
docker build -t cmms-factory:latest .

# Run container
docker run -p 3000:3000 cmms-factory:latest
```

### Linux Server
1. Install Node.js 18+
2. Install PostgreSQL 15+
3. Clone repository
4. Install dependencies
5. Configure environment
6. Build application: `npm run build`
7. Start with PM2: `pm2 start npm --name "cmms" -- start`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

Proprietary - All rights reserved © 2024 CMMS Factory

## Support

For issues and questions:
- GitHub Issues: [https://github.com/Killre-free/cmms-factory/issues](https://github.com/Killre-free/cmms-factory/issues)
- Email: support@cmms-factory.com

## Roadmap

### Version 1.1 (Q3 2024)
- [ ] Advanced reporting engine
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] PDF export

### Version 1.2 (Q4 2024)
- [ ] Real-time notifications
- [ ] Mobile push notifications
- [ ] Integration with IoT sensors
- [ ] Predictive maintenance

### Version 2.0 (2025)
- [ ] Multi-tenant support
- [ ] Advanced analytics
- [ ] Machine learning insights
- [ ] API marketplace

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Database by [Prisma](https://prisma.io)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Heroicons](https://heroicons.com)

---

**Made with ❤️ for factory maintenance professionals**
