import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [totalMachines, activeMachines, totalWorkOrders, openWorkOrders, lowStockParts] =
      await Promise.all([
        prisma.machine.count({ where: { deletedAt: null } }),
        prisma.machine.count({
          where: { status: "ACTIVE", deletedAt: null },
        }),
        prisma.workOrder.count({ where: { deletedAt: null } }),
        prisma.workOrder.count({
          where: { status: "OPEN", deletedAt: null },
        }),
        prisma.sparePart.findMany({
          where: {
            deletedAt: null,
            currentStock: { lte: prisma.sparePart.fields.minimumStock },
          },
          take: 10,
        }),
      ]);

    const recentWorkOrders = await prisma.workOrder.findMany({
      where: { deletedAt: null },
      include: {
        machine: true,
        assignedTo: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json({
      totalMachines,
      activeMachines,
      totalWorkOrders,
      openWorkOrders,
      lowStockParts,
      recentWorkOrders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
