#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/066223a42a315083d05704157a0d0d25d2bbca354cbe5c4c28c20777b6f1a220/contract';
import endContract from '../../snapshots/066223a42a315083d05704157a0d0d25d2bbca354cbe5c4c28c20777b6f1a220/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'agent',
        columns: [
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'assignment',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('ticket_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('user_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'category',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'comment',
        columns: [
          col('comment', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('ticket_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('user_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'customer',
        columns: [
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'status',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('ticket_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'ticket',
        columns: [
          col('category_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('customer_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('priority', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('ticket_priority_check_cd098899', "\"priority\" IN ('LOW', 'HIGH')"),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'agent',
        constraint: 'agent_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'customer',
        constraint: 'customer_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'assignment',
        index: 'assignment_ticket_id_idx_837c90f6',
        columns: ['ticket_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'assignment',
        index: 'assignment_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'comment',
        index: 'comment_ticket_id_idx_837c90f6',
        columns: ['ticket_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'comment',
        index: 'comment_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'status',
        index: 'status_ticket_id_idx_837c90f6',
        columns: ['ticket_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ticket',
        index: 'ticket_category_id_idx_da7213d4',
        columns: ['category_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ticket',
        index: 'ticket_customer_id_idx_e16dfa6b',
        columns: ['customer_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'assignment',
        foreignKey: {
          name: 'assignment_ticket_id_fkey',
          columns: ['ticket_id'],
          references: { schema: 'public', table: 'ticket', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'assignment',
        foreignKey: {
          name: 'assignment_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'agent', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'comment',
        foreignKey: {
          name: 'comment_ticket_id_fkey',
          columns: ['ticket_id'],
          references: { schema: 'public', table: 'ticket', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'comment',
        foreignKey: {
          name: 'comment_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'agent', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'status',
        foreignKey: {
          name: 'status_ticket_id_fkey',
          columns: ['ticket_id'],
          references: { schema: 'public', table: 'ticket', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ticket',
        foreignKey: {
          name: 'ticket_customer_id_fkey',
          columns: ['customer_id'],
          references: { schema: 'public', table: 'customer', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ticket',
        foreignKey: {
          name: 'ticket_category_id_fkey',
          columns: ['category_id'],
          references: { schema: 'public', table: 'category', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
