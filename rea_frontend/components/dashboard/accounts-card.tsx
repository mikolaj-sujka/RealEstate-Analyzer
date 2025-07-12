import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Banknote,
  Landmark,
  PiggyBank,
  CreditCard,
  TrendingUp,
  Plus,
  Send,
  ChevronsUp,
  MoreHorizontal,
} from "lucide-react"

const accounts = [
  { name: "Main Savings", type: "Personal savings", amount: "$8,459.45", icon: PiggyBank, color: "text-green-500" },
  { name: "Checking Account", type: "Daily expenses", amount: "$2,850.00", icon: Landmark, color: "text-blue-500" },
  {
    name: "Investment Portfolio",
    type: "Stock & ETFs",
    amount: "$15,230.80",
    icon: TrendingUp,
    color: "text-purple-500",
  },
  { name: "Credit Card", type: "Pending charges", amount: "$1,200.00", icon: CreditCard, color: "text-red-500" },
  { name: "Savings Account", type: "Emergency fund", amount: "$3,000.00", icon: PiggyBank, color: "text-yellow-500" },
]

export default function AccountsCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Accounts
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <p className="text-4xl font-bold">$26,540.25</p>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="mb-4 text-lg font-medium">Your Accounts</h3>
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.name} className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <account.icon className={cn("h-5 w-5", account.color)} />
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground">{account.type}</p>
                </div>
                <p className="font-semibold">{account.amount}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
          <Button variant="secondary">
            <Send className="mr-2 h-4 w-4" /> Send
          </Button>
          <Button variant="secondary">
            <ChevronsUp className="mr-2 h-4 w-4" /> Top-up
          </Button>
          <Button variant="secondary">
            <MoreHorizontal className="mr-2 h-4 w-4" /> More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
