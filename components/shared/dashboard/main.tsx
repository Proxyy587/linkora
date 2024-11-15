"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw } from "lucide-react";

interface Analytics {
  totalViews: number;
  monthlyViews: number;
  uniqueVisitors: number;
  countries: Array<{ _id: string; count: number }>;
  pageViews: Array<{ _id: string; views: number }>;
  customEvents: Array<{
    event_name: string;
    message: string;
    timestamp: string;
  }>;
  sources: Array<{ source: string; count: number }>;
}

export default function DashboardMain() {
  const { user } = useUser();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState(0);
  const [activeCustomEventTab, setActiveCustomEventTab] = useState("");

  const fetchAnalytics = async (filter_duration?: string) => {
    if (!user?.username) return;

    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        username: user.username,
        ...(filter_duration && { duration: filter_duration })
      });

      const response = await fetch(
        `/api/analytics/event?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load analytics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      setFilterValue(0);
      fetchAnalytics();
    }, 30000);

    return () => clearInterval(interval);
  }, [user?.username]);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!analytics) return <div>No analytics data available</div>;

  const abbreviateNumber = (number: number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  };

  const formatTimeStamp = (date: string) => {
    const timestamp = new Date(date);
    return timestamp.toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="w-full flex justify-end px-12 space-x-5">
        <Select
          onValueChange={(value) => {
            fetchAnalytics(value);
            setFilterValue(Number(value));
          }}
        >
          <SelectTrigger className="w-[180px] border border-white/5 outline-none hover:border-white/20 smooth">
            <SelectValue placeholder={filterValue ? filterValue : "lifetime"} />
          </SelectTrigger>
          <SelectContent className="bg-black border border-white/10 bg-opacity-20 filter backdrop-blur-lg">
            <SelectItem value="0">Lifetime</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="60">Last 60 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="180">Last 180 days</SelectItem>
          </SelectContent>
        </Select>

        <RefreshCcw
          onClick={() => fetchAnalytics()}
          className="h-4 w-4 stroke-white/60 hover:stroke-white smooth cursor-pointer"
        />
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="customEvents">Custom Events</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            <div className="bg-black border-white/5 border text-white text-center">
              <p className="text-white/70 font-medium py-8 w-full text-center border-b border-white/5">
                TOTAL VISITS
              </p>
              <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
                {abbreviateNumber(analytics.uniqueVisitors)}
              </p>
            </div>

            <div className="bg-black border-white/5 border text-white text-center">
              <p className="font-medium text-white/70 py-8 w-full text-center border-b border-white/5">
                PAGE VIEWS
              </p>
              <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
                {abbreviateNumber(analytics.totalViews)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 mt-12 w-full border-y border-white/5 bg-black">
            <div className="flex flex-col bg-black z-40 h-full w-full">
              <h1 className="label">Top Pages</h1>
              {analytics.pageViews?.map((view) => (
                <div key={view._id} className="text-white w-full items-center justify-between px-6 py-4 border-b border-white/5 flex">
                  <p className="text-white/70 font-light">/{view._id}</p>
                  <p>{abbreviateNumber(view.views)}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col bg-black z-40 h-full w-full lg:border-l border-t lg:border-t-0 border-white/5">
              <h1 className="label relative">
                Top Visit Sources
                <p className="absolute bottom-2 right-2 text-[10px] italic font-light">
                  add ?utm={"{source}"} to track
                </p>
              </h1>
              {analytics.sources?.map((source) => (
                <div key={source.source} className="text-white w-full items-center justify-between px-6 py-4 border-b border-white/5 flex">
                  <p className="text-white/70 font-light">/{source.source}</p>
                  <p>{abbreviateNumber(source.count)}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customEvents">
          {analytics.customEvents && (
            <Carousel className="w-full px-4">
              <CarouselContent>
                {analytics.customEvents.map((event) => (
                  <CarouselItem key={event.event_name} className="basis-1/2">
                    <div 
                      className={`bg-black smooth group hover:border-white/10 text-white text-center border ${
                        activeCustomEventTab === event.event_name ? "border-white/10" : "border-white/5 cursor-pointer"
                      }`}
                      onClick={() => setActiveCustomEventTab(event.event_name)}
                    >
                      <p className={`text-white/70 font-medium py-8 w-full group-hover:border-white/10 smooth text-center border-b ${
                        activeCustomEventTab === event.event_name ? "border-white/10" : "border-white/5"
                      }`}>
                        {event.event_name}
                      </p>
                      <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
                        {event.message}
                      </p>
                      <p className="italic text-xs text-white/50">
                        {formatTimeStamp(event.timestamp)}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
