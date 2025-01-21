ALTER TABLE "scSchema"."epmloyee" RENAME TO "employee";--> statement-breakpoint
ALTER TABLE "scSchema"."employee" DROP CONSTRAINT "epmloyee_positionId_positions_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scSchema"."employee" ADD CONSTRAINT "employee_positionId_positions_id_fk" FOREIGN KEY ("positionId") REFERENCES "scSchema"."positions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
