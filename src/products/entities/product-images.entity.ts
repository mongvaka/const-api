import { PrimaryGeneratedColumn, Column } from "typeorm";

export class ProductImages {
    @PrimaryGeneratedColumn({ type: "bigint"})
    id: number;
    @Column({ type: "bigint", nullable: false })
    productId: string;
    @Column({ type: "text", nullable: false })
    url: string;
    @Column({ type: "nvarchar", nullable: true })
    type: string;

}