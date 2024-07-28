import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { UserType } from '@prisma/client'

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
            console.log(user.id)
            const { data, error } = await supabase
                .from('User')
                .select('role')
                .eq('userId', user.id)



            console.log(data)

            if (error) {
                console.log(error)
                return supabaseResponse
            }


            if (data && data.length > 0 && data[0].role !== null) {
                const url = request.nextUrl.clone()
                const { data, error } = await supabase
                    .from('User')
                    .select('role')
                    .eq('userId', user.id)
                if (error) {
                    console.log(error)
                    return supabaseResponse
                }

                if (data && data.length > 0) {
                    const role = data[0].role
                    if (role === UserType.BUSINESS) {
                        const url = request.nextUrl.clone()
                        url.pathname = '/business-form'
                        return NextResponse.redirect(url)
                    } else if (role === UserType.CREATOR) {
                        const url = request.nextUrl.clone()
                        url.pathname = '/creator-form'
                        return NextResponse.redirect(url)
                    }

                }
                url.pathname = '/'
                return NextResponse.redirect(url)
            }
        }
    }


    return supabaseResponse
}