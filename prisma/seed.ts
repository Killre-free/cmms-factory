import { PrismaClient, Role, Permission, WorkOrderType, Priority, MachineStatus, PMFrequency, StockType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.checkSheetResponse.deleteMany();
  await prisma.checkItem.deleteMany();
  await prisma.checkSheet.deleteMany();
  await prisma.pmWorkOrder.deleteMany();
  await prisma.preventiveMaintenance.deleteMany();
  await prisma.workOrderSparePart.deleteMany();
  await prisma.workOrderHistory.deleteMany();
  await prisma.workOrder.deleteMany();
  await prisma.machineHistory.deleteMany();
  await prisma.machine.deleteMany();
  await prisma.stockTransaction.deleteMany();
  await prisma.sparePart.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();

  // Create Permissions
  const permissions = await Promise.all([
    prisma.permission.create({
      data: {
        name: 'view_dashboard',
        description: 'View dashboard',
        module: 'dashboard',
        action: 'view',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'manage_machines',
        description: 'Create, edit, delete machines',
        module: 'machines',
        action: 'manage',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'view_machines',
        description: 'View machines',
        module: 'machines',
        action: 'view',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'manage_work_orders',
        description: 'Manage work orders',
        module: 'work_orders',
        action: 'manage',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'view_work_orders',
        description: 'View work orders',
        module: 'work_orders',
        action: 'view',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'manage_preventive_maintenance',
        description: 'Manage preventive maintenance',
        module: 'preventive_maintenance',
        action: 'manage',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'manage_spare_parts',
        description: 'Manage spare parts inventory',
        module: 'spare_parts',
        action: 'manage',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'view_reports',
        description: 'View reports',
        module: 'reports',
        action: 'view',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'manage_users',
        description: 'Manage users',
        module: 'users',
        action: 'manage',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'view_audit_logs',
        description: 'View audit logs',
        module: 'audit_logs',
        action: 'view',
      },
    }),
  ]);

  // Create Roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
      description: 'Administrator',
      permissions: {
        connect: permissions.map((p) => ({ id: p.id })),
      },
    },
  });

  const managerRole = await prisma.role.create({
    data: {
      name: 'manager',
      description: 'Maintenance Manager',
      permissions: {
        connect: [
          permissions.find((p) => p.name === 'view_dashboard')!.id,
          permissions.find((p) => p.name === 'manage_work_orders')!.id,
          permissions.find((p) => p.name === 'view_work_orders')!.id,
          permissions.find((p) => p.name === 'manage_preventive_maintenance')!.id,
          permissions.find((p) => p.name === 'manage_spare_parts')!.id,
          permissions.find((p) => p.name === 'view_reports')!.id,
          permissions.find((p) => p.name === 'view_audit_logs')!.id,
        ].map((id) => ({ id })),
      },
    },
  });

  const technicianRole = await prisma.role.create({
    data: {
      name: 'technician',
      description: 'Maintenance Technician',
      permissions: {
        connect: [
          permissions.find((p) => p.name === 'view_dashboard')!.id,
          permissions.find((p) => p.name === 'view_work_orders')!.id,
          permissions.find((p) => p.name === 'view_machines')!.id,
        ].map((id) => ({ id })),
      },
    },
  });

  const operatorRole = await prisma.role.create({
    data: {
      name: 'operator',
      description: 'Machine Operator',
      permissions: {
        connect: [
          permissions.find((p) => p.name === 'view_dashboard')!.id,
          permissions.find((p) => p.name === 'view_machines')!.id,
        ].map((id) => ({ id })),
      },
    },
  });

  // Create Users
  const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10);
  };

  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@factory.local',
      name: 'Administrator',
      password: await hashPassword('Admin@123'),
      roleId: adminRole.id,
      department: 'Administration',
      phone: '+66-1234-5678',
      isActive: true,
    },
  });

  const managerUser = await prisma.user.create({
    data: {
      username: 'manager',
      email: 'manager@factory.local',
      name: 'Maintenance Manager',
      password: await hashPassword('Manager@123'),
      roleId: managerRole.id,
      department: 'Maintenance',
      phone: '+66-1234-5679',
      isActive: true,
    },
  });

  const tech1User = await prisma.user.create({
    data: {
      username: 'tech1',
      email: 'tech1@factory.local',
      name: 'John Technician',
      password: await hashPassword('Tech@123'),
      roleId: technicianRole.id,
      department: 'Maintenance',
      phone: '+66-1234-5680',
      isActive: true,
    },
  });

  const operatorUser = await prisma.user.create({
    data: {
      username: 'operator',
      email: 'operator@factory.local',
      name: 'Machine Operator',
      password: await hashPassword('Operator@123'),
      roleId: operatorRole.id,
      department: 'Operations',
      phone: '+66-1234-5681',
      isActive: true,
    },
  });

  // Create Machines
  const machine1 = await prisma.machine.create({
    data: {
      code: 'MCD-001',
      name: 'CNC Machine A',
      description: 'Heavy duty CNC machine for metal cutting',
      type: 'CNC_MACHINE',
      model: 'HAAS ST-30',
      serialNumber: 'SN-2020-001',
      manufacturer: 'HAAS Automation',
      manufacturerDate: new Date('2020-06-15'),
      location: 'Factory Floor - Section A',
      runningHours: 2450,
      status: MachineStatus.ACTIVE,
      isActive: true,
    },
  });

  const machine2 = await prisma.machine.create({
    data: {
      code: 'MCD-002',
      name: 'Hydraulic Press B',
      description: 'Hydraulic press for metal forming',
      type: 'HYDRAULIC_PRESS',
      model: 'HPM-500T',
      serialNumber: 'SN-2019-002',
      manufacturer: 'Press Co.',
      manufacturerDate: new Date('2019-03-10'),
      location: 'Factory Floor - Section B',
      runningHours: 3200,
      status: MachineStatus.ACTIVE,
      isActive: true,
    },
  });

  const machine3 = await prisma.machine.create({
    data: {
      code: 'MCD-003',
      name: 'Welding Robot C',
      description: 'Industrial welding robot',
      type: 'WELDING_ROBOT',
      model: 'KUKA KR 500',
      serialNumber: 'SN-2021-003',
      manufacturer: 'KUKA',
      manufacturerDate: new Date('2021-01-20'),
      location: 'Factory Floor - Section C',
      runningHours: 1800,
      status: MachineStatus.ACTIVE,
      isActive: true,
    },
  });

  // Create Spare Parts
  const sparePart1 = await prisma.sparePart.create({
    data: {
      code: 'SP-001',
      name: 'Hydraulic Oil Filter',
      description: 'Original hydraulic oil filter',
      category: 'FILTERS',
      unit: 'PCS',
      currentStock: 15,
      minimumStock: 5,
      reorderPoint: 10,
      reorderQuantity: 20,
      unitPrice: 450,
      supplier: 'Hydro Supply Co.',
      leadTime: 3,
      isActive: true,
      createdById: adminUser.id,
    },
  });

  const sparePart2 = await prisma.sparePart.create({
    data: {
      code: 'SP-002',
      name: 'CNC Cutting Tool',
      description: 'Carbide cutting tool for CNC',
      category: 'TOOLS',
      unit: 'PCS',
      currentStock: 8,
      minimumStock: 3,
      reorderPoint: 5,
      reorderQuantity: 15,
      unitPrice: 1200,
      supplier: 'Tool Systems Ltd.',
      leadTime: 5,
      isActive: true,
      createdById: adminUser.id,
    },
  });

  const sparePart3 = await prisma.sparePart.create({
    data: {
      code: 'SP-003',
      name: 'Pneumatic Cylinder',
      description: 'Double-acting pneumatic cylinder',
      category: 'PNEUMATICS',
      unit: 'PCS',
      currentStock: 2,
      minimumStock: 2,
      reorderPoint: 3,
      reorderQuantity: 10,
      unitPrice: 2800,
      supplier: 'Pneumatic Pro',
      leadTime: 7,
      isActive: true,
      createdById: adminUser.id,
    },
  });

  // Create Work Orders
  const wo1 = await prisma.workOrder.create({
    data: {
      title: 'Machine A Maintenance',
      description: 'Quarterly maintenance and inspection',
      machineId: machine1.id,
      type: WorkOrderType.PREVENTIVE,
      priority: Priority.MEDIUM,
      status: 'COMPLETED',
      createdById: managerUser.id,
      assignedToId: tech1User.id,
      completedById: tech1User.id,
      plannedDate: new Date(),
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      estimatedHours: 4,
      actualHours: 3.5,
      comments: 'Maintenance completed successfully',
    },
  });

  const wo2 = await prisma.workOrder.create({
    data: {
      title: 'Hydraulic Pressure Drop',
      description: 'Investigate and fix pressure drop issue',
      machineId: machine2.id,
      type: WorkOrderType.CORRECTIVE,
      priority: Priority.HIGH,
      status: 'ASSIGNED',
      createdById: managerUser.id,
      assignedToId: tech1User.id,
      plannedDate: new Date(),
      estimatedHours: 3,
      comments: 'Pressure readings below normal',
    },
  });

  // Create Preventive Maintenance Plans
  const pm1 = await prisma.preventiveMaintenance.create({
    data: {
      name: 'Monthly CNC Machine Inspection',
      description: 'Monthly inspection and lubrication',
      machineId: machine1.id,
      frequency: PMFrequency.MONTHLY,
      interval: 30,
      lastExecuted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      nextDue: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  });

  const pm2 = await prisma.preventiveMaintenance.create({
    data: {
      name: 'Weekly Hydraulic System Check',
      description: 'Check oil level, pressure, and leaks',
      machineId: machine2.id,
      frequency: PMFrequency.WEEKLY,
      interval: 7,
      lastExecuted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      nextDue: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  });

  // Create Settings
  await prisma.setting.create({
    data: {
      key: 'app_name',
      value: 'CMMS Factory',
      type: 'STRING',
    },
  });

  await prisma.setting.create({
    data: {
      key: 'app_logo',
      value: '/logo.png',
      type: 'STRING',
    },
  });

  await prisma.setting.create({
    data: {
      key: 'timezone',
      value: 'Asia/Bangkok',
      type: 'STRING',
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`  - 4 Roles created`);
  console.log(`  - 4 Users created`);
  console.log(`  - 3 Machines created`);
  console.log(`  - 3 Spare Parts created`);
  console.log(`  - 2 Work Orders created`);
  console.log(`  - 2 Preventive Maintenance plans created`);
  console.log('\n🔐 Default Credentials:');
  console.log('  Admin: admin / Admin@123');
  console.log('  Manager: manager / Manager@123');
  console.log('  Technician: tech1 / Tech@123');
  console.log('  Operator: operator / Operator@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
