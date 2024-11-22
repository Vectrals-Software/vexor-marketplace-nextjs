import MyOrders from '@/components/orders/my-orders'

const OrdersPage = () => {
  return (
    <section className="flex flex-col gap-4 justify-center items-center h-full flex-1 my-20">
        <MyOrders />
    </section>
  )
}

export default OrdersPage