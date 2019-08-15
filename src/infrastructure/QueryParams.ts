

 /**
  * @since 0.11.3
  */
export enum Order {
    ASC = 'id',
    DESC = '-id',
}


/**
 * The query params structure describes pagination params for requests.
 *
 * @since 1.0
 */
export class QueryParams {

    /**
     * Constructor
     * @param pageSize
     * @param id
     */
    constructor(
                /**
                 * Page size between 10 and 100, otherwise 10
                 */
                public readonly pageSize: number,
                /**
                 * Id after which we want objects to be returned
                 */
                public readonly id?: string,
                /**
                 * Order of transactions.
                 * DESC. Newer to older.
                 * ASC. Older to newer.
                 */
                public readonly order: Order = Order.DESC,
                ) {
        this.pageSize = (pageSize >= 10 && pageSize <= 100) ? pageSize : 10;
        this.id = id;
    }
}
