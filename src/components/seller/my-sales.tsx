import { getMySales } from "@/actions/seller/get-my-sales"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import RefundOrderButton from "../orders/refund-order-btn"

async function MySales() {
  const { data: sales, error } = await getMySales()

  if (error) {
    return (
      <Card className="w-full max-w-6xl">
        <CardHeader className="text-center text-red-500">
          Error loading sales
        </CardHeader>
      </Card>
    )
  }

  if (!sales?.length) {
    return (
      <Card className="w-full max-w-6xl">
        <CardHeader className="text-center text-muted-foreground">
          No sales found
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Sales</h1>
      <Card className="w-full">
        <CardContent className="grid gap-4 p-4">
        {sales.map((sale) => (
          <Card key={sale.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{sale.product.title}</h3>
                  <p className="text-muted-foreground">{sale.product.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${sale.product.price}</p>
                  <RefundOrderButton orderIdentifier={sale.identifier} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      </Card>
    </div>
  )
}

export default MySales
