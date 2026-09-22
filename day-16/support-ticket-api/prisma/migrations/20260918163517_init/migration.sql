/*
  Warnings:

  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_ticket_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "Status";

-- CreateTable
CREATE TABLE "Status_history" (
    "id" SERIAL NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Status_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Status_history" ADD CONSTRAINT "Status_history_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
