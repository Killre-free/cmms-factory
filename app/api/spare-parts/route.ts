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
    const spareParts = await prisma.sparePart.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(spareParts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch spare parts" },
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
    const sparePart = await prisma.sparePart.create({
      data: {
        code: body.code,
        name: body.name,
        description: body.description,
        category: body.category,
        unit: body.unit,
        unitPrice: body.unitPrice,
        minimumStock: body.minimumStock,
        reorderPoint: body.reorderPoint,
        reorderQuantity: body.reorderQuantity,
        supplier: body.supplier,
        leadTime: body.leadTime,
        createdById: session.user.id,
      },
    });
    return NextResponse.json(sparePart, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create spare part" },
      { status: 500 }
    );
  }
}
