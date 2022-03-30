import React, {useState} from 'react';
import ReducedOrder from './ReducedOrder';
import ExpandedOrder from './ExpandedOrder';
import AnimatedCard from '../../../sub-components/AnimatedCard';
import {OrderCardContext} from '../contexts';
import {getInitialHeight, isFinished} from '../helpers';
import {DeleteButton} from './ActionButtons';

/**
 * Order card displaying details for a single order.
 * @param order The order to display
 */
const OrderCard = ({order}) => {
  const [currStatus, setCurrStatus] = useState(order.Status); // Dynamic frontend status of the order card

  return (
    <OrderCardContext.Provider
      value={{
        order: {
          data: order,
          currStatus: currStatus,
          setCurrStatus: setCurrStatus,
        },
      }}
    >
      <AnimatedCard
        collapsableContent={<ReducedOrder />}
        hidableContent={<ExpandedOrder />}
        initialHeight={getInitialHeight()}
        bottomFixed={isFinished(currStatus) ? <DeleteButton /> : null}
      />
    </OrderCardContext.Provider>
  );
};

export default OrderCard;
