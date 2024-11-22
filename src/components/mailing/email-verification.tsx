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

interface VerificationEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  verificationLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const currentYear = new Date().getFullYear();

export const VerificationEmail = ({
  username,
  verificationLink,
}: VerificationEmailProps) => {
  const previewText = `Verify your email`;

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
                              Welcome to <strong>Next.js Marketplace</strong>
                          </Heading>
                      </Section>

                      <Text className="text-black text-[14px] leading-[24px]">
                          <strong>Hello {username}!</strong>
                      </Text>
                      <Text className="text-black text-[14px] leading-[24px]">
                          We are glad you are part of{" "}
                          <strong>Next.js Marketplace</strong>. Just need you to confirm your email address by clicking the button below:
                      </Text>
                      <Section className="text-center mt-[32px] mb-[32px]">
                          <Button
                              className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                              href={verificationLink}
                          >
                              Verify my email
                          </Button>
                      </Section>
                      <Text className="text-black text-[14px] leading-[24px]">
                          or copy and paste this address in your browser:{" "}
                          <Link href={verificationLink} className="text-blue-600 no-underline">
                              {verificationLink}
                          </Link>
                      </Text>
                      <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                      <Text className="text-[#666666] text-[12px] leading-[24px]">
                          If you are not the one who requested this email, just ignore it.
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

VerificationEmail.PreviewProps = {
  username: "alanturing",
  invitedByUsername: "Alan",
  invitedByEmail: "alan.turing@example.com",
  teamName: "Enigma",
  verificationLink: "https://vercel.com/teams/invite/foo",
  inviteFromIp: "204.13.186.218",
  inviteFromLocation: "São Paulo, Brazil",
} as VerificationEmailProps;

export default VerificationEmail;
