import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { apiAuthPrefix, authRoutes, defaultLoginRedirect, mobileAuthRoutes, publicRoutes } from "./routes"
export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isMobileRoute = mobileAuthRoutes.includes(nextUrl.pathname)
  
  // 1:  We don't even need to check if the user is logged in or not here:
  if (isApiAuthRoute) {
    return 
  }

  // 2: By default all users are allowed to visit this routes, but if a user is already logged it should be redirected to defaultLoginRedirect:
  if (isAuthRoute) {

    if (isAuthenticated && !mobileAuthRoutes) {
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
    }
    return
  }

  // 3: If the user is not logged in and the route is not public, the user should be requested to login in order to access the route:
  if (!isAuthenticated && !isPublicRoute) {
    
    let callbackUrl = nextUrl.pathname
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    
    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }



  // 4: Allow any other route
  return


})



// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}