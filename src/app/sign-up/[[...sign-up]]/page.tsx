import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light px-6">
            <SignUp appearance={{
                elements: {
                    formButtonPrimary: 'bg-primary text-black hover:bg-primary/90',
                    card: 'bg-white rounded-2xl border border-sage shadow-xl',
                    headerTitle: 'text-leaf-dark font-display font-bold',
                    headerSubtitle: 'text-leaf-medium',
                }
            }} />
        </div>
    );
}
