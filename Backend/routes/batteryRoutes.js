import express from "express";
import Battery from "../models/Battery.js";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const battery = await Battery.create(req.body);
    res.json(battery);
  } catch {
    res.status(500).json({ message: "Create failed" });
  }
});

/* SEARCH – SPACE INSENSITIVE */
router.get("/", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json([]);

    const normalizedQ = q.replace(/\s+/g, "").toUpperCase();

    const batteries = await Battery.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { serial: { $regex: q, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: {
                $toUpper: {
                  $replaceAll: {
                    input: "$vehicleNumber",
                    find: " ",
                    replacement: ""
                  }
                }
              },
              regex: normalizedQ
            }
          }
        }
      ]
    }).limit(20);

    res.json(batteries);
  } catch {
    res.status(500).json({ message: "Search failed" });
  }
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const updated = await Battery.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Battery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
