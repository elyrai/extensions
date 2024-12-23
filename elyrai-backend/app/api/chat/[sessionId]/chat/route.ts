import { NextResponse } from "next/server";
import AI from "@/service/assisterr";

export async function POST(request: Request, context: any) {
  try {
    const awaitedParams = await context.params;
    const { sessionId } = awaitedParams;

    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({
        error: "Please provide a query",
      });
    }

    const response = await AI.sendMessage(sessionId, query);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occured",
      },
      { status: 400 }
    );
  }
}
