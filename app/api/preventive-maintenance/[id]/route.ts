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
    const pm = await prisma.preventiveMaintenance.findUnique({
      where: { id: params.id },
      include: {
        machine: true,
        checkItems: true,
        workOrders: true,
      },
    });
    if (!pm) {
      return NextResponse.json(
        { error: "Preventive maintenance not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(pm);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch preventive maintenance" },
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
    const pm = await prisma.preventiveMaintenance.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        frequency: body.frequency,
        interval: body.interval,
        nextDue: body.nextDue ? new Date(body.nextDue) : undefined,
        isActive: body.isActive,
      },
    });
    return NextResponse.json(pm);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update preventive maintenance" },
      { status: 500 }
    );
  }
}
