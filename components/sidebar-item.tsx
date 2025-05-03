"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

type SidebarItemProps = {
  label: string;
  iconSrc: string;
  href: string;
  badge?: string; // Added optional badge prop
};

export const SidebarItem = ({
  label,
  iconSrc,
  href,
  badge,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href} className="flex w-full items-center">
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />
        <span className="flex-1">{label}</span>
        {badge && (
          <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
            {badge}
          </span>
        )}
      </Link>
    </Button>
  );
};
