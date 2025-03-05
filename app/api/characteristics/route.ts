import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(){
    const characteristics = await prisma.smartphoneCharacteristic.findMany();
    return NextResponse.json(characteristics);
}
