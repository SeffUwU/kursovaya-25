CREATE TABLE IF NOT EXISTS "scSchema"."epmloyee" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fio" varchar NOT NULL,
	"dob" timestamp,
	"address" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"passport" varchar NOT NULL,
	"passwordHash" varchar NOT NULL,
	"positionId" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scSchema"."epmloyee" ADD CONSTRAINT "epmloyee_positionId_positions_id_fk" FOREIGN KEY ("positionId") REFERENCES "scSchema"."positions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_id_pkey" ON "scSchema"."epmloyee" USING btree ("id");