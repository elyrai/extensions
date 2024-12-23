import { BASE_URL } from "../config";
import { addLoadingBox, addMessage, createMessageBox } from "./html-edition";

export default async function handlerJUP() {
  addLoadingBox();

  const tokenTicker = window.location.href.split("/").pop()?.split("-")[1];
  let tokenAddress;
  if (tokenTicker?.match(/[1-9A-HJ-NP-Za-km-z]{32,44}/)) {
    tokenAddress = tokenTicker;
  } else {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/search?q=${tokenTicker}`,
      {
        method: "GET",
        headers: {},
      }
    );
    const data = await response.json();
    tokenAddress = data.pairs[0].baseToken.address;
  }

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
