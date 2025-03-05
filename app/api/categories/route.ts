import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(){
    const categories = await prisma.characteristicCategory.findMany();
    return NextResponse.json(categories);
}