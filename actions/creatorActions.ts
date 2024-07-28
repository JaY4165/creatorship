"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/db";
import { CreatorFormDataType } from "@/utils/validations";

export async function creatorFormAction(creatorData: CreatorFormDataType) {

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

    console.log(creatorData)

    const userRoleType = await prisma.creatorProfile.create({
        data: {
            fullName: creatorData.fullName,
            contentNiche: creatorData.contentNiche,
            description: creatorData.description,
            country: creatorData.country,
            state: creatorData.state,
            city: creatorData.city,
            address: creatorData.address,
            postalCode: creatorData.zip,
            userId: user.id,
        },
    });

    redirect('/')

}