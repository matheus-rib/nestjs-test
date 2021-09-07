import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../../common/orm/BaseEntity'

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: '15', unique: true })
  name: string

  @Column({ type: 'varchar', length: '30', unique: true })
  email: string
}
