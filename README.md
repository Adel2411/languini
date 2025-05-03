<div align="center">
  <img src="public/mascot.svg" alt="Languini Logo" width="150" />
  <p><i>Making language learning effective and enjoyable</i></p>
</div>

# Languini - Interactive Language Learning Platform

## Overview

Languini is a modern, interactive platform designed to make language learning both effective and enjoyable. With gamified features, structured learning paths, and social elements, Languini provides a comprehensive solution for language acquisition in a digital environment.

## Features

- **Multiple Language Support**: Learn Croatian, Spanish, French, Italian, and Japanese
- **Structured Learning Path**: Progress through units and lessons with increasing difficulty
- **Interactive Challenges**: Two types of challenges (SELECT and ASSIST) to test and reinforce knowledge
- **Points and Hearts System**: Earn points for completing lessons and manage your hearts
- **Leaderboard**: Compete with other learners globally
- **Daily Quests**: Complete challenges to earn additional points
- **Premium Subscription**: Unlock unlimited hearts and additional features
- **Language Exchange**: Practice with other learners through video chat (beta)

## Tech Stack

- **Frontend**: React.js, Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Neon DB, Drizzle ORM
- **Authentication**: Clerk
- **Payments**: Stripe
- **UI Components**: shadcn/ui, Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (or Neon DB account)
- Clerk account for authentication
- Stripe account for payments (optional)

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=your_neon_db_connection_string

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_ADMIN_IDS="user_id1, user_id2"

# Stripe
STRIPE_API_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Adel2411/Languini.git
   cd languini
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run database migrations

   ```bash
   npm run db:push
   ```

4. Seed the database

   ```bash
   npm run seed
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`

## Project Structure

```
languini/
├── app/                  # Next.js App Router pages and components
│   ├── (main)/           # Main application routes (authenticated)
│   ├── (marketing)/      # Public marketing pages
│   └── admin/            # Admin dashboard
├── components/           # Reusable UI components
├── db/                   # Database schema and queries
├── lib/                  # Utility functions and shared logic
├── actions/              # Server actions for data mutations
├── public/               # Static assets
└── ...
```

## Features in Detail

### Courses and Lessons

The learning path is organized into courses (languages), units, lessons, and challenges. Each course contains multiple units that progressively increase in difficulty, and each unit contains related lessons focusing on specific aspects of the language.

### Challenge Types

- **SELECT**: Multiple-choice questions where users select the correct option
- **ASSIST**: Assisted learning where users are given hints to help them answer

### Points and Hearts System

- Earn 10 points for each completed challenge
- Hearts are consumed when answering incorrectly
- Premium users have unlimited hearts
- Free users can refill hearts by spending points

### Language Exchange (Beta)

Practice your language skills in real-time with other learners through video chat. Select your target language and get matched with partners to practice conversation.

## Screenshots

<div align="center">
  <p><i>Screenshots coming soon</i></p>
  <!-- Add actual screenshots here when available -->
  <!-- 
  <img src="/public/screenshots/homepage.png" alt="Homepage" width="45%" />
  <img src="/public/screenshots/course-selection.png" alt="Course selection" width="45%" />
  <img src="/public/screenshots/learning-interface.png" alt="Learning interface" width="45%" />
  <img src="/public/screenshots/quiz-interface.png" alt="Quiz interface" width="45%" />
  <img src="/public/screenshots/language-exchange.png" alt="Language exchange" width="45%" />
  -->
</div>

## Deployment

The application is configured for easy deployment on Vercel, but can be deployed on any platform that supports Next.js applications.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Developed with ❤️ by [HADJ ARAB Adel](https://github.com/Adel2411)
