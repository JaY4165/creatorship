'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LoginFormSchema, LoginFormType, SignUpFormSchema, SignUpFormType } from '@/utils/validations';
import prisma from '@/utils/db';
export async function logIn(formData: LoginFormType) {
    const result = await LoginFormSchema.safeParseAsync(formData)

    if (!result.success) {
        console.log(result.error);
        return
    }
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password
    })


    if (error) {
        const errMsg = error?.message
        return errMsg
    }



    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signUp(formData: SignUpFormType) {
    const result = await SignUpFormSchema.safeParseAsync(formData)
    if (!result.success) {
        console.log(result.error);
        return "Please enter valid credentials"
    }
    const supabase = createClient();
    const { error, data: signUpData } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password
    })

    if (error) {
        const errMsg = JSON.stringify(error?.message)
        console.log(errMsg);
        return errMsg
    }

    if (signUpData.user !== null) {
        const res1 = await prisma.user.findUnique({
            where: {
                id: signUpData.user.id
            }
        })

        if (res1 === null) {
            const res2 = await prisma.user.create({
                data: {
                    id: signUpData.user.id,
                    email: result.data.email,
                    userId: signUpData.user.id
                }
            })
            if (res2 === null) {
                return 'Error in creating user'
            }
        }

    }

    revalidatePath('/', 'layout')
    redirect('/')
}