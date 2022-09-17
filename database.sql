CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"task" VARCHAR(250) NOT NULL, 
	"due" date,
	"isDone" BOOLEAN DEFAULT FALSE, 
	"finished" date
);

INSERT INTO "todos" ("task", "due")
VALUES ('Finish weekend challenge', '9-19-2022'), ('Have Fun', '1-1-2049'), ('Do a backflip', '1-1-2077');