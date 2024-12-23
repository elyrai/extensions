import { NextResponse } from "next/server";
import AI from "@/service/assisterr";

export async function GET(request: Request, context: any) {
  try {
    const awaitedParams = await context.params;

    const { sessionId } = awaitedParams;

    const history = await AI.getHistory(sessionId);

    const sanitizedHistory = history.map((message) => {
      return {
        message: message.query,
        is_user: message.is_user,
      };
    });
    sanitizedHistory.pop();

    return NextResponse.json(sanitizedHistory.toReversed());
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occured",
      },
      { status: 400 }
    );
  }
}
