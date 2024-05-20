import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {                    //Описываем поля, которые будут нужны для создания объекта класса 
    email: string;
    password: string;
}                         

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example:'1', description:'unique identificator'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:'aleksandrborohovskij@gmail.com', description:'user email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example:'1425', description:'user password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example:true, description:'banned or not'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example:'insults', description:'ban reason'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(()=> Role, ()=> UserRoles)
    roles: Role[];

    @HasMany(()=> Post)
    posts: Post[]
}