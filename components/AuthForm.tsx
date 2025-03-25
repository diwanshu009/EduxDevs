"use client"

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import FormField from './FormField'

const authSchema = (type: 'sign-up' | 'sign-in') => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    });
}

export default function AuthForm({ type }: { type: 'sign-up' | 'sign-in' }) {
    const router = useRouter();
    const formSchema = authSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === 'sign-up') {
                toast.success('Account created successfully. Please sign-in');
                router.push('/sign-in');
            } else {
                toast.success('Signed in successfully.');
                router.push('/');
            }
        } catch (err) {
            console.error(err);
            toast.error(`There was an error: ${err}`);
        }
    }

    const isSign = type === 'sign-in';

    return (
        <div className='card-border lg:min-w-[566px]'>
            <div className='flex flex-col gap-6 card py-14 px-10'>
                <div className='flex flex-row gap-2 justify-center'>
                    <Image
                        src='/logo.svg'
                        alt='logo'
                        height={32}
                        width={38}
                    />
                    <h2 className='text-primary-100'>EduxDevs</h2>
                </div>
                <h3 className='text-center'>Practice Job Interviews with AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {type === 'sign-up' && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder='Your name' />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email"
                            type="email" />
                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder='Your password'
                            type='password' />
                        <Button className='btn' type="submit">{isSign ? 'Sign-in' : 'Create an account'}</Button>
                    </form>
                </Form>

                <p className='text-center'>
                    {isSign ? 'No account yet?' : 'Have an account already'}
                    <Link href={isSign ? '/sign-up' : '/sign-in'} className='font-bold text-user-primary ml-1'>
                        {isSign ? 'Sign up' : 'Sign in'}
                    </Link>
                </p>
            </div>
        </div>
    );
}