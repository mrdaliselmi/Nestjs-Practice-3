import { Time } from '../../common/time';
import { UserRole } from "../../common/user-role.enum";
import { CvEntity } from "../../cv/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity extends Time {

    @PrimaryGeneratedColumn()
    id : number; 

    @Column({
        length: 50,
        unique: true,
    })
    username : string;

    @Column({
        unique: true,
    })
    email : string;

    @Column()
    password : string;

    @Column()
    salt : string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role : string;

    @OneToMany(
        ()=>CvEntity,
        (cv)=> cv.user
    )
    cvs : CvEntity[]
}
