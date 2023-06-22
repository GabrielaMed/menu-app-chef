import { Col, Row } from 'react-bootstrap';
import { IOrder } from '../../../../utils/Interface/Order';
import { ChangeOrderStatusButton, Container } from './style';
import { OrderStatus } from '../../../../utils/Enum/OrderStatus';
import { MdPerson, MdSoupKitchen } from 'react-icons/md';
import { ToastMessage } from '../../../../components/Toast';
import { useContext, useEffect, useState } from 'react';
import { IToastType } from '../../../../utils/Interface/Toast';
import { api } from '../../../../services/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../../shared/GlobalContext';

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
  const navigate = useNavigate();
  const { setOrderDetailedId } = useContext(GlobalContext);
  const [newStatusOrder, setNewStatusOrder] = useState('');

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

  const handlePrevStatus = (status: string) => {
    if (status === OrderStatus.em_producao) {
      return 'Pendente';
    }
    if (status === OrderStatus.pronto) {
      return 'Iniciado';
    }
    return null;
  };

  const newStatus = handleStatus(order.statusOrder);

  const previousStatus = handlePrevStatus(order.statusOrder);

  const saveNewStatus = async () => {
    try {
      const response = await api.put(`order/${order.id}/status`, {
        newStatusOrder,
      });

      if (response.data) {
        const updatedOrder = response.data;

        if (newStatusOrder === OrderStatus.enviado) {
          setInProgressOrders(
            inProgressOrders.filter((o) => o.id !== order.id)
          );
          setReadyOrders(readyOrders.filter((o) => o.id !== order.id));
          setPendingOrders([...pendingOrders, updatedOrder]);
        } else if (newStatusOrder === OrderStatus.em_producao) {
          setPendingOrders(pendingOrders.filter((o) => o.id !== order.id));
          setReadyOrders(readyOrders.filter((o) => o.id !== order.id));
          setInProgressOrders([...inProgressOrders, updatedOrder]);
        } else if (newStatusOrder === OrderStatus.pronto) {
          setPendingOrders(pendingOrders.filter((o) => o.id !== order.id));
          setInProgressOrders(
            inProgressOrders.filter((o) => o.id !== order.id)
          );
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

  const handleNextStatus = () => {
    if (order.statusOrder === OrderStatus.enviado) {
      const newStatus = 'em produção';
      setNewStatusOrder(newStatus);
    } else if (order.statusOrder === OrderStatus.em_producao) {
      const newStatus = 'pronto';
      setNewStatusOrder(newStatus);
    }
  };

  const handlePreviousStatus = () => {
    if (order.statusOrder === OrderStatus.em_producao) {
      const newStatus = 'enviado';
      setNewStatusOrder(newStatus);
    } else if (order.statusOrder === OrderStatus.pronto) {
      const newStatus = 'em produção';
      setNewStatusOrder(newStatus);
    }
  };

  useEffect(() => {
    if (newStatusOrder !== '') {
      saveNewStatus();
    }
  }, [newStatusOrder]);

  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      <Container
        onClick={() => {
          setOrderDetailedId(order.id);
          // setTimeout(() => {
          navigate('/orderDetails');
          // }, 3000);
        }}
      >
        <Col
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
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
        {order.statusOrder === OrderStatus.pronto && (
          <Row>
            <ChangeOrderStatusButton
              onClick={(e) => {
                e.stopPropagation(); // Stop the click event propagation
                handlePreviousStatus();
              }}
            >
              {previousStatus}
            </ChangeOrderStatusButton>
          </Row>
        )}
        {order.statusOrder === OrderStatus.em_producao && (
          <Row style={{ gap: '0.5rem' }}>
            <ChangeOrderStatusButton
              onClick={(e) => {
                e.stopPropagation();
                handleNextStatus();
              }}
            >
              {newStatus}
            </ChangeOrderStatusButton>
            <ChangeOrderStatusButton
              onClick={(e) => {
                e.stopPropagation();
                handlePreviousStatus();
              }}
            >
              {previousStatus}
            </ChangeOrderStatusButton>
          </Row>
        )}
        {order.statusOrder === OrderStatus.enviado && (
          <Row>
            <ChangeOrderStatusButton
              onClick={(e) => {
                e.stopPropagation();
                handleNextStatus();
              }}
            >
              {newStatus}
            </ChangeOrderStatusButton>
          </Row>
        )}
      </Container>
    </>
  );
};
