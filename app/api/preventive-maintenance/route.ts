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
    const preventiveMaintenance = await prisma.preventiveMaintenance.findMany({
      where: { deletedAt: null },
      include: { machine: true },
      orderBy: { nextDue: "asc" },
    });
    return NextResponse.json(preventiveMaintenance);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch preventive maintenance" },
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
    const pm = await prisma.preventiveMaintenance.create({
      data: {
        name: body.name,
        description: body.description,
        machineId: body.machineId,
        frequency: body.frequency,
        interval: body.interval,
        runningHourInterval: body.runningHourInterval,
        nextDue: new Date(body.nextDue),
        isActive: true,
      },
      include: { machine: true },
    });
    return NextResponse.json(pm, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create preventive maintenance" },
      { status: 500 }
    );
  }
}
