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
    const stockTransactions = await prisma.stockTransaction.findMany({
      where: { deletedAt: null },
      include: {
        sparePart: true,
        createdBy: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json(stockTransactions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stock transactions" },
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

    // Create transaction
    const transaction = await prisma.stockTransaction.create({
      data: {
        sparePartId: body.sparePartId,
        type: body.type,
        quantity: body.quantity,
        reference: body.reference,
        notes: body.notes,
        createdById: session.user.id,
      },
      include: { sparePart: true },
    });

    // Update spare part stock
    const sparePart = await prisma.sparePart.findUnique({
      where: { id: body.sparePartId },
    });

    if (sparePart) {
      let newStock = sparePart.currentStock;
      if (body.type === "RECEIVE") {
        newStock += body.quantity;
      } else if (["ISSUE", "LOSS", "TRANSFER"].includes(body.type)) {
        newStock -= body.quantity;
      } else if (body.type === "RETURN") {
        newStock += body.quantity;
      }

      await prisma.sparePart.update({
        where: { id: body.sparePartId },
        data: { currentStock: Math.max(0, newStock) },
      });
    }

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create stock transaction" },
      { status: 500 }
    );
  }
}
