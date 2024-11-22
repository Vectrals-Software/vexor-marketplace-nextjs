# Next.js Marketplace Example

#### This is an open source repo for starting an marketplace with authentication, mailing, multi-vendor and payment flows already set up:

You can customize it to your needs and scale it however you want. This is a starting point.

`Typescript, React.js, Next.js 15, Prisma, MongoDB, Shadcn, Tailwind, Next-auth, Resend, Zod and more.`

## Getting Started


#### Prerequisites:

- Node.js 18.17.1 or higher
- npm 9.6.7 or higher
- Vexor account
- Mercadopago or Stripe account (for allowing your vendors to connect their accounts and receive payments. You will also have the possibility to charge a fee for each transaction to your vendors)

#### Authentication:

1 - install all dependencies:

```bash
npm run dev

```

2 - Set environment variables: 
    
    Create a .env file with the variables defined in .env-example and complete them with your own values.

3 - Configure your OAuth providers:

    Make sure you use 'YOUR_APP_DOMAIN/api/auth/callback/YOUR_PROVIDER' for callback urls. Eg: http://localhost:3000/api/auth/callback/google

4 - Set up prisma by running:

```bash
npx prisma generate && npx prisma db push

```

5 - Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Contributing

Contributions are always welcome! 

## Authors

- [@Enzo-21](https://github.com/Enzo-21)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)