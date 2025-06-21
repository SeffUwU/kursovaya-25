CREATE SCHEMA "service_center_schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_center_schema"."employees" (
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
CREATE TABLE IF NOT EXISTS "service_center_schema"."malfunctions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" varchar NOT NULL,
	"symptoms" varchar NOT NULL,
	"repairMethod" varchar NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_center_schema"."orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderDate" timestamp NOT NULL,
	"returnDate" timestamp,
	"customerFio" varchar NOT NULL,
	"serial" varchar NOT NULL,
	"malfunctionId" uuid NOT NULL,
	"servicedStoreId" uuid NOT NULL,
	"guaranteeNote" varchar,
	"guarantee_end_date" timestamp,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_center_schema"."parts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"varchar" varchar NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_center_schema"."positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"salary" integer NOT NULL,
	"responsibilities" varchar NOT NULL,
	"requirements" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_center_schema"."repaired_devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"type" varchar NOT NULL,
	"manufacturer" varchar NOT NULL,
	"characteristics" varchar NOT NULL,
	"details" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_center_schema"."repaired_parts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"partId" uuid NOT NULL,
	"malfunctionId" uuid NOT NULL,
	"amount" integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_center_schema"."serviced_stores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"address" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_center_schema"."employees" ADD CONSTRAINT "employees_positionId_positions_id_fk" FOREIGN KEY ("positionId") REFERENCES "service_center_schema"."positions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_center_schema"."orders" ADD CONSTRAINT "orders_malfunctionId_malfunctions_id_fk" FOREIGN KEY ("malfunctionId") REFERENCES "service_center_schema"."malfunctions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_center_schema"."orders" ADD CONSTRAINT "orders_servicedStoreId_serviced_stores_id_fk" FOREIGN KEY ("servicedStoreId") REFERENCES "service_center_schema"."serviced_stores"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_center_schema"."repaired_parts" ADD CONSTRAINT "repaired_parts_partId_parts_id_fk" FOREIGN KEY ("partId") REFERENCES "service_center_schema"."parts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_center_schema"."repaired_parts" ADD CONSTRAINT "repaired_parts_malfunctionId_malfunctions_id_fk" FOREIGN KEY ("malfunctionId") REFERENCES "service_center_schema"."malfunctions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_id_pkey" ON "service_center_schema"."employees" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "malfunction_id_pkey" ON "service_center_schema"."malfunctions" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_id_pkey" ON "service_center_schema"."orders" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "parts_id_pkey" ON "service_center_schema"."parts" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "position_id_pkey" ON "service_center_schema"."positions" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "repaired_device_id_pkey" ON "service_center_schema"."repaired_devices" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "repaired_parts_id_pkey" ON "service_center_schema"."repaired_parts" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "serviced_store_id_pkey" ON "service_center_schema"."serviced_stores" USING btree ("id");