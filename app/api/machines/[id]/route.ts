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
    const machine = await prisma.machine.findUnique({
      where: { id: params.id },
      include: {
        workOrders: true,
        preventiveMaintenance: true,
        machineHistory: true,
      },
    });
    if (!machine) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }
    return NextResponse.json(machine);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch machine" },
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
    const machine = await prisma.machine.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        type: body.type,
        model: body.model,
        serialNumber: body.serialNumber,
        manufacturer: body.manufacturer,
        location: body.location,
        status: body.status,
      },
    });
    return NextResponse.json(machine);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update machine" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.machine.update({
      where: { id: params.id },
      data: { deletedAt: new Date() },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete machine" },
      { status: 500 }
    );
  }
}
