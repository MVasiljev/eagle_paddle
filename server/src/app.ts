import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./app/routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./app/routes/user.routes";
import roleRoutes from "./app/routes/role.routes";
import trainingSessionRoutes from "./app/routes/trainingSession.routes";
import trainingPlanRoutes from "./app/routes/trainingPlan.routes";
import teamRoutes from "./app/routes/team.routes";
import trainingTypeRoutes from "./app/routes/trainingType.routes";
import mentalHealthRoutes from "./app/routes/mentalHealth.routes";
import clubRoutes from "./app/routes/club.routes";
import boatRoutes from "./app/routes/boat.routes";
import disciplineRoutes from "./app/routes/discipline.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/training-sessions", trainingSessionRoutes);
app.use("/api/training-plans", trainingPlanRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/training-types", trainingTypeRoutes);
app.use("/api/mental-health", mentalHealthRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/boats", boatRoutes);
app.use("/api/disciplines", disciplineRoutes);

app.use(errorHandler);

export default app;
