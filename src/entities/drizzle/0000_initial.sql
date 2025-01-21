CREATE SCHEMA "scSchema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scSchema"."repaired_devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"type" varchar NOT NULL,
	"manufacturer" varchar NOT NULL,
	"characteristics" varchar NOT NULL,
	"details" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "repaired_devices_type_unique" UNIQUE("type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scSchema"."malfunctions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repairedDeviceId" uuid NOT NULL,
	"description" varchar NOT NULL,
	"symptoms" varchar NOT NULL,
	"repairMethod" varchar NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scSchema"."orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"address" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scSchema"."positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"salary" integer NOT NULL,
	"responsibilities" varchar NOT NULL,
	"requirements" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scSchema"."malfunctions" ADD CONSTRAINT "malfunctions_repairedDeviceId_repaired_devices_id_fk" FOREIGN KEY ("repairedDeviceId") REFERENCES "scSchema"."repaired_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "repaired_device_id_pkey" ON "scSchema"."repaired_devices" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "invoice_id_pkey" ON "scSchema"."malfunctions" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "serviced_store_id_pkey" ON "scSchema"."orders" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "position_id_pkey" ON "scSchema"."positions" USING btree ("id");