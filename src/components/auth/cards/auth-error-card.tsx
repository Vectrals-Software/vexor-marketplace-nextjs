import AuthCardWrapper from "./auth-card-wrapper"

const AuthErrorCard = () => {
  return (
   <AuthCardWrapper
   headerLabel="Ooops, something went wrong!"
   backButtonLabel="Back to login"
   backButtonHref="/auth/login"
   >
    <></>
   </AuthCardWrapper>
  )
}

export default AuthErrorCard