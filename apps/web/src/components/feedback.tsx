import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@rallly/ui/dropdown-menu";
import {
  BugIcon,
  LifeBuoyIcon,
  LightbulbIcon,
  MegaphoneIcon,
  SmileIcon,
} from "lucide-react";
import Link from "next/link";

import { Trans } from "@/components/trans";

const FeedbackButton = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="shadow-huge fixed bottom-8 right-6 z-20 hidden size-12 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 active:shadow-none sm:inline-flex">
        <MegaphoneIcon className="h-5 text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10} align="end">
        <DropdownMenuLabel>
          <Trans i18nKey="menu" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeedbackButton;
