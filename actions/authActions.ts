'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LoginFormSchema, LoginFormType, SignUpFormSchema, SignUpFormType } from '@/utils/validations';
import prisma from '@/utils/db';
import { UserType } from '@prisma/client';
export async function logIn(formData: LoginFormType) {
    const result = await LoginFormSchema.safeParseAsync(formData)

    if (!result.success) {
        console.log(result.error);
        return
    }
    const supabase = createClient();

    const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password
    })




    if (signInError) {
        const errMsg = signInError?.message
        return errMsg
    }


    const res = await prisma.user.findUnique({
        where: {
            id: signInData.user.id
        },
        select: {
            role: true
        }
    })


    if (res === null) {
        return 'User not found'
    }

    if (res.role !== UserType.BUSINESS || UserType.CREATOR) {
        redirect('/user-type')
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
                userId: signUpData.user.id
            },
            select: {
                role: true
            }
        })

        if (res1 === null) {
            const res2 = await prisma.user.create({
                data: {
                    email: result.data.email,
                    userId: signUpData.user.id
                }
            })
            if (res2 === null) {
                return 'Error in creating user'
            }
            redirect('/user-type')
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

// export async function signUp(formData: SignUpFormType) {
//     const result = await SignUpFormSchema.safeParseAsync(formData);

//     if (!result.success) {
//         console.error(result.error);
//         return "Please enter valid credentials";
//     }

//     const supabase = createClient();
//     const { error, data: signUpData } = await supabase.auth.signUp({
//         email: result.data.email,
//         password: result.data.password
//     });

//     if (error) {
//         console.error(error.message);
//         return error.message;
//     }

//     // const user = signUpData.user;

//     // if (user) {
//     //     const existingUser = await prisma.user.findUnique({
//     //         where: { id: user.id },
//     //         select: { role: true }
//     //     });

//     //     if (!existingUser) {
//     //         try {
//     //             await prisma.user.create({
//     //                 data: {
//     //                     id: user.id,
//     //                     email: result.data.email,
//     //                     userId: user.id
//     //                 }
//     //             });
//     //             return redirect('/user-type');
//     //         } catch (createError) {
//     //             console.error(createError);
//     //             return 'Error in creating user';
//     //         }
//     //     }
//     // }

//     revalidatePath('/', 'layout');
//     return redirect('/');
// }