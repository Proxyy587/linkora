"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowBigDown } from "lucide-react";

interface Analytics {
  totalViews: number;
  monthlyViews: number;
  uniqueVisitors: number;
  countries: Array<{ _id: string; count: number }>;
  pageViews: Array<{ _id: string; views: number }>;
}

export default function DashboardMain() {
  const { user } = useUser();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState(0);

  const fetchAnalytics = async (filter_duration?: string) => {
    if (!user?.username) return;

    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        username: user.username,
        ...(filter_duration && { duration: filter_duration })
      });

      const response = await fetch(
        `/api/analytics/dashboard?${queryParams}`,
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
          </SelectContent>
        </Select>

        <ArrowBigDown
          onClick={() => fetchAnalytics()}
          className="h-4 w-4 stroke-white/60 hover:stroke-white smooth cursor-pointer"
        />
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg shadow bg-black border border-white/5">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
                  <p className="text-2xl font-bold text-white">
                    {abbreviateNumber(analytics.totalViews)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg shadow bg-black border border-white/5">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Unique Visitors</h3>
                  <p className="text-2xl font-bold text-white">
                    {abbreviateNumber(analytics.uniqueVisitors)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg shadow bg-black border border-white/5">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Top Countries</h3>
                  <ul className="mt-2 space-y-1 text-white">
                    {analytics.countries.map((country) => (
                      <li key={country._id}>
                        {country._id}: {abbreviateNumber(country.count)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="p-6 rounded-lg shadow bg-black border border-white/5">
            <h3 className="text-lg font-medium text-white mb-4">Page Views</h3>
            <ul className="space-y-2">
              {analytics.pageViews?.map((page) => (
                <li key={page._id} className="flex justify-between text-white">
                  <span>{page._id}</span>
                  <span>{abbreviateNumber(page.views)}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
