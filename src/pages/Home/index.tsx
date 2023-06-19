import { AxiosError } from 'axios';
import { Header } from '../../components/Header';
import { Container, Content } from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../shared/GlobalContext';
import ReactLoading from 'react-loading';
import { ToastMessage } from '../../components/Toast';
import { IOrder } from '../../utils/Interface/Order';
import { OrderStatus } from '../../utils/Enum/OrderStatus';
import { Col, Row } from 'react-bootstrap';
import { OrderContainer } from './components/OrderContainer';

export const Home = () => {
  const { companyIdURL } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const { setCompanyId, companyId, setOrderDetailedId } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<IOrder[]>([]);
  const [inProgressOrders, setInProgressOrders] = useState<IOrder[]>([]);
  const [readyOrders, setReadyOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    setLoading(true);
    if (companyIdURL) {
      setCompanyId(companyIdURL ?? '');

      navigate('/');
    }
    // eslint-disable-next-line
  }, [companyIdURL]);

  useEffect(() => {
    if (companyId) {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`order/company/${companyId}`);

        if (response.data) {
          setPendingOrders(
            response.data.filter(
              (order: IOrder) => order.statusOrder === OrderStatus.enviado
            )
          );

          setInProgressOrders(
            response.data.filter(
              (order: IOrder) => order.statusOrder === OrderStatus.em_producao
            )
          );

          setReadyOrders(
            response.data.filter(
              (order: IOrder) => order.statusOrder === OrderStatus.pronto
            )
          );
        }
        setLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (companyId) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [companyId]);

  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      <Container>
        <Header pageName='Home' />
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactLoading
              type={'cylon'}
              color={'#4B2995'}
              height={'150px'}
              width={'150px'}
            />
          </div>
        )}
        {!loading && (
          <Content>
            <Row className='rowHeader'>
              <Col className='colHeader'>Pendente</Col>
              <Col className='colHeader'>Iniciado</Col>
              <Col className='colHeader'>Pronto</Col>
            </Row>
            <Row className='rowCards'>
              <Col className='colCards'>
                {pendingOrders.length > 0 ? (
                  pendingOrders.map((order, idx) => (
                    <OrderContainer
                      order={order}
                      inProgressOrders={inProgressOrders}
                      pendingOrders={pendingOrders}
                      readyOrders={readyOrders}
                      setInProgressOrders={setInProgressOrders}
                      setPendingOrders={setPendingOrders}
                      setReadyOrders={setReadyOrders}
                      key={idx}
                    />
                  ))
                ) : (
                  <span>Nenhum pedido pendente!</span>
                )}
              </Col>
              <Col className='colCards'>
                {inProgressOrders.length > 0 ? (
                  inProgressOrders.map((order, idx) => (
                    <OrderContainer
                      order={order}
                      inProgressOrders={inProgressOrders}
                      pendingOrders={pendingOrders}
                      readyOrders={readyOrders}
                      setInProgressOrders={setInProgressOrders}
                      setPendingOrders={setPendingOrders}
                      setReadyOrders={setReadyOrders}
                      key={idx}
                    />
                  ))
                ) : (
                  <span>Nenhum pedido em produção!</span>
                )}
              </Col>
              <Col className='colCards'>
                {readyOrders.length > 0 ? (
                  readyOrders.map((order, idx) => (
                    <OrderContainer
                      order={order}
                      inProgressOrders={inProgressOrders}
                      pendingOrders={pendingOrders}
                      readyOrders={readyOrders}
                      setInProgressOrders={setInProgressOrders}
                      setPendingOrders={setPendingOrders}
                      setReadyOrders={setReadyOrders}
                      key={idx}
                    />
                  ))
                ) : (
                  <span>Nenhum pedido pronto!</span>
                )}
              </Col>
            </Row>
          </Content>
        )}
      </Container>
    </>
  );
};
