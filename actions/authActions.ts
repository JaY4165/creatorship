'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod';
import { SignUpFormSchema, SignUpFormType } from '@/utils/validations';
import { toast } from '@/components/ui/use-toast';

export async function logIn(formData: FormData) {
    const supabase = createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signUp(formData: SignUpFormType) {

    const supabase = createClient();

    const result = await SignUpFormSchema.safeParseAsync(formData)

    if (!result.success) {
        console.log(result.error);
        return
    }

    const { error } = await supabase.auth.signUp(formData)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}