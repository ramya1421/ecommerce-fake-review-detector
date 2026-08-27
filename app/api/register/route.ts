import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Input validation — prevent empty/oversized payloads reaching the DB
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }
    if (password.length > 128) {
      return NextResponse.json(
        { message: "Password is too long" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email is already in use" }, { status: 400 });
    }

    // bcrypt work factor of 10 is standard for production
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        id: nanoid(),
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err: any) {
    console.error("Registration error:", err?.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
