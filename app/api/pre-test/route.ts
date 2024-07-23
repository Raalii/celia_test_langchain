import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, name, age, gender, level } = await req.json();
  try {
    const preTestData = await prisma.user.create({
      data: {
        email,
        name,
        age,
        gender,
        level,
      },
    });
    return NextResponse.json(preTestData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
