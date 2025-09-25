import '@styles/globals.css';
import ErrorPage from "@components/features/ErrorPage"
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Error Page",
};

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    return <ErrorPage error={error} reset={reset} />
}
