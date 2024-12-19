import bcrypt from "bcrypt";
import Role from "../app/models/role.model";
import User from "../app/models/user.model";
import TrainingSession from "../app/models/trainingSession.model"; // Import your TrainingSession model
import logger from "../config/logger";

export const initializeDatabase = async () => {
  try {
    const isDebugMode = process.env.LOG_LEVEL === "debug";

    if (isDebugMode) {
      logger.warn(
        "Debug mode detected. Deleting and repopulating the database..."
      );

      // Delete all existing data
      await Role.deleteMany({});
      await User.deleteMany({});
      await TrainingSession.deleteMany({}); // Delete all training sessions
      logger.info(
        "All existing roles, users, and training sessions have been deleted."
      );
    } else {
      logger.info("Production mode detected. No data will be deleted.");
    }

    // Create Default Roles
    const roles = ["admin", "coach", "competitor"];
    for (const roleName of roles) {
      const existingRole = await Role.findOne({ name: roleName });
      if (!existingRole) {
        await Role.create({ name: roleName });
        logger.info(`Role '${roleName}' created.`);
      }
    }

    // Create Default Admin
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@example.com";
    const adminExists = await User.findOne({ email: adminEmail });

    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      throw new Error("Admin role does not exist.");
    }

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PASSWORD || "defaultPassword123",
        10
      );

      await User.create({
        firstName: process.env.DEFAULT_ADMIN_FIRST_NAME || "Default",
        lastName: process.env.DEFAULT_ADMIN_LAST_NAME || "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: adminRole,
        approved: true,
      });

      logger.info("Default admin user created.");
    } else {
      logger.info("Default admin already exists. Skipping creation.");
    }

    // Create Competitors and Coaches
    const competitorRole = await Role.findOne({ name: "competitor" });
    const coachRole = await Role.findOne({ name: "coach" });

    if (!competitorRole || !coachRole) {
      throw new Error("Roles 'competitor' or 'coach' do not exist.");
    }

    const defaultPassword = await bcrypt.hash("defaultPassword123", 10);

    const users = [
      {
        firstName: "Nikola",
        lastName: "Jovanović",
        email: "nikola.jovanovic@mail.com",
        role: competitorRole,
      },
      {
        firstName: "Milica",
        lastName: "Petrović",
        email: "milica.petrovic@mail.com",
        role: competitorRole,
      },
      {
        firstName: "Vladimir",
        lastName: "Stanković",
        email: "vladimir.stankovic@mail.com",
        role: competitorRole,
      },
      {
        firstName: "Ana",
        lastName: "Nikolić",
        email: "ana.nikolic@mail.com",
        role: competitorRole,
      },
      {
        firstName: "Ivan",
        lastName: "Kovačević",
        email: "ivan.kovacevic@mail.com",
        role: competitorRole,
      },
      {
        firstName: "Marija",
        lastName: "Popović",
        email: "marija.popovic@mail.com",
        role: competitorRole,
      },
      {
        firstName: "Jelena",
        lastName: "Ilić",
        email: "jelena.ilic@mail.com",
        role: coachRole,
      },
      {
        firstName: "Stefan",
        lastName: "Đorđević",
        email: "stefan.djordjevic@mail.com",
        role: coachRole,
      },
    ];

    for (const userData of users) {
      const userExists = await User.findOne({ email: userData.email });
      if (!userExists) {
        await User.create({
          ...userData,
          password: defaultPassword,
          approved: true,
        });
        logger.info(`User '${userData.email}' created.`);
      } else {
        logger.info(`User '${userData.email}' already exists. Skipping.`);
      }
    }

    logger.info("Competitors and coaches have been successfully created.");
  } catch (error) {
    logger.error("Error during database initialization: %o", error);
    throw error;
  }
};
