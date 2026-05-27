import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Heart,
  Image,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useProducts, useBenefits, useGallery, useMessages } from "@/hooks/useData";

export default function Dashboard() {
  const { data: products } = useProducts();
  const { data: benefits } = useBenefits();
  const { data: gallery } = useGallery();
  const { data: messages } = useMessages();

  const unreadCount = messages?.filter((m: any) => !m.is_read).length ?? 0;

  const stats = [
    {
      title: "Products",
      count: products?.length ?? 0,
      icon: Package,
      path: "/dashboard/products",
      color: "text-blue-500",
    },
    {
      title: "Benefits",
      count: benefits?.length ?? 0,
      icon: Heart,
      path: "/dashboard/benefits",
      color: "text-rose-500",
    },
    {
      title: "Gallery",
      count: gallery?.length ?? 0,
      icon: Image,
      path: "/dashboard/gallery",
      color: "text-amber-500",
    },
    {
      title: "Messages",
      count: messages?.length ?? 0,
      icon: MessageSquare,
      path: "/dashboard/messages",
      color: "text-emerald-500",
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Manage your website content from this dashboard.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link key={stat.title} to={stat.path}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{stat.count}</div>
                    {stat.badge && (
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {stat.badge} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                    Manage {stat.title.toLowerCase()}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

