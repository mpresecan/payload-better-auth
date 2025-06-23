import { Button } from '@/components/ui/button'
import { getSession } from '@/modules/auth/lib'
import Link from 'next/link'

const DashboardPage = async () => {

    const session = await getSession()

    return (
        <div>
            Dashboard<br />
            <br />
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
            <Button asChild>
                <Link href="/auth/sign-out">
                    Sign Out
                </Link>
            </Button>
        </div>
    )
}

export default DashboardPage
