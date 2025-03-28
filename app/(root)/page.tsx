import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action'
import Image from 'next/image'
import Link from 'next/link'

export default async function page() {
    const user = await getCurrentUser()

    const [userInterviews, latestInterviews] = await Promise.all([
        await getInterviewsByUserId(user?.id!),
        await getLatestInterviews({ userId: user?.id! })
    ])

    const hasPastInterviews = userInterviews?.length! > 0
    const upcomingInterviews = latestInterviews?.length! > 0

    return (
        <>
            <section className='card-cta'>
                <div className='flex flex-col gap-6 max-w-lg'>
                    <h2>Get Interview ready with AI-Powered Practice and Feedback</h2>
                    <p className='text-lg'>Practice on real interview questions and get instant feedback</p>
                    <Button asChild className='btn-primary max-sm:w-full'>
                        <Link href='/interview'>
                            Start an Interview
                        </Link>
                    </Button>
                </div>
                <Image src='/robot.png' alt='robo-dude' width={400} height={400} className='max-sm:hidden' />
            </section>

            <section className='flex flex-col gap-6 mt-8'>
                <h2>Your Interviews</h2>

                <div className='interviews-section'>
                    {hasPastInterviews ? (
                        userInterviews?.map((interview) => (
                            <InterviewCard
                                key={interview.id}
                                userId={user?.id}
                                interviewId={interview.id}
                                role={interview.role}
                                type={interview.type}
                                techstack={interview.techstack}
                                createdAt={interview.createdAt} />
                        ))) : (
                        <p>You haven't taken any interviews yet</p>
                    )
                    }
                </div>
            </section>

            <section className='flex flex-col gap-6 mt-8'>
                <h2>Take Interviews</h2>

                <div className='interviews-section'>
                    {upcomingInterviews ? (
                        latestInterviews?.map((interview: any) => (
                            <InterviewCard
                                key={interview.id}
                                userId={user?.id}
                                interviewId={interview.id}
                                role={interview.role}
                                type={interview.type}
                                techstack={interview.techstack}
                                createdAt={interview.createdAt} />
                        ))) : (
                        <p>There are no interviews available</p>
                    )
                    }
                </div>
            </section>
        </>
    )
}
