#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/066223a42a315083d05704157a0d0d25d2bbca354cbe5c4c28c20777b6f1a220/contract';
import startContract from '../../snapshots/066223a42a315083d05704157a0d0d25d2bbca354cbe5c4c28c20777b6f1a220/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/669d8ada556479d80b15cff84f8b90bf4cf4d49cf2714703d43b35dfa80cbb0b/contract';
import endContract from '../../snapshots/669d8ada556479d80b15cff84f8b90bf4cf4d49cf2714703d43b35dfa80cbb0b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
