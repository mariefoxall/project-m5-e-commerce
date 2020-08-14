const { requestOrder } = require("../actions");
const { useDispatch } = require("react-redux");

const dispatch = useDispatch();

const handleOrderById = (id) => {
  dispatch(requestOrder());
  fetch(`/orders/${id}`)
    .then((res) => res.json())
    .then((json) => {
      dispatch(receiveOrder(json));
    })
    .catch((err) => console.error(err));
};
