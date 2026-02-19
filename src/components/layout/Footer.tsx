import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <Leaf className="h-6 w-6 text-primary hidden md:block" />
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built for better harvests. &copy; {new Date().getFullYear()} PhytoGuard AI.
                    </p>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <Link href="/privacy" className="hover:underline hover:text-primary">Privacy</Link>
                    <Link href="/terms" className="hover:underline hover:text-primary">Terms</Link>
                    <Link href="/api" className="hover:underline hover:text-primary">API</Link>
                </div>
            </div>
        </footer>
    );
}
