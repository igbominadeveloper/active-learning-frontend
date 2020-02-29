import { useState } from 'react';
interface usersForm {
  user: any;
  setUser: Function;
}
interface productsForm {
  product: any;
  setProduct: Function;
}

interface ordersForm {
  order: any;
  setOrder: Function;
}


export const useUsersForm = (): usersForm => {
  const [user, setUser] = useState({});
  return {
    user: user,
    setUser: setUser,
  };
};

export const useProductsForm = (): productsForm => {
  const [product, setProduct] = useState({});
  return {
    product: product,
    setProduct: setProduct,
  };
};

export const useOrdersForm = (): ordersForm => {
  const [order, setOrder] = useState({});
  return {
    order: order,
    setOrder: setOrder,
  };
};
