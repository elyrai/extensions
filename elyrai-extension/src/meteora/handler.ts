import { BASE_URL } from "../config";
import { addLoadingBox, addMessage, createMessageBox } from "./html-edition";

export default async function handlerMET() {
  addLoadingBox();

  const poolCA = window.location.href.split("/").pop()!;

  const response = await fetch(
    `https://api.dexscreener.com/latest/dex/search?q=${poolCA}`,
    {
      method: "GET",
      headers: {},
    }
  );
  const data = await response.json();
  const tokenAddress = data.pairs[0].baseToken.address;

  if (!localStorage.getItem(window.location.href.split("-").pop()!)) {
    const data = await fetch(`${BASE_URL}/api/${tokenAddress}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error", err);
      });
    localStorage.setItem(
      window.location.href.split("-").pop()!,
      data.sessionId
    );
    createMessageBox(data);
  } else {
    const sessionId = localStorage.getItem(
      window.location.href.split("-").pop()!
    );
    const response = await fetch(`${BASE_URL}/api/chat/${sessionId}/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    createMessageBox();
    data.forEach((message: any) => {
      addMessage(message);
    });
  }
}
