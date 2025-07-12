import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Info, Clock, BarChart, Wallet, Target } from "lucide-react"

const events = [
  {
    title: "Emergency Fund",
    description: "3 months of expenses saved",
    progress: 65,
    target: "$15,000",
    dueDate: "Expires Dec 2025",
    status: "In-progress",
    statusColor: "blue",
    icon: Wallet,
  },
  {
    title: "Stock Portfolio",
    description: "Tech sector investment plan",
    progress: 30,
    target: "$50,000",
    dueDate: "Expires Mar 2026",
    status: "Pending",
    statusColor: "yellow",
    icon: BarChart,
  },
  {
    title: "Debt Repayment",
    description: "Student loan payoff plan",
    progress: 45,
    target: "$25,000",
    dueDate: "Expires Jan 2027",
    status: "In-progress",
    statusColor: "blue",
    icon: Target,
  },
]

export default function EventsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <event.icon className="h-8 w-8 text-muted-foreground" />
                  <Badge
                    variant={event.statusColor === "blue" ? "default" : "secondary"}
                    className={cn(
                      event.statusColor === "blue" && "bg-blue-100 text-blue-800",
                      event.statusColor === "yellow" && "bg-yellow-100 text-yellow-800",
                    )}
                  >
                    <Info className="mr-1 h-3 w-3" />
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <div className="my-4 flex-1">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{event.progress}%</span>
                  </div>
                  <Progress value={event.progress} />
                </div>
                <div className="flex justify-between text-sm">
                  <p className="font-medium">
                    {event.target} <span className="text-muted-foreground">target</span>
                  </p>
                  <p className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {event.dueDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
