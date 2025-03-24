import { NextResponse } from "next/server";
import { swaggerSpec } from "../../../utils/swaggerConfig";

export async function GET() {
    return NextResponse.json(swaggerSpec);
}
