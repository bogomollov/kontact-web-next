'use client'

import { OAuthProvider, oauthProviders } from "@/lib/providers";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    icon?: IconType;
    provider?: OAuthProvider;
}

export default function Button({ type = 'button', className, icon, children, provider, disabled, ...props }: ButtonProps) {
    const router = useRouter();
    const providerData = oauthProviders.find((p) => p.id === provider);
    const Icon = providerData?.icon

    const handleClick = () => {
        if (providerData?.authUrl) {
            router.push(providerData.authUrl)
        }
    }

    return (
        <button type={type} className={"inline-flex items-center justify-center px-4 py-2 " + `${className} ` + providerData?.styles}
            onClick={handleClick}
            disabled={disabled}
            {...props}
        >
            {Icon && <Icon />}
            {children || (providerData ? `Войти через ${providerData.name}` : null)}
        </button>
    );
}