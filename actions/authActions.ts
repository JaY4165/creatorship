'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LoginFormSchema, LoginFormType, SignUpFormSchema, SignUpFormType } from '@/utils/validations';

export async function logIn(formData: LoginFormType) {
    const result = await LoginFormSchema.safeParseAsync(formData)

    if (!result.success) {
        console.log(result.error);
        return
    }
    const supabase = createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password
    })

    console.log(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signUp(formData: SignUpFormType) {
    const result = await SignUpFormSchema.safeParseAsync(formData)
    if (!result.success) {
        console.log(result.error);
        return
    }
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password
    })
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}