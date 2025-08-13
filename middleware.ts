import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
	// Skip auth protection if Clerk is not configured
	const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY
	if (!hasClerkKeys) {
		return
	}

	try {
		if (isProtectedRoute(req)) await auth.protect()
	} catch (error) {
		// Avoid failing the entire request on middleware errors
		return
	}
})

export const config = {
	matcher: [
		'/dashboard(.*)',
		'/(api|trpc)(.*)',
	],
}