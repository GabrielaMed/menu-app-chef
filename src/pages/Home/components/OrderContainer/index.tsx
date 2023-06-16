import { Col, Row } from 'react-bootstrap';
import { IOrder } from '../../../../utils/Interface/Order';
import { ChangeOrderStatusButton, Container } from './style';
import { OrderStatus } from '../../../../utils/Enum/OrderStatus';
import { MdPerson, MdSoupKitchen } from 'react-icons/md';

interface Props {
  order: IOrder;
}

export const OrderContainer = ({ order }: Props) => {
  const formatDate = (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const date = new Date(dateTime);
    return date.toLocaleTimeString('pt-BR', options);
  };

  const getOrderStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.enviado:
        return <MdPerson color='green' />;

      case OrderStatus.em_producao:
        return <MdSoupKitchen color='orange' />;
      case OrderStatus.pronto:
        return <MdSoupKitchen color='green' />;

      default:
        return null;
    }
  };

  const handleStatus = (status: string) => {
    if (status === OrderStatus.enviado) {
      return 'Iniciar';
    }
    if (status === OrderStatus.em_producao) {
      return 'Concluir';
    }
    return null;
  };

  return (
    <Container>
      <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>N° Pedido: {order.orderNumber}</span>
        <span>Mesa: {order.tableNumber}</span>
      </Col>
      <Row>
        <span>Data: {formatDate(order.dateTimeOrder)}</span>
      </Row>
      <Row>
        <span>
          Status: {order.statusOrder} {getOrderStatusIcon(order.statusOrder)}
        </span>
      </Row>
      <Row>
        <ChangeOrderStatusButton>
          {handleStatus(order.statusOrder)}
        </ChangeOrderStatusButton>
      </Row>
    </Container>
  );
};
