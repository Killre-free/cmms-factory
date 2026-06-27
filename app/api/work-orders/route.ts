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
    const workOrders = await prisma.workOrder.findMany({
      where: { deletedAt: null },
      include: {
        machine: true,
        assignedTo: true,
        createdBy: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(workOrders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch work orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const workOrder = await prisma.workOrder.create({
      data: {
        title: body.title,
        description: body.description,
        machineId: body.machineId,
        type: body.type,
        priority: body.priority || "MEDIUM",
        status: "OPEN",
        createdById: session.user.id,
        estimatedHours: body.estimatedHours,
      },
      include: {
        machine: true,
        createdBy: true,
      },
    });
    return NextResponse.json(workOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create work order" },
      { status: 500 }
    );
  }
}
