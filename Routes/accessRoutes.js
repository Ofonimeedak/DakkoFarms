const express = require("express");
const roleAuthorization = require("../Middleware/roleAuthMiddleware");
const accessControllers = require("../Controller/accessControllers");
const tokenAuthorization = require("../Middleware/authMiddleware");

const router = express.Router();

router.get(
  "/admin",
  tokenAuthorization,
  roleAuthorization(["write", "read", "update", "delete"]),
  accessControllers.admin
);
router.get(
  "/customers",
  tokenAuthorization,
  roleAuthorization(["read"]),
  accessControllers.customers
);

module.exports = router;
