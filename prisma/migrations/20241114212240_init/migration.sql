/*
  Warnings:

  - The values [MAUI,RIP,VOLCOM,RUSTY,GLOBE,PROSURF,ADMIN] on the enum `BrandEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BrandEnum_new" AS ENUM ('NOTION', 'NEON', 'PRISMA', 'STRAPI');
ALTER TABLE "Brand" ALTER COLUMN "name" TYPE "BrandEnum_new" USING ("name"::text::"BrandEnum_new");
ALTER TYPE "BrandEnum" RENAME TO "BrandEnum_old";
ALTER TYPE "BrandEnum_new" RENAME TO "BrandEnum";
DROP TYPE "BrandEnum_old";
COMMIT;
