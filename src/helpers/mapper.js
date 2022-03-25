import OrderStatuses from '../static-data/OrderStatuses';
import TabStatuses from '../static-data/TabStatuses';

const mapper = section => {
  switch (section) {
    case TabStatuses.INCOMING:
      return [OrderStatuses.INCOMING];
    case TabStatuses.ACCEPTED:
      return [OrderStatuses.ACCEPTED];
    case TabStatuses.READY:
      return [OrderStatuses.READY];
    case TabStatuses.FINISHED:
      return [OrderStatuses.REJECTED, OrderStatuses.COLLECTED];
  }
};

export default mapper;
