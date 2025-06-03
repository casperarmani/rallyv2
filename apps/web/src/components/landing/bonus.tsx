import { prisma } from "@rallly/database";
import {
  CalendarCheck2Icon,
  LanguagesIcon,
  Users2Icon,
  ZapIcon,
} from "lucide-react";

import { BonusItem } from "./bonus-item";

export async function SimplifiedBonus() {
  const userCount = await prisma.user.count();
  const roundedUserCount =
    userCount > 100000 ? Math.floor(userCount / 10000) * 10000 : userCount;
  return (
    <div className="mx-auto flex flex-wrap justify-center gap-2 whitespace-nowrap text-center sm:grid-cols-4 sm:gap-4 sm:gap-x-8">
      <BonusItem
        className="bg-indigo-600"
        icon={<Users2Icon className="size-4" />}
      >
        {roundedUserCount.toLocaleString()}+ registered users
      </BonusItem>
      <BonusItem
        delay={0.25}
        className="bg-pink-600"
        icon={<CalendarCheck2Icon className="size-4" />}
      >
        300K+ polls created
      </BonusItem>
      <BonusItem
        delay={0.5}
        className="bg-gray-800"
        icon={<LanguagesIcon className="size-4" />}
      >
        10+ languages supported
      </BonusItem>
      <BonusItem
        delay={0.75}
        className="bg-teal-500"
        icon={<ZapIcon className="size-4" />}
      >
        No login required
      </BonusItem>
    </div>
  );
}