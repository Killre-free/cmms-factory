import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const workOrder = await prisma.workOrder.findUnique({
      where: { id: params.id },
      include: {
        machine: true,
        assignedTo: true,
        createdBy: true,
        completedBy: true,
        spareParts: {
          include: { sparePart: true },
        },
        history: true,
      },
    });
    if (!workOrder) {
      return NextResponse.json(
        { error: "Work order not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(workOrder);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch work order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const workOrder = await prisma.workOrder.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        priority: body.priority,
        assignedToId: body.assignedToId,
        actualHours: body.actualHours,
        comments: body.comments,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
      },
      include: {
        machine: true,
        assignedTo: true,
      },
    });

    // Create history record
    await prisma.workOrderHistory.create({
      data: {
        workOrderId: params.id,
        status: body.status,
        comment: body.comments,
      },
    });

    return NextResponse.json(workOrder);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update work order" },
      { status: 500 }
    );
  }
}
