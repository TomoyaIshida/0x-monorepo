import { schemas } from '@0xproject/json-schemas';
import { SignedOrder } from '@0xproject/types';
import * as _ from 'lodash';

import { OrderProvider, OrderProviderRequest, OrderProviderResponse } from '../types';
import { assert } from '../utils/assert';

export class BasicOrderProvider implements OrderProvider {
    public readonly orders: SignedOrder[];
    /**
     * Instantiates a new BasicOrderProvider instance
     * @param   orders  An array of objects that conform to SignedOrder to fetch from.
     * @return  An instance of BasicOrderProvider
     */
    constructor(orders: SignedOrder[]) {
        assert.doesConformToSchema('orders', orders, schemas.signedOrdersSchema);
        this.orders = orders;
    }
    /**
     * Given an object that conforms to OrderFetcherRequest, return the corresponding OrderProviderResponse that satisfies the request.
     * @param   orderProviderRequest   An instance of OrderFetcherRequest. See type for more information.
     * @return  An instance of OrderProviderResponse. See type for more information.
     */
    public async getOrdersAsync(orderProviderRequest: OrderProviderRequest): Promise<OrderProviderResponse> {
        assert.isValidOrderProviderRequest('orderProviderRequest', orderProviderRequest);
        const { makerAssetData, takerAssetData } = orderProviderRequest;
        const orders = _.filter(this.orders, order => {
            return order.makerAssetData === makerAssetData && order.takerAssetData === takerAssetData;
        });
        return { orders };
    }
}
