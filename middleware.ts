import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'
 
export default async function middleware(req: NextRequest) {
 
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

	if (req.nextUrl.pathname.startsWith("/_next")) {
		return NextResponse.next();
	}

	if (!req.nextUrl.pathname.startsWith(`/${session?.user}`)) {
    return NextResponse.redirect(new URL('/', req.url))
  } 

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path+'],
}