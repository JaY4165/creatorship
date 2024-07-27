"use server"

import { createClient } from "@/utils/supabase/server";
import prisma from '@/utils/db';
import { Roles } from "@/utils/validations";

export async function userTypeAction(userRole: Roles) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return
    }
    const res = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            role: true
        }
    })

    if (!res) {
        return
    }

    const res1 = prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            role: userRole
        }
    })

}