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
    Preview,
    Section,
    Tailwind,
    Text
} from "@react-email/components";

interface TwoFactorAuthEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  twoFactorAuthenticationCode?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const currentYear = new Date().getFullYear();

export const TwoFactorAuthEmail = ({
  username,
  twoFactorAuthenticationCode,
}: TwoFactorAuthEmailProps) => {
  const previewText = `Welcome back!`;

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
                              Security
                          </Heading>
                      </Section>

                      <Text className="text-black text-[14px] leading-[24px]">
                          <strong>Hello {username}!</strong>
                      </Text>
                      <Text className="text-black text-[14px] leading-[24px]">
                          Welcome back! This is your access code:
                      </Text>
                      <Section className="text-center mt-[32px] mb-[32px]">
                          <Button
                              className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                          >
                                {twoFactorAuthenticationCode}
                          </Button>
                      </Section>
                      <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                      <Text className="text-[#666666] text-[12px] leading-[24px]">
                          You are receiving this email because you configured two-factor authentication on your account.
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

TwoFactorAuthEmail.PreviewProps = {
  username: "alanturing",
  invitedByUsername: "Alan",
  invitedByEmail: "alan.turing@example.com",
  teamName: "Enigma",
  twoFactorAuthenticationCode: "https://vercel.com/teams/invite/foo",
  inviteFromIp: "204.13.186.218",
  inviteFromLocation: "São Paulo, Brazil",
} as TwoFactorAuthEmailProps;

export default TwoFactorAuthEmail;
