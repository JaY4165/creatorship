"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/db";
import { BusinessFormDataType } from "@/utils/validations";

export async function businessFormAction(businessData: BusinessFormDataType) {
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


    const userRoleType = await prisma.businessProfile.create({
        data: {
            companyName: businessData.companyName,
            industry: businessData.industry,
            description: businessData.description,
            country: businessData.country,
            state: businessData.state,
            city: businessData.city,
            address: businessData.address,
            postalCode: businessData.zip,
            userId: user.id,
        },
    });

    redirect('/')

}