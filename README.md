# Metly - Video Conferencing Platform

A modern video conferencing platform built with Next.js, Stream Video SDK, and TailwindCSS.

## Features

- 🎥 Real-time video conferencing
- 👥 Personal meeting rooms
- 📅 Schedule meetings
- 📱 Responsive design
- 🔒 Secure authentication with Clerk
- 🎨 Modern UI with TailwindCSS
- 📝 Meeting notes
- 🔍 View meeting recordings
- 🖥️ Screen sharing capabilities
- 🔇 Audio/video controls

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Stream Video SDK](https://getstream.io/video/docs/) - Video conferencing
- [Clerk](https://clerk.com/) - Authentication
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn package manager

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/metly.git
   cd metly
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_STREAM_API_KEY=
   STREAM_SECREAT_KEY
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

    ```


5. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Visit `http://localhost:3000` to see the application

## Project Structure

```
metly/
├── app/               # Next.js app directory
├── components/        # Reusable UI components
├── lib/               # Utility functions and shared logic
├── public/            # Static assets
└── styles/            # Global styles
```

## Contributing

We welcome contributions to Metly! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Support

For support, email sagespeak008@cyberdude.com