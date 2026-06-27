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
    const checkSheets = await prisma.checkSheet.findMany({
      where: { deletedAt: null },
      include: { machine: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(checkSheets);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch check sheets" },
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
    const checkSheet = await prisma.checkSheet.create({
      data: {
        name: body.name,
        description: body.description,
        machineId: body.machineId,
        formData: body.formData,
        createdById: session.user.id,
        isActive: true,
      },
      include: { machine: true },
    });
    return NextResponse.json(checkSheet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create check sheet" },
      { status: 500 }
    );
  }
}
