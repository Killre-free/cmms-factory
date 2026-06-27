import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const pm = await prisma.preventiveMaintenance.findUnique({
      where: { id: params.id },
    });

    if (!pm) {
      return NextResponse.json(
        { error: "Preventive maintenance not found" },
        { status: 404 }
      );
    }

    // Create work order from PM template
    const workOrder = await prisma.workOrder.create({
      data: {
        title: pm.name,
        description: pm.description || "",
        machineId: pm.machineId,
        type: "PREVENTIVE",
        priority: "MEDIUM",
        status: "OPEN",
        createdById: session.user.id,
        plannedDate: new Date(),
      },
      include: { machine: true },
    });

    // Update PM last executed
    await prisma.preventiveMaintenance.update({
      where: { id: params.id },
      data: {
        lastExecuted: new Date(),
        nextDue: new Date(
          Date.now() + pm.interval * 24 * 60 * 60 * 1000
        ),
      },
    });

    return NextResponse.json(workOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate work order" },
      { status: 500 }
    );
  }
}
