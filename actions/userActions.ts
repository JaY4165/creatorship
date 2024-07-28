"use server"

import { createClient } from "@/utils/supabase/server";
import prisma from '@/utils/db';
import { redirect } from "next/navigation";
import { UserType } from "@prisma/client";

export async function userTypeAction(userRole: UserType) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return
    }
    const res = await prisma.user.findUnique({
        where: {
            userId: user.id
        },
        select: {
            role: true
        }
    })

    if (res === null) {
        return 'User not found'
    }

    if (res?.role !== null) {
        return "User already has a role"
    }

    console.log(userRole, "User role is ")

    const res1 = await prisma.user.update({
        where: {
            userId: user.id
        },
        data: {
            role: userRole
        },
        select: {
            role: true
        }
    })

    if (res1 && res1.role !== null) {
        const role = res1.role
        if (role === UserType.BUSINESS) {
            redirect('/business-form')
        } else if (role === UserType.CREATOR) {
            redirect('/creator-form')
        }

    }

    redirect('/')
}

// export async function userTypeMiddleware() {

//     const supabase = createClient();
//     const {
//         data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) {
//         return
//     }

//     if (user) {
//         const getUser = await prisma.user.findUnique({
//             where: {
//                 id: user.id,
//             },
//         })
//         if (getUser?.role !== Roles.BUSINESS || Roles.CREATOR) {
//             redirect
//         }
//     }


// }