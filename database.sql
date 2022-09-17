CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"task" VARCHAR(250) NOT NULL,
	"priority" INTEGER DEFAULT 1 CHECK ("priority" > 0 AND "priority" < 6), --Default to highest priority of 1.
	"due" date,
	"isDone" BOOLEAN DEFAULT FALSE, 
	"finished" date
);

INSERT INTO "todos" ("task", "due")
VALUES ('Finish weekend challenge', '9-19-2020'), ('Have Fun', '1-1-2049'), ('Do a backflip', '1-1-2077');