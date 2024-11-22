import { APP_LOGO } from "@/lib/constants";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from "@react-email/components";

interface ResetPasswordEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  resetPasswordLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const currentYear = new Date().getFullYear();

export const ResetPasswordEmail = ({
  username,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Reset your password`;

  return (
      <Html>
          <Head />
          <Preview>{previewText}</Preview>
          <Tailwind>
              <Body className="bg-white my-auto mx-auto font-sans px-2">
                  <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                      <Section className="mt-[32px] ">
                          <Img
                              src={APP_LOGO}
                              width="50"
                              height="50"
                              alt="Vercel"
                              className="my-0 mx-auto"
                          />
                          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                              Did you forget your password?
                          </Heading>
                      </Section>

                      <Text className="text-black text-[14px] leading-[24px]">
                          <strong>Hello {username}!</strong>
                      </Text>
                      <Text className="text-black text-[14px] leading-[24px]">
                          You requested a password reset. Don&apos;t worry, we&apos;ll help you. It&apos;s very simple, just click the button below to create your new password. The link is valid for 15 minutes, after that you will need to request the reset again if necessary:
                      </Text>
                      <Section className="text-center mt-[32px] mb-[32px]">
                          <Button
                              className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                              href={resetPasswordLink}
                          >
                              Reset my password
                          </Button>
                      </Section>
                      <Text className="text-black text-[14px] leading-[24px]">
                          or copy and paste this address into your browser:{" "}
                          <Link href={resetPasswordLink} className="text-blue-600 no-underline">
                              {resetPasswordLink}
                          </Link>
                      </Text>
                      <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                      <Text className="text-[#666666] text-[12px] leading-[24px]">
                          If you weren&apos;t the one who requested this email, just ignore it.
                      </Text>

                      <Text
                          style={{
                              textAlign: "center",
                              fontSize: 12,
                              color: "rgb(0,0,0, 0.7)",
                          }}
                      >
                            &copy; {currentYear} | Next.js Marketplace 
                      </Text>
                  </Container>
              </Body>
          </Tailwind>
      </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  username: "alanturing",
  invitedByUsername: "Alan",
  invitedByEmail: "alan.turing@example.com",
  teamName: "Enigma",
  resetPasswordLink: "https://vercel.com/teams/invite/foo",
  inviteFromIp: "204.13.186.218",
  inviteFromLocation: "São Paulo, Brazil",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
