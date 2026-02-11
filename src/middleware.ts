import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getOrCreateDB from "./models/server/dbSetup"

// This function can be marked `async` if using `await` inside
export  async function middleware(request: NextRequest) {
    await Promise.all([
      getOrCreateDB(),
    ])
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    /** Match all request paths except for the ones starting with :
     * /api or /_next/static (static files)
     * /_next/image (image optimization)
     * /favicorn.com
     * */
     
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',

  ],
}