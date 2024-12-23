# Extensions Project

This project consists of three main components:

1. **Elyrai Backend**: Provides an API to retrieve token information.
2. **Elyrai Extension**: An extension dedicated to the Jupiter and Meteora platform for fetching token details, providing Elyrai's interpretation of market data, and offering interactive guidance for Jupiter's features and functionalities.

This project uses [Assisterr](https://www.assisterr.ai/) to interpret token information and respond to user messages.

![Extension Elyrai](https://github.com/user-attachments/assets/7b56dfd8-5b9d-4e10-9326-77f7c6f8d824)

## Project Structure

- `elyrai-backend/`: Contains the main API. It communicates with the extensions to gather and provide information.
- `elyrai-extension/`: Manages integration and operations related to the Jupiter and Meteora platform.

## How does it work?

The backend will retrieve data using Birdeye API, then we created our SLM on Assisterr [Elyrai](https://build.assisterr.ai/model/elyrai) to interpret the data and provide information to the user.
The user can then chat with Elyrai to get more information about the token.
The conversation is stored thanks to the Assisterr API, so we can keep track of the user's questions and keep an history of the conversation, and a context during the conversation.

### Assisterr integration

- **Real-time Analysis**: Immediate interpretation of market data
- **Conversation History**: Storage and tracking of exchanges through the Assisterr API
- **Maintained Context**: Preservation of discussion flow for coherent responses
- **Intuitive Interface**: Dialog box directly integrated into trading platforms

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/koh-samui/extensions.git
   cd extensions
   ```

## Getting Started

### Extensions

#### Use the pre-built extension

1. Download the zip from the release page on GitHub:

   - [Elyrai Extension](https://github.com/koh-samui/extensions/releases/download/v1/elyrai.zip)

2. Follow this tutorial to install the chrome extension: https://dev.to/ben/how-to-install-chrome-extensions-manually-from-github-1612

#### Custom Installation

1. Navigate to the extension folder you want to install:

   ```bash
   cd elyrai-extension
   ```

2. Install the dependencies:

   ```bash
   bun install
   ```

3. Build the extension:

   ```bash
   bun run build
   ```

4. Zip `/dist` folder into dist.zip:

   ```bash
   zip -r dist.zip dist
   ```

5. You can then follow this tutorial to install the chrome extension: https://dev.to/ben/how-to-install-chrome-extensions-manually-from-github-1612

## Utilisation

The backend is already running on a server, so you don't need to start it. But if you want to start it locally, you can do so by following the backend README.
Then you will need to modify the url in the extension to point to your local server.

Once you want to trade a token either on Jupiter or Meteora, you will see an Elyrai box appear with the latests information about the token. And data interpreted by Elyrai, you will then be able to chat with Elyrai to get more information about the token.


https://github.com/user-attachments/assets/cddafcc8-e4dd-4160-91a6-4e228b762393



https://github.com/user-attachments/assets/48c19ac5-092f-4310-b5bd-bfefba7c427a





## Contribution

1. Fork the repository.
2. Create a new branch for your changes:
   ```bash
   git checkout -b feature/my-change
   ```
3. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License.

---

If you have any questions or issues, feel free to open an issue on the repository or contact the development team.
