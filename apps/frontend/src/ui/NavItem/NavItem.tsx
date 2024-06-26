import { addEllipsis, cn } from "@/utils";
import React from "react";

export interface NavItemProps {
    leftIcon?: React.ReactNode;
    text?: string;
    rightIcon?: React.ReactNode;
    ellipsis?: boolean;
    ellipsisLength?: number;
    classnames?: string;
    uppercase?: boolean;
    onclick?: () => void;
}

export const NavItem = ({
    leftIcon,
    rightIcon,
    text,
    ellipsis = false,
    ellipsisLength,
    classnames = "",
    uppercase = false,
    onclick,
}: NavItemProps) => {
    return (
        <div
            className={cn(
                "flex w-full cursor-pointer items-center gap-2 overflow-x-hidden rounded capitalize text-intg-text",
                classnames,
            )}
            onClick={onclick && onclick}
        >
            <span>{leftIcon}</span>
            <p
                className={cn(
                    "flex-1 text-left text-sm",
                    uppercase ? "uppercase" : "",
                )}
            >
                {ellipsis
                    ? addEllipsis(text as string, ellipsisLength as number)
                    : text}
            </p>
            <span>{rightIcon}</span>
        </div>
    );
};
