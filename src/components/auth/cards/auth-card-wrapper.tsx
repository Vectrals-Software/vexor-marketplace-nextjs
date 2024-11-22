import { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import AuthCardHeader from "./auth-card-header";
import AuthSocialButtons from "../buttons/social-buttons";
import AuthBackButton from "../buttons/back-button";

interface AuthCardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  headerTitle?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

const AuthCardWrapper = ({ children, headerTitle, headerLabel, backButtonLabel, backButtonHref, showSocial }: AuthCardWrapperProps) => {
  return (
    <Card className="w-[400px] max-w-full shadow-md">
      <CardHeader>
        <AuthCardHeader title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <AuthSocialButtons />
        </CardFooter>
      )}
      {backButtonLabel && backButtonHref && (
        <CardFooter>
          <AuthBackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      )}

    </Card>
  );
};

export default AuthCardWrapper;
