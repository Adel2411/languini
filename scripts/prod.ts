import "dotenv/config";

import * as schema from "@/db/schema";
import db from "@/db/drizzle";

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Define courses - removed English
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Spanish", imageSrc: "/es.svg" },
        { title: "French", imageSrc: "/fr.svg" },
        { title: "Croatian", imageSrc: "/hr.svg" },
        { title: "Japanese", imageSrc: "/jp.svg" },
        { title: "Italian", imageSrc: "/it.svg" },
      ])
      .returning();

    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: `Which one of these is "the man"?`,
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: `Which one of these is "the woman"?`,
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: `Which one of these is "the boy"?`,
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: `"the man"`,
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: `Which one of these is "the zombie"?`,
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: `Which one of these is "the robot"?`,
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: `Which one of these is "the girl"?`,
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: `"the zombie"`,
                order: 8,
              },
            ])
            .returning();

          for (const challenge of challenges) {
            const langPrefix =
              course.title === "Spanish"
                ? "es"
                : course.title === "French"
                  ? "fr"
                  : course.title === "Croatian"
                    ? "hr"
                    : course.title === "Japanese"
                      ? "jp"
                      : "it";

            const getText = (
              word: "man" | "woman" | "boy" | "zombie" | "robot" | "girl"
            ) => {
              const translations = {
                man: {
                  es: "el hombre",
                  fr: "l'homme",
                  hr: "čovjek",
                  jp: "男",
                  it: "l'uomo",
                },
                woman: {
                  es: "la mujer",
                  fr: "la femme",
                  hr: "žena",
                  jp: "女",
                  it: "la donna",
                },
                boy: {
                  es: "el chico",
                  fr: "le garçon",
                  hr: "dječak",
                  jp: "男の子",
                  it: "il ragazzo",
                },
                zombie: {
                  es: "el zombie",
                  fr: "le zombie",
                  hr: "zombi",
                  jp: "ゾンビ",
                  it: "lo zombi",
                },
                robot: {
                  es: "el robot",
                  fr: "le robot",
                  hr: "robot",
                  jp: "ロボット",
                  it: "il robot",
                },
                girl: {
                  es: "la niña",
                  fr: "la fille",
                  hr: "djevojka",
                  jp: "女の子",
                  it: "la ragazza",
                },
              };
              return translations[word][langPrefix];
            };

            const optionsMap: Record<number, any[]> = {
              1: [
                {
                  correct: true,
                  text: getText("man"),
                  imageSrc: "/man.svg",
                  audioSrc: `/${langPrefix}_man.mp3`,
                },
                {
                  correct: false,
                  text: getText("woman"),
                  imageSrc: "/woman.svg",
                  audioSrc: `/${langPrefix}_woman.mp3`,
                },
                {
                  correct: false,
                  text: getText("boy"),
                  imageSrc: "/boy.svg",
                  audioSrc: `/${langPrefix}_boy.mp3`,
                },
              ],
              2: [
                {
                  correct: true,
                  text: getText("woman"),
                  imageSrc: "/woman.svg",
                  audioSrc: `/${langPrefix}_woman.mp3`,
                },
                {
                  correct: false,
                  text: getText("boy"),
                  imageSrc: "/boy.svg",
                  audioSrc: `/${langPrefix}_boy.mp3`,
                },
                {
                  correct: false,
                  text: getText("man"),
                  imageSrc: "/man.svg",
                  audioSrc: `/${langPrefix}_man.mp3`,
                },
              ],
              3: [
                {
                  correct: false,
                  text: getText("woman"),
                  imageSrc: "/woman.svg",
                  audioSrc: `/${langPrefix}_woman.mp3`,
                },
                {
                  correct: false,
                  text: getText("man"),
                  imageSrc: "/man.svg",
                  audioSrc: `/${langPrefix}_man.mp3`,
                },
                {
                  correct: true,
                  text: getText("boy"),
                  imageSrc: "/boy.svg",
                  audioSrc: `/${langPrefix}_boy.mp3`,
                },
              ],
              4: [
                {
                  correct: false,
                  text: getText("woman"),
                  audioSrc: `/${langPrefix}_woman.mp3`,
                },
                {
                  correct: true,
                  text: getText("man"),
                  audioSrc: `/${langPrefix}_man.mp3`,
                },
                {
                  correct: false,
                  text: getText("boy"),
                  audioSrc: `/${langPrefix}_boy.mp3`,
                },
              ],
              5: [
                {
                  correct: false,
                  text: getText("man"),
                  imageSrc: "/man.svg",
                  audioSrc: `/${langPrefix}_man.mp3`,
                },
                {
                  correct: false,
                  text: getText("woman"),
                  imageSrc: "/woman.svg",
                  audioSrc: `/${langPrefix}_woman.mp3`,
                },
                {
                  correct: true,
                  text: getText("zombie"),
                  imageSrc: "/zombie.svg",
                  audioSrc: `/${langPrefix}_zombie.mp3`,
                },
              ],
              6: [
                {
                  correct: true,
                  text: getText("robot"),
                  imageSrc: "/robot.svg",
                  audioSrc: `/${langPrefix}_robot.mp3`,
                },
                {
                  correct: false,
                  text: getText("zombie"),
                  imageSrc: "/zombie.svg",
                  audioSrc: `/${langPrefix}_zombie.mp3`,
                },
                {
                  correct: false,
                  text: getText("boy"),
                  imageSrc: "/boy.svg",
                  audioSrc: `/${langPrefix}_boy.mp3`,
                },
              ],
              7: [
                {
                  correct: true,
                  text: getText("girl"),
                  imageSrc: "/girl.svg",
                  audioSrc: `/${langPrefix}_girl.mp3`,
                },
                {
                  correct: false,
                  text: getText("zombie"),
                  imageSrc: "/zombie.svg",
                  audioSrc: `/${langPrefix}_zombie.mp3`,
                },
                {
                  correct: false,
                  text: getText("man"),
                  imageSrc: "/man.svg",
                  audioSrc: `/${langPrefix}_man.mp3`,
                },
              ],
              8: [
                {
                  correct: false,
                  text: getText("woman"),
                  audioSrc: `/${langPrefix}_woman.mp3`,
                },
                {
                  correct: true,
                  text: getText("zombie"),
                  audioSrc: `/${langPrefix}_zombie.mp3`,
                },
                {
                  correct: false,
                  text: getText("boy"),
                  audioSrc: `/${langPrefix}_boy.mp3`,
                },
              ],
            };

            await db.insert(schema.challengeOptions).values(
              optionsMap[challenge.order].map((opt) => ({
                ...opt,
                challengeId: challenge.id,
              }))
            );
          }
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();
