import { Column } from "typeorm";

export class Delivery {
    @Column({ type: "bigint", nullable: true })
    deliverId: number;
    @Column({ type: "bigint", nullable: true })
    orderId: string;
    @Column({ type: "double precision", nullable: true })
    price: string;
    @Column({ type: "double precision", nullable: true })
    lat: number;
    @Column({ type: "double precision", nullable: true })
    lon: number;
}
