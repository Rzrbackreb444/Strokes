import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storiesRouter from "./stories";
import contactRouter from "./contact";
import statsRouter from "./stats";
import adminRouter from "./admin";
import donationsRouter from "./donations";
import giftScholarshipsRouter from "./giftScholarships";
import stripeWebhookRouter from "./stripeWebhook";
import applicationsRouter from "./applications";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storiesRouter);
router.use(contactRouter);
router.use(statsRouter);
router.use(adminRouter);
router.use(donationsRouter);
router.use(giftScholarshipsRouter);
router.use(stripeWebhookRouter);
router.use(applicationsRouter);

export default router;
