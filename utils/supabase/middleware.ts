import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../db'
import { Roles } from '../validations'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )


    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/sign-up')
    ) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    if (user) {
        if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/sign-up')) {
            const url = request.nextUrl.clone()
            url.pathname = '/user-type'
            return NextResponse.redirect(url)
        }
    }

    if (request.nextUrl.pathname.startsWith('/user-type')) {
        if (user) {
            const resUser = await prisma.user.findUnique({
                where: {
                    id: user?.id,
                },
            })

            if (resUser?.role !== Roles.BUSINESS || Roles.CREATOR) {
                const url = request.nextUrl.clone()
                url.pathname = '/'
                return NextResponse.redirect('/')
            }
        }
    }


    return supabaseResponse
}