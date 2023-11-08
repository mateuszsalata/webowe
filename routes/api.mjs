import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/students', async (req, res) => {
  try {
    const students = await prisma.students.findMany();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wystąpił błąd serwera" });
  }
});

router.get('/students/:id', async (req, res) => {
  const requestedId = parseInt(req.params.id);

  try {
    const student = await prisma.students.findUnique({
      where: { id: requestedId }
    });

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Nie znaleziono studenta o podanym ID" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wystąpił błąd serwera" });
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const subjects = await prisma.subjects.findMany();
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wystąpił błąd serwera" });
  }
});

router.get('/subjects/:id', async (req, res) => {
  const requestedId = parseInt(req.params.id);

  try {
    const subject = await prisma.subjects.findUnique({
      where: { id: requestedId },
    });

    if (subject) {
      res.json(subject);
    } else {
      res.status(404).json({ message: "Nie znaleziono przedmiotu o podanym ID" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wystąpił błąd serwera" });
  }
});

export { router as apiRouter };
