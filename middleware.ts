import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

const middlewareWithClerk = clerkMiddleware(async (auth, req) => {
	if (isProtectedRoute(req)) {
		await auth.protect()
	}
	// Clerk will call NextResponse.next() by default when no response is returned
})

const middlewareNoOp = () => NextResponse.next()

export default hasClerkKeys ? middlewareWithClerk : middlewareNoOp

export const config = {
	matcher: [
		'/((?!.*\..*|_next).*)',
		'/',
		'/(api|trpc)(.*)'
	],
}