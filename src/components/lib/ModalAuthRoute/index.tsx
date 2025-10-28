import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface IProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ModelAuthRoute = ({ open, onOpenChange }: IProps) => {
    const router = useRouter();

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Access Denied</AlertDialogTitle>
                    <AlertDialogDescription>
                        You do not have permission to access this page.
                        Please log in to continue.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            onOpenChange(false);
                            router.back();
                        }}
                    >
                        No
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onOpenChange(false);
                            router.push("/auth/login");
                        }}
                    >
                        Log In
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModelAuthRoute;
