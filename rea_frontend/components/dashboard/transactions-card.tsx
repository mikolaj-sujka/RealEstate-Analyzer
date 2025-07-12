import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingCart, Landmark, Clapperboard, Database, Server } from "lucide-react"
import { Wallet } from "lucide-react" // Import Wallet icon

const transactions = [
  { name: "Apple Store Purchase", date: "Today, 2:45 PM", amount: "-$999.00", icon: ShoppingCart, change: "negative" },
  { name: "Salary Deposit", date: "Today, 9:00 AM", amount: "+$4,500.00", icon: Landmark, change: "positive" },
  { name: "Netflix Subscription", date: "Yesterday", amount: "-$15.99", icon: Clapperboard, change: "negative" },
  { name: "Apple Store Purchase", date: "Today, 2:45 PM", amount: "-$999.00", icon: ShoppingCart, change: "negative" },
  { name: "Supabase Subscription", date: "Yesterday", amount: "-$15.99", icon: Database, change: "negative" },
  { name: "Vercel Subscription", date: "Yesterday", amount: "-$15.99", icon: Server, change: "negative" },
]

export default function TransactionsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" /> {/* Use Wallet icon */}
            Recent Transactions
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Recent Activity <span className="text-xs">(23 transactions)</span>
          </p>
          <p className="text-sm text-muted-foreground">This Month</p>
        </div>
        <div className="flex-1 space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <transaction.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <p
                  className={
                    transaction.change === "positive" ? "font-semibold text-green-500" : "font-semibold text-red-500"
                  }
                >
                  {transaction.amount}
                </p>
                <ArrowRight
                  className={
                    transaction.change === "positive"
                      ? "h-4 w-4 text-green-500 rotate-[-45deg]"
                      : "h-4 w-4 text-red-500 rotate-45"
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-6 w-full bg-transparent">
          View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
