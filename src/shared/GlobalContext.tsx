import { ReactNode, createContext, useState } from 'react';

type GlobalContextData = {
  companyId: string;
  setCompanyId: (companyId: string) => void;
  productId: string;
  setProductId: (productId: string) => void;
  orderDetailedId: string;
  setOrderDetailedId: (orderDetailedId: string) => void;
};

export const GlobalContext = createContext({} as GlobalContextData);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [companyId, setCompanyId] = useState('');
  const [productId, setProductId] = useState('');
  const [orderDetailedId, setOrderDetailedId] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        companyId,
        setCompanyId,
        productId,
        setProductId,
        orderDetailedId,
        setOrderDetailedId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
