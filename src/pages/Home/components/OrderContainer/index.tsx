import { Col, Row } from 'react-bootstrap';
import { IOrder } from '../../../../utils/Interface/Order';
import { ChangeOrderStatusButton, Container } from './style';
import { OrderStatus } from '../../../../utils/Enum/OrderStatus';
import { MdPerson, MdSoupKitchen } from 'react-icons/md';
import { ToastMessage } from '../../../../components/Toast';
import { useState } from 'react';
import { IToastType } from '../../../../utils/Interface/Toast';
import { api } from '../../../../services/api';
import { AxiosError } from 'axios';

interface Props {
  order: IOrder;
  pendingOrders: IOrder[];
  setPendingOrders: (pendingOrders: IOrder[]) => void;
  inProgressOrders: IOrder[];
  setInProgressOrders: (inProgressOrders: IOrder[]) => void;
  readyOrders: IOrder[];
  setReadyOrders: (readyOrders: IOrder[]) => void;
}

export const OrderContainer = ({
  order,
  inProgressOrders,
  pendingOrders,
  readyOrders,
  setInProgressOrders,
  setPendingOrders,
  setReadyOrders,
}: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );

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

  const newStatus = handleStatus(order.statusOrder);

  const saveNewStatus = async () => {
    try {
      const response = await api.put(`order/${order.id}/status`, {
        newStatusOrder: newStatus === 'Iniciar' ? 'em produção' : 'pronto',
      });

      if (response.data) {
        const updatedOrder = response.data;

        // Remove the order from the pendingOrders array
        setPendingOrders(pendingOrders.filter((o) => o.id !== order.id));

        // Add the order to the inProgressOrders array if the new status is "em produção"
        if (newStatus === 'Iniciar') {
          setInProgressOrders([...inProgressOrders, updatedOrder]);
        }
        // Add the order to the readyOrders array if the new status is "pronto"
        else if (newStatus === 'Concluir') {
          setReadyOrders([...readyOrders, updatedOrder]);
        }
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setShowToast(true);
        setToastMessageType(IToastType.error);
        setToastMessage(`Error: ${err?.response?.data}`);
      }
    }
  };

  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
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
          <ChangeOrderStatusButton onClick={() => saveNewStatus()}>
            {newStatus}
          </ChangeOrderStatusButton>
        </Row>
      </Container>
    </>
  );
};
