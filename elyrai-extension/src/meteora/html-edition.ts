import { BASE_URL } from "../config";

export function createMessageBox(data?: any) {
  // remove loading box

  const loadingBox = document.getElementById("loading-box");
  if (loadingBox) {
    loadingBox.remove();
  }

  const dataBox = document.getElementById("data-box");
  if (dataBox) {
    dataBox.remove();
  }

  const container = getContainer();

  const newElem = document.createElement("div");
  newElem.style.cssText =
    "tab-size: 4; font-feature-settings: normal; font-variation-settings: normal; box-sizing: border-box; display: flex; flex-direction: column; width: 100%; align-items: center; justify-content: space-between; overflow: hidden; border-radius: 0.5rem; background-color: white; padding: 0.5rem; font-family: 'Inter', sans-serif; margin-top: 2rem;";
  newElem.id = "data-box";

  newElem.innerHTML = `
    <style>
      .separator {
        display: flex;
        align-items: center;
        text-align: center;
        color: #666; /* Couleur du texte */
        font-size: 14px;
        margin: 20px 0;
      }

      .separator::before,
      .separator::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid #ccc;
        margin: 0 10px;
      }
    </style>

      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          gap: 2rem;
        "
      >
        <img
          src="https://www.geckoterminal.com/_next/image?url=https%3A%2F%2Fassets.geckoterminal.com%2Fwhra7bjc6jk3u60rfklysidughco&w=256&q=75"
          alt="Icon"
          style="
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 0.5rem;
          "
        />
        <div>
        <div id="elyrai-chat" style="max-height: 300px; overflow-y: auto;">
        </div>
      <form id="input-form" style="display: flex; flex-direction: column; align-items: center; gap: 1rem; margin-top: 1rem;">
    <input 
      type="text" 
      id="user-input" 
      placeholder="Chat with ELYRAI..." 
      style="padding: 0.5rem; border-radius: 0.25rem; border: 1px solid #ccc; width: 80%;" 
    />
    <button 
      type="submit"
      style="padding-top: .75rem;padding-bottom: .75rem; padding-left: 1rem; padding-right: 1rem; border: none; border-radius: 0.75rem; background-color: #191C32; color: white; cursor: pointer; width: 20%"
     >
     Submit 
    </button>
  </form>
  </div>`;

  container.appendChild(newElem);

  const form = document.getElementById("input-form");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("user-input") as HTMLInputElement;
    const query = input.value;
    input.value = "";
    addMessage({ message: query, is_user: true });
    const sessionId = localStorage.getItem(
      window.location.href.split("-").pop()!
    );
    if (sessionId == null) {
      return;
    }
    const response = await fetch(`${BASE_URL}/api/chat/${sessionId}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    addMessage(data);
  });

  if (data) {
    addFirstData(data);
  }
}

export function addFirstData(data: any) {
  const container = document.getElementById("elyrai-chat");

  if (container == null) {
    throw new Error("Could not find chat container");
  }

  const separator = document.createElement("div");
  separator.className = "separator";
  separator.innerHTML = "Elyrai";

  const newElem = document.createElement("div");
  newElem.style.cssText = `
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 0.2rem;
  `;

  newElem.innerHTML = `
        <div style="display: flex; gap: 1rem">
          <p style="color: #111827; margin: 0">24h volume:</p>
          <p style="color: #111827; margin: 0">${data.volume24h}$</p>
        </div>
        <div style="display: flex; gap: 1rem">
          <p style="color: #111827; margin: 0">Liquidiy</p>
          <p style="color: #111827; margin: 0">${data.liquidity}$</p>
        </div>
        <div style="display: flex; gap: 1rem">
          <p style="color: #111827; margin: 0">Holders:</p>
          <p style="color: #111827; margin: 0">${data.holders}</p>
        </div>
        <div style="display: flex; gap: 1rem">
          <p style="color: #111827; margin: 0">Top 10 holders supply:</p>
          <p style="color: #111827; margin: 0">${data.top10Holders}%</p>
        </div>
        <div style="display: flex; gap: 1rem">
          <p style="color: #111827; margin: 0">Rug check score:</p>
          <p style="color: #111827; margin: 0">${data.rugcheckScore} - ${
    data.risk
  }</p>
        </div>
        ${
          !data.risks || data.risks.length === 0
            ? `
        <div style="display: flex; gap: 1rem">
          <p style="color: #111827; margin: 0">Rug risks:</p>
        </div>
          `
            : `
        <div style="display: flex; gap: 1rem">
          <p style="color: #111827; margin: 0">Rug risks:</p>
        </div>
        <ul style="color: #111827; margin: 0; list-style-type: disc; padding: revert">
          ${data.risks
            // Add the marker to the beginning of each line
            .map(
              (risk: any) => `<li>
            ${risk.description}</li>`
            )
            .join("\n")}
        </ul>
            `
        }
      </div>
      <br />
      <p style="text-align: left; color: #111827">
        ${data.message}
      </p>
  `;

  container.appendChild(separator);
  container.appendChild(newElem);
}

function getContainer(): Element {
  // const container = document.querySelector(
  //   "#__next > div.flex.min-h-screen.w-screen.flex-col.items-center.space-y-4.bg-v2-background-page > div.flex.flex-1.flex-col.items-center.justify-center.px-4.lg\\:pt-16.w-full.sm\\:max-w-lg.lg\\:max-w-7xl"
  // );
  const container = document.querySelector(
    "#__next > div.max-w-\\[100vw\\].max-h-\\[100vh\\].antialiased > div:nth-child(3) > div > div.flex.flex-col.mt-4.lg\\:mt-10.px-4.xl\\:px-0 > div > div.mt-3.lg\\:mt-0.flex.flex-col.space-y-3.lg\\:basis-2\\/3"
  );
  if (container == null) {
    throw new Error("Could not find card body");
  }

  return container;
}

export function addMessage(message: any) {
  // add a message to the chat

  const container = document.getElementById("elyrai-chat");
  if (container == null) {
    throw new Error("Could not find chat container");
  }

  const separator = document.createElement("div");
  separator.className = "separator";
  separator.innerHTML = message.is_user ? "You" : "Elyrai";

  const newElem = document.createElement("div");
  newElem.style.cssText = `
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 0.2rem;
    margin-top: 1rem;
  `;
  newElem.innerHTML = `
    <div style="display: flex; gap: 1rem">
      <p style="color: #111827; margin: 0">${message.message}</p>
    </div>
  `;

  container.appendChild(separator);
  container.appendChild(newElem);
}

// same as data but you place the image and instead of the div with all the data you place a loading box
export function addLoadingBox() {
  document.getElementById("data-box")?.remove();
  document.getElementById("loading-box")?.remove();

  const container = getContainer();
  const newElem = document.createElement("div");
  newElem.style.cssText =
    "tab-size: 4; font-feature-settings: normal; font-variation-settings: normal; box-sizing: border-box; display: flex; width: 100%; align-items: center; justify-content: space-between; overflow: hidden; border-radius: 0.5rem; background-color: white; padding: 0.5rem; font-family: 'Inter', sans-serif; margin-top: 2rem;";
  newElem.id = "loading-box";

  newElem.innerHTML = `
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          gap: 2rem;
        "
      >
        <img
          src="https://www.geckoterminal.com/_next/image?url=https%3A%2F%2Fassets.geckoterminal.com%2Fwhra7bjc6jk3u60rfklysidughco&w=256&q=75"
          alt="Icon"
          style="
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 0.5rem;
          "
        />
        <div>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-content: center;
              gap: 0.2rem;
            "
          >
            <div style="display: flex; gap: 1rem">
              <p style="color: #111827; margin: 0">Loading...</p>
            </div>
          </div>
        </div>
      </div>`;
  container.appendChild(newElem);
}
