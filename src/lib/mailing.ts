import { VerificationEmail } from '@/components/mailing/email-verification';
import { ResetPasswordEmail } from '@/components/mailing/reset-password-email';
import { TwoFactorAuthEmail } from '@/components/mailing/two-factor-auth';
import { Resend } from 'resend';
import { APP_DOMAIN, MAILING_DOMAIN } from './constants';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (name: string | undefined | null, email: string, token: string) => {
    const verificationLink = `${APP_DOMAIN}/auth/email-verification?token=${token}`

    const { data, error } = await resend.emails.send({
        from: `Next.js Marketplace <enzo-next-auth@${MAILING_DOMAIN}>`,
        to: [email],
        subject: 'Welcome! ',
        text: verificationLink,
        react: VerificationEmail({ username: name || 'Friend', verificationLink }),
    });
}

const sendPasswordResetEmail = async (name: string | undefined | null, email: string, token: string) => {
    const resetPasswordLink = `${APP_DOMAIN}/auth/password/reset?token=${token}`

    const { data, error } = await resend.emails.send({
        from: `Next.js Marketplace <enzo-next-auth@${MAILING_DOMAIN}>`,
        to: [email],
        subject: 'Reset your password',
        text: resetPasswordLink,
        react: ResetPasswordEmail({ username: name || 'Friend', resetPasswordLink }),
    });
}

const send2FAEmail = async (name: string | undefined | null, email: string, twoFACode: string) => {
    const twoFactorAuthenticationCode = twoFACode

    const { data, error } = await resend.emails.send({
        from: `Next.js Marketplace <enzo-next-auth@${MAILING_DOMAIN}>`,
        to: [email],
        subject: `Your code is ${twoFACode}`,
        text: twoFactorAuthenticationCode,
        react: TwoFactorAuthEmail({ username: name || 'Friend', twoFactorAuthenticationCode }),
    });
}

export {
    send2FAEmail, sendPasswordResetEmail, sendVerificationEmail
};
