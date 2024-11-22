
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getMyOrders } from "@/actions/orders/get-my-orders"
async function MyOrders() {
  const { data: orders, error } = await getMyOrders()

  if (error) {
    return (
      <Card className="w-full max-w-6xl">
        <CardHeader className="text-center text-red-500">
          Error loading products
        </CardHeader>
      </Card>
    )
  }

  if (!orders?.length) {
    return (
      <Card className="w-full max-w-6xl">
        <CardHeader className="text-center text-muted-foreground">
          No orders found
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center mb-8">My orders</h1>
      <Card className="w-full">
        <CardContent className="grid gap-4 p-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{order.product.title}</h3>
                  <p className="text-muted-foreground">{order.product.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.product.price}</p>
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

export default MyOrders