import { Tile, TileDescription, TileGrid, TileTitle } from "@rallly/ui/tile";
import Link from "next/link";

import {
  BillingPageIcon,
  CreatePageIcon,
  EventPageIcon,
  HomePageIcon,
  PollPageIcon,
  PreferencesPageIcon,
  ProfilePageIcon,
} from "@/app/components/page-icons";
import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/app/components/page-layout";
import { getLoggedIn } from "@/next-auth";
import { Trans } from "@/components/trans";
import { IfCloudHosted } from "@/contexts/environment";
import { getTranslation } from "@/i18n/server";
import { prisma } from "@rallly/database";
import { FeedbackAlert } from "./feedback-alert";
import { Marketing, BigTestimonial, MentionedBy } from "@/components/landing/marketing";
import { MarketingHero } from "@/components/landing/hero";
import { SimplifiedBonus } from "@/components/landing/bonus";
import { requireUser } from "@/auth/queries";

async function loadData() {
  const isLoggedIn = await getLoggedIn();
  
  if (!isLoggedIn) {
    return {
      livePollCount: 0,
      upcomingEventCount: 0,
      isLoggedIn: false,
    };
  }

  const user = await requireUser();
  const now = new Date();
  const [livePollCount, upcomingEventCount] = await Promise.all([
    prisma.poll.count({
      where: {
        userId: user.id,
        status: "live",
        deleted: false,
      },
    }),
    prisma.event.count({
      where: {
        userId: user.id,
        start: {
          gte: now,
        },
      },
    }),
  ]);

  return {
    livePollCount,
    upcomingEventCount,
    isLoggedIn: true,
  };
}

export default async function Page() {
  const { livePollCount, upcomingEventCount, isLoggedIn } = await loadData();

  // Show landing page for unauthenticated users
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <Marketing>
            <MarketingHero
              title="Find the best time to meet"
              description="Coordinate group meetings without the back-and-forth emails"
              callToAction="Create a Meeting Poll"
            />
            <SimplifiedBonus />
            <BigTestimonial />
            <MentionedBy />
          </Marketing>
        </div>
      </div>
    );
  }

  // Show dashboard for authenticated users
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <HomePageIcon />
          <Trans i18nKey="home" defaults="Home" />
        </PageTitle>
        <PageDescription>
          <Trans
            i18nKey="homeDashboardDesc"
            defaults="Manage your polls, events, and account settings"
          />
        </PageDescription>
      </PageHeader>
      <PageContent className="space-y-8">
        <IfCloudHosted>
          <FeedbackAlert />
        </IfCloudHosted>
        <div className="space-y-4">
          <h2 className="text-muted-foreground text-sm">
            <Trans i18nKey="homeActionsTitle" defaults="Actions" />
          </h2>
          <TileGrid>
            <Tile asChild>
              <Link href="/new">
                <CreatePageIcon />
                <TileTitle>
                  <Trans i18nKey="create" defaults="Create" />
                </TileTitle>
              </Link>
            </Tile>
          </TileGrid>
        </div>
        <div className="space-y-4">
          <h2 className="text-muted-foreground text-sm">
            <Trans i18nKey="homeNavTitle" defaults="Navigation" />
          </h2>
          <TileGrid>
            <Tile asChild>
              <Link href="/polls">
                <PollPageIcon />
                <TileTitle>
                  <Trans i18nKey="polls" defaults="Polls" />
                </TileTitle>
                <TileDescription>
                  <Trans
                    i18nKey="livePollCount"
                    defaults="{count} live"
                    values={{ count: livePollCount }}
                  />
                </TileDescription>
              </Link>
            </Tile>

            <Tile asChild>
              <Link href="/events">
                <EventPageIcon />
                <TileTitle>
                  <Trans i18nKey="events" defaults="Events" />
                </TileTitle>
                <TileDescription>
                  <Trans
                    i18nKey="upcomingEventCount"
                    defaults="{count} upcoming"
                    values={{ count: upcomingEventCount }}
                  />
                </TileDescription>
              </Link>
            </Tile>
          </TileGrid>
        </div>
        <div className="space-y-4">
          <h2 className="text-muted-foreground text-sm">
            <Trans i18nKey="account" defaults="Account" />
          </h2>
          <TileGrid>
            <Tile asChild>
              <Link href="/settings/profile">
                <ProfilePageIcon />
                <TileTitle>
                  <Trans i18nKey="profile" defaults="Profile" />
                </TileTitle>
              </Link>
            </Tile>

            <Tile asChild>
              <Link href="/settings/preferences">
                <PreferencesPageIcon />
                <TileTitle>
                  <Trans i18nKey="preferences" defaults="Preferences" />
                </TileTitle>
              </Link>
            </Tile>
            <IfCloudHosted>
              <Tile asChild>
                <Link href="/settings/billing">
                  <BillingPageIcon />
                  <TileTitle>
                    <Trans i18nKey="billing" defaults="Billing" />
                  </TileTitle>
                </Link>
              </Tile>
            </IfCloudHosted>
          </TileGrid>
        </div>
      </PageContent>
    </PageContainer>
  );
}

export async function generateMetadata() {
  const { t } = await getTranslation();
  return {
    title: t("home", {
      defaultValue: "Home",
    }),
  };
}
