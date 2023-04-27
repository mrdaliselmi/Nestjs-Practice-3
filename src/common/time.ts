import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export class Time {
    @CreateDateColumn({ update: false })
    CreatedAt: Date;
    @UpdateDateColumn()
    UpdatedAt: Date;
    @DeleteDateColumn()
    DeletedAt: Date;
}