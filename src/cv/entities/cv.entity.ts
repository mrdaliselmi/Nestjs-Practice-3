import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn ,JoinTable} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import { SkillEntity } from "../../skill/entities/skill.entity";

@Entity("cv")
export class CvEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    firstname : string

    @Column()
    age : number

    @Column()
    job : string

    @Column()
    cin : string

    @Column()
    path : string

    @ManyToOne(
        ()=>UserEntity,
        (user)=>user.cvs
    )
    user : UserEntity

    @ManyToMany(
        ()=>SkillEntity,
        (skill)=>skill.cvs,
        // {
        //     cascade : true
        // }
    )
    @JoinTable()
    skills : SkillEntity[]


}