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
    const sparePart = await prisma.sparePart.findUnique({
      where: { id: params.id },
      include: {
        stockTransactions: true,
      },
    });
    if (!sparePart) {
      return NextResponse.json(
        { error: "Spare part not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(sparePart);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch spare part" },
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
    const sparePart = await prisma.sparePart.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        unitPrice: body.unitPrice,
        minimumStock: body.minimumStock,
        reorderPoint: body.reorderPoint,
      },
    });
    return NextResponse.json(sparePart);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update spare part" },
      { status: 500 }
    );
  }
}
