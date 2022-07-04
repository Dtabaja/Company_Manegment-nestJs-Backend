import { Response } from 'express';
import { OrderService } from './order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    all(page: 1): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    export(res: Response): Promise<void>;
    chart(): Promise<any>;
}
