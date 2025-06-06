"use client";
import { cn } from "@rallly/ui";
import { Button } from "@rallly/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@rallly/ui/dropdown-menu";
import { Icon } from "@rallly/ui/icon";
import {
  ArrowUpRight,
  ChevronDownIcon,
  CreditCardIcon,
  GemIcon,
  LifeBuoyIcon,
  ListIcon,
  LogInIcon,
  LogOutIcon,
  MegaphoneIcon,
  Settings2Icon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import Link from "next/link";

import { LoginLink } from "@/components/login-link";
import { OptimizedAvatarImage } from "@/components/optimized-avatar-image";
import { RegisterLink } from "@/components/register-link";
import { Trans } from "@/components/trans";
import { IfCloudHosted, IfSelfHosted } from "@/contexts/environment";
import { isFeedbackEnabled } from "@/utils/constants";

import { IfAuthenticated, IfGuest, useUser } from "./user-provider";

export const UserDropdown = ({ className }: { className?: string }) => {
  const { user, logout } = useUser();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        data-testid="user-dropdown"
        asChild
        className={cn("group min-w-0", className)}
      >
        <Button variant="ghost">
          <OptimizedAvatarImage
            src={user.image ?? undefined}
            name={user.name}
            size="xs"
          />
          <span className="truncate">{user.name}</span>
          <Icon>
            <ChevronDownIcon />
          </Icon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <div className="grow">
            <div>{user.isGuest ? <Trans i18nKey="guest" /> : user.name}</div>
            {user.email ? (
              <div className="text-muted-foreground text-xs font-normal">
                {user.email}
              </div>
            ) : null}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild={true}>
          <Link href="/polls" className="flex items-center gap-x-2 sm:hidden">
            <ListIcon className="text-muted-foreground size-4" />
            <Trans i18nKey="polls" defaults="Polls" />
          </Link>
        </DropdownMenuItem>
        <IfAuthenticated>
          <DropdownMenuItem asChild={true}>
            <Link
              href="/settings/profile"
              className="flex items-center gap-x-2"
            >
              <UserIcon className="text-muted-foreground size-4" />
              <Trans i18nKey="profile" defaults="Profile" />
            </Link>
          </DropdownMenuItem>
        </IfAuthenticated>
        <DropdownMenuItem asChild={true}>
          <Link
            href="/settings/preferences"
            className="flex items-center gap-x-2"
          >
            <Settings2Icon className="text-muted-foreground size-4" />
            <Trans i18nKey="preferences" defaults="Preferences" />
          </Link>
        </DropdownMenuItem>
        <IfCloudHosted>
          <DropdownMenuItem asChild={true}>
            <Link
              href="/settings/billing"
              className="flex items-center gap-x-2"
            >
              <CreditCardIcon className="text-muted-foreground size-4" />
              <Trans i18nKey="Billing" defaults="Billing" />
            </Link>
          </DropdownMenuItem>
        </IfCloudHosted>
        <DropdownMenuSeparator />
        <IfGuest>
          <DropdownMenuItem asChild={true}>
            <LoginLink className="flex items-center gap-x-2">
              <LogInIcon className="text-muted-foreground size-4" />
              <Trans i18nKey="login" defaults="login" />
            </LoginLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild={true}>
            <RegisterLink className="flex items-center gap-x-2">
              <UserPlusIcon className="text-muted-foreground size-4" />
              <Trans i18nKey="createAnAccount" defaults="Register" />
            </RegisterLink>
          </DropdownMenuItem>
        </IfGuest>
        <IfAuthenticated>
          <DropdownMenuItem
            onClick={() => {
              logout();
            }}
            className="flex items-center gap-x-2"
          >
            <LogOutIcon className="text-muted-foreground size-4" />
            <Trans i18nKey="logout" />
          </DropdownMenuItem>
        </IfAuthenticated>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
