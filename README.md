# Apollo Authorization Header Chrome Extension

A Chrome extension that allows users to inject authorization tokens into the Apollo GraphQL Playground automatically.

## Features

- Send requests to authentication endpoints
- Automatically inject authorization tokens into GraphQL requests
- Manage multiple authentication configurations
- Works with Apollo GraphQL Playground
- Simple and user-friendly interface

## Installation

1. Clone this repository
```bash
git clone https://github.com/your-username/apollo-authorization-header.git
cd apollo-authorization-header
```

2. Install dependencies
```bash
pnpm install
```

3. Build the extension
```bash
pnpm build
```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder from the project directory

## Development

Start the development server:
```bash
pnpm dev
```

Run linting:
```bash
pnpm lint
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- Chrome Extensions API

## Permissions

The extension requires the following permissions:
- webRequest
- webRequestBlocking
- storage
- declarativeNetRequest
- tabs
- activeTab
- scripting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.
