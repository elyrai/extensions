import { NextResponse } from "next/server";
import AI from "@/service/assisterr";
import { TokenProvider } from "@/service/token";
import { unstable_cache } from "next/cache";
import generateReview from "@/service/generateReview";

export async function GET(request: Request, context: any) {
  try {
    // Retrieve the token CA
    const awaitedParams = await context.params;
    const { token } = awaitedParams;

    // Create a chat session
    const session_ID = await AI.createChat();

    // Cache the token data
    const cachedData = await unstable_cache(
      async () => {
        const tokenProvider = new TokenProvider(token);
        const tokenData = await tokenProvider.getObject();
        return tokenData;
      },
      [`token-${token}`],
      { revalidate: 60 * 15 }
    )();

    // Generate a review with the AI
    const review = await generateReview(session_ID, cachedData);

    // Return both the cached data and the review
    return NextResponse.json({
      ...cachedData,
      ...review,
      sessionId: session_ID,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occured",
      },
      { status: 400 }
    );
  }
}
