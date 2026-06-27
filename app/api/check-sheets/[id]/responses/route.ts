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
    const response = await prisma.checkSheetResponse.create({
      data: {
        checkSheetId: params.id,
        responseData: body.responseData,
        photoPaths: body.photoPaths || [],
        signature: body.signature,
        notes: body.notes,
      },
    });
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit check sheet response" },
      { status: 500 }
    );
  }
}
