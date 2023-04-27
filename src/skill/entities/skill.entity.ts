import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {CvEntity} from "../../cv/entities/cv.entity";

@Entity("skill")
export class SkillEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    designation : string


    @ManyToMany(
        ()=>CvEntity,
        (cv)=>cv.skills,
    )
    cvs : CvEntity[]


}