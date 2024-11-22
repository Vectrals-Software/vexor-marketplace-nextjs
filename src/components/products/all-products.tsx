import { getAllProducts } from "@/actions/products/get-all-products"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import BuyProductBtn from "./buy-product-btn"

const AllProducts = async () => {
  const { data: products, error } = await getAllProducts()

  if (error) {
    return (
      <Card className="w-full max-w-6xl">
        <CardHeader className="text-center text-red-500">
          Error loading products
        </CardHeader>
      </Card>
    )
  }

  if (!products?.length) {
    return (
      <Card className="w-full max-w-6xl">
        <CardHeader className="text-center text-muted-foreground">
          No products found
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center mb-8">Explore and buy products</h1>
      <Card className="w-full">
        <CardContent className="grid gap-4 p-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                  <small className="text-muted-foreground">by {product.user.name}</small>
                </div>
                <div className="text-right">
                  <p className="font-medium">${product.price}</p>
                  <p className="text-sm text-muted-foreground">
                    Stock: {product.quantity}
                  </p>
                  <BuyProductBtn product={product} />
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

export default AllProducts
