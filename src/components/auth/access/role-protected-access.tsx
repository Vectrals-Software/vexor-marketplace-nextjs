import FormError from "@/components/shared/indicators/form-error";
import { currentUser } from "@/lib/auth-user";


interface RoleProtectedAccessProps {
  children: React.ReactNode;
  allowedRole: string;
};

export const RoleProtectedAccess = async ({
  children,
  allowedRole,
}: RoleProtectedAccessProps) => {
  const user = await currentUser();

  if (user?.role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    )
  }

  return (
    <>
      {children}
    </>
  );
};