import { umzug } from "../database/sequelizeMigration";

async function runMigrations() {
  try {
    console.log("Running migrations...");
    await umzug.up();
    console.log("Migrations completed!");
  } catch (error) {
    console.error("ERROR: Migration error - ", error);

    console.log("Rolling back migration...");
    try {
      await umzug.down();
      console.log("Rolled back successfully.");
    } catch (rollbackError) {
      console.error("ERROR: Rollback failed - ", rollbackError);
    }

    process.exit(1);
  }
}

export { runMigrations };
