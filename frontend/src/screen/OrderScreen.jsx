import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';
import Message from '../compontent/Message.jsx';
import Loader from '../compontent/Loader.jsx';
import {useGetOrderDetailsQuery,useDeliverOrderMutation} from '../slices/orderApiSlice.js';
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'

const OrderScreen = () => {
    const {id: orderId} = useParams();
    const {data: order,refetch,isLoading,error} = useGetOrderDetailsQuery(orderId);

    const { userInfo } = useSelector((state) => state.auth);

    const [deliverOrder,{isLoading: LoadingDeliver}] = useDeliverOrderMutation();

    const deliverHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered')
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

  return ( isLoading ? <Loader/> : error ? <Message variant="danger"/> : (
    <>
    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                    <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                    <strong>Email: </strong> {order.user.email}
                </p>
                <p>
                    <strong>Address: </strong> 
                    {order.shippingAddress.address},{order.shippingAddress.city}{''}
                    {order.shippingAddress.postalCode},{''}{order.shippingAddress.country}
                </p>
                <p>
                    {order.isDelivered ? (
                        <Message variant="success">
                        Delivered on {order.createAt}
                        </Message>
                    ) : (
                        <Message variant="danger">Not Delivered</Message>
                    )}
                </p>
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                </p>
                {order.isPaid ? (
                        <Message variant="success">
                        Paid on {order.createAt}
                        </Message>
                    ) : (
                        <Message variant="danger">Not Paid</Message>
                    )}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Order items</h2>
                {order.orderItems.map((item,index) => (
                    <ListGroup.Item key={index}>
                        <Row>
                            <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded/>
                            </Col>
                            <Col>
                            <Link to={`/product/${item.product}`}>
                            {item.name}
                            </Link>
                            </Col>
                            <Col md={4}>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Order Summery</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                       <Col>Items:</Col>
                       <Col>${order.itemsPrice}</Col> 
                    </Row>
                    <Row>
                    <Col>Shipping:</Col>
                    <Col>${order.shippingPrice}</Col>
                    </Row>
                    <Row>
                    <Col>Tax:</Col>
                    <Col>${order.taxPrice}</Col>
                    </Row>
                    <Row>
                    <Col>Total:</Col>
                    <Col>${order.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>
                {userInfo && userInfo.isAdmin && userInfo.isPaid  && userInfo.isDelivered && (
                    <ListGroup.Item>
                        <Button type='button' className='btn btn-block'
                        onClick={deliverHandler}>
                            Mark As Delivered
                        </Button>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
        </Col>
    </Row>
    </>
  )
  )
}

export default OrderScreen