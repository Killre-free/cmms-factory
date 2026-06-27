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
    const machines = await prisma.machine.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(machines);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch machines" },
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
    const machine = await prisma.machine.create({
      data: {
        code: body.code,
        name: body.name,
        description: body.description,
        type: body.type,
        model: body.model,
        serialNumber: body.serialNumber,
        manufacturer: body.manufacturer,
        location: body.location,
        status: "ACTIVE",
      },
    });
    return NextResponse.json(machine, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create machine" },
      { status: 500 }
    );
  }
}
