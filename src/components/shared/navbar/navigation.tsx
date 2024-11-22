import { LuBook } from "react-icons/lu"

export type NavigationSubItem = {
    title: string;
    href: string;
    description: string;
    icon?: React.ReactNode;
    subtitle?: string;
}

export type NavigationItem = {
    name: string;
    href: string;
    description?: string;
    featured?: boolean;
    items?: NavigationSubItem[];
}

export const navigationItems: NavigationItem[] = [
    { 
        name: 'Home', 
        href: '/', 
    },
    {
        name: 'Features',
        href: '#',
        description: 'You can sell, buy and manage your sales and purchases.',
        items: [
            {
                title: 'Sell',
                href: '/sell',
                description: 'Sell your products.'
            },
            {
                title: 'My products',
                href: '/my-products',
                description: 'Products you have published.'
            },
            {
                title: 'My sales',
                href: '/my-sales',
                description: 'See or refund sales you have made'
            },
            {
                title: 'Buy',
                href: '/buy',
                description: 'Explore products and buy.'
            },
            {
                title: 'My orders',
                href: '/my-orders',
                description: 'Orders you have made.'
            }
        ]
    },
    {
        name: 'Documentation',
        href: 'https://docs.vexorpay.com/en/docs/core/guides/marketplaces',
        featured: true,
    }
];