import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/'])

export default clerkMiddleware(async (auth, req) => {
	// Skip auth protection if Clerk is not configured
	if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
		return
	}

	if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}