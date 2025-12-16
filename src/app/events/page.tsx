import { type Metadata } from "next";
import { getUpcomingEvents, getPastEvents } from "@/lib/content/getEvents";
import { env } from "@/lib/env";
import Link from "next/link";

export function generateMetadata(): Metadata {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: "Upcoming Events | Lightning Login",
    description:
      "Discover upcoming Bitcoin and Lightning Network events we're attending and hosting.",
    openGraph: {
      title: "Upcoming Events | Lightning Login",
      description:
        "Discover upcoming Bitcoin and Lightning Network events we're attending and hosting.",
      url: `${baseUrl}/events`,
      siteName: "Lightning Login",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Upcoming Events | Lightning Login",
      description:
        "Discover upcoming Bitcoin and Lightning Network events we're attending and hosting.",
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getTime() === end.getTime()) {
    return formatDate(startDate);
  }
  
  const startMonth = start.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const endMonth = end.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}-${endMonth}`;
  }
  
  return `${startMonth} - ${endMonth}`;
}

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
      <p className="text-lg text-neutral-600 mb-8">
        Join us at these Bitcoin and Lightning Network events. We're excited to
        connect with the community!
      </p>

      {upcomingEvents.length === 0 ? (
        <div className="border border-neutral-200 rounded-lg p-8 text-center">
          <p className="text-neutral-600">
            No upcoming events scheduled at this time. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-6 mb-16">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h2 className="text-2xl font-semibold">{event.title}</h2>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        event.type === "internal"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {event.type === "internal" ? "Internal" : "External"}
                    </span>
                  </div>
                  <p className="text-neutral-600 mb-3">{event.description}</p>
                  <div className="space-y-1 text-sm text-neutral-700">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{formatDateRange(event.startDate, event.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>
                        {event.venue}, {event.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  {event.url && (
                    <Link
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors text-center"
                    >
                      Learn More
                    </Link>
                  )}
                  {event.socialMedia.hashtag && (
                    <a
                      href={`https://twitter.com/search?q=${encodeURIComponent(event.socialMedia.hashtag)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {event.socialMedia.hashtag}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Past Events</h2>
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="border border-neutral-200 rounded-lg p-4 opacity-75"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-sm text-neutral-600">
                      {formatDateRange(event.startDate, event.endDate)} •{" "}
                      {event.location}
                    </p>
                  </div>
                  {event.url && (
                    <Link
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Event
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
