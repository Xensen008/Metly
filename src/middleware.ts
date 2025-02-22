import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)',
])

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    
    if (protectedRoutes(req)) {
        if (!userId) {
            // Create redirect URL with the current URL as the redirect parameter
            const signInUrl = new URL('/sign-in', req.url);
            signInUrl.searchParams.set('redirect_url', req.url);
            
            // Use NextResponse instead of Response for proper redirect handling
            return new Response(null, {
                status: 302,
                headers: {
                    Location: signInUrl.toString(),
                }
            });
        }
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}