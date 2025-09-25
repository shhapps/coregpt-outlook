# CoreGPT Outlook Add-in

A Microsoft Outlook Add-in that integrates AI capabilities directly into Outlook, built with React and Office.js.

## 🚀 Features

- Integration with Microsoft Outlook
- AI-powered text generation and editing
- Modern Radix UI interface
- Authentication using MSAL
- State management with Zustand

## 🛠️ Tech Stack

- React 19
- TypeScript
- Radix UI
- Office.js
- Azure MSAL for authentication
- Webpack for bundling
- Axios for API requests

## 📋 Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Microsoft Office (Outlook)
- Office Developer tools

## 🔧 Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd coregpt-word
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.development.env` for development
   - Update the environment variables with your credentials

4. Start the development server:
   ```bash
   npm run dev-server
   ```

5. Start the add-in:
   ```bash
   # For desktop Outlook
   npm run start:desktop
   
   # For Outlook Online
   npm run start:web
   ```

## 📦 Available Scripts

- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run dev-server` - Start development server
- `npm run start` - Start the add-in
- `npm run start:desktop` - Start add-in in desktop Outlook
- `npm run start:web` - Start add-in in Outlook Online
- `npm run lint` - Run linting
- `npm run prettier` - Format code
- `npm run validate` - Validate manifest

## 🏗️ Project Structure

```
├── assets/              # Static assets
├── src/
│    ├── components/  # React components
│    ├── interfaces/  # TypeScript interfaces
│    ├── types/      # TypeScript types
│    ├── utils/      # Utility functions
│    ├── index.tsx   # Entry point
│    └── taskpane.html
├── manifest*.xml       # Add-in manifest files
├── .env.example        # Example environment variables
└── webpack.config.js   # Webpack configuration
```

## 🔐 Environment Variables

The following environment variables are required:

```
API_URL=             # Backend API URL
APP_URL=             # Frontend application URL
```

## 📄 Manifest Files

- `manifest.xml` - Production manifest
- `manifest-local.xml` - Local development manifest
- `manifest-dev.xml` - Development environment manifest

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
