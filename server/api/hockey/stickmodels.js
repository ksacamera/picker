const express = require("express");
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { requireUser } = require("../utils"); 
const { requireAdmin } = require("../utils");
const slugify = require("slugify");

// Initialize Prisma client
const prisma = new PrismaClient();

// Route to fetch stick models
router.get("/", async (req, res) => {
  try {
    const stickModels = await prisma.model.findMany({
      include: {
        Brand: true,       // Include the related Brand information
        KickPoint: true,   // Include the related KickPoint information
      },
  });
    res.send(stickModels);
  } catch (error) {
    console.error("Error fetching Stick Models:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching Stick Models." });
  }
});

// Returns ONE Stick Model with specified ID
router.get("/:slug", requireUser, async (req, res) => {
  try {
    const stickModel = await prisma.model.findUnique({
      where: {
        slug: req.params.slug,
      },
      include: {
        Brand: true,
        KickPoint: true,
      },
    });
    if (!stickModel) {
      res.send({ error: true, message: "Stick Model Not Found" });
    } else {
      res.send(stickModel);
    }
  } catch (error) {
    res.send({ error: true, message: "Something went wrong" });
  }
});

// Define a route to create a new Stick Model
router.post("/", requireAdmin, async (req, res) => {
  try {
    // Extract Stick Model data from the request body
    const { ModelName, BrandID, KickPointID } = req.body;

    // Create a slug from the model name
    const slug = slugify(ModelName, { lower: true });

    // Create a new stick model in the database
    const newStickModel = await prisma.model.create({
      data: {
        ModelName,
        BrandID,
        KickPointID,
        slug,
      },
    });

    res.send(newStickModel);
  } catch (error) {
    console.error("Error creating a stick model:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating stick model." });
  }
});

//Updates stick model with specified id
router.put("/:slug", requireAdmin, async (req, res) => {
  try {
    const stickModel = await prisma.model.update({
      where: {
        slug: req.params.slug,
      },
      data: req.body,
    });
    if (!stickModel) {
      res.send({ error: true, message: "Stick Model Not Found" });
    } else {
      res.send(stickModel);
    }
  } catch (error) {
    res.send(error);
  }
});

// Route that deletes a stick model
router.delete("/:slug", requireAdmin, async (req, res) => {
  try {
    const deletedStickModel = await prisma.model.delete({
      where: {
        slug: req.params.slug,
      },
    });
    if (!deletedStickModel) {
      res.send({ error: true, message: "Stick Model Not Found" });
    } else {
      res.send(stickModel);
    }
  } catch (error) {
    res.send(error);
  }
});

// Don't forget to close the Prisma client when the server stops
process.on("beforeExit", () => {
  prisma.$disconnect();
});

module.exports = router;
