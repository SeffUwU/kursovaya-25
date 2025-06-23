DO $$ BEGIN
 ALTER TABLE "service_center_schema"."orders" ADD CONSTRAINT "orders_employeeId_employees_id_fk" FOREIGN KEY ("employeeId") REFERENCES "service_center_schema"."employees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
