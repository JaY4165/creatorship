'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/db";

export async function changeNavAction() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/");
    }

    const userData = await prisma.user.findUnique({
        where: {
            userId: user.id,
        },
    });

    return userData?.role
}