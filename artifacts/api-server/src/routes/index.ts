import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storiesRouter from "./stories";
import contactRouter from "./contact";
import statsRouter from "./stats";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storiesRouter);
router.use(contactRouter);
router.use(statsRouter);
router.use(adminRouter);

export default router;
