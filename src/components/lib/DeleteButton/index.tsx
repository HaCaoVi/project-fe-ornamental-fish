"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@components/ui/alert-dialog"

interface DeleteButtonProps {
    id: string
    onDelete: (id: string) => void,

}

export function DeleteButton({ id, onDelete }: DeleteButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 text-muted-foreground hover:text-red-600 hover:bg-red-50 
          dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-all duration-200 
          rounded-lg group border border-transparent hover:border-red-200 dark:hover:border-red-800"
                    title="Delete item"
                >
                    <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="sr-only">Delete item</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the item.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(id)}>
                        Yes, delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
