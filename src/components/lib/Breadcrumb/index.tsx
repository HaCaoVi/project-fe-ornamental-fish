"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { motion } from "framer-motion";
import React from "react";

const formatSegment = (segment: string) => {
    return segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
};

export function AutoBreadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const items = [
        // {
        //     label: "Home", href: " / "
        // },
        ...segments.map((segment, index) => ({
            label: formatSegment(segment),
            href: "/" + segments.slice(0, index + 1).join("/"),
        })),
    ];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={index} >
                        <BreadcrumbItem key={item.href}>
                            {index < items.length - 1 ? (
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href!}>
                                            {item.label}
                                        </Link>
                                    </BreadcrumbLink>
                                </motion.div>
                            ) : (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator key={`sep-${item.href}`}>
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </BreadcrumbSeparator>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
