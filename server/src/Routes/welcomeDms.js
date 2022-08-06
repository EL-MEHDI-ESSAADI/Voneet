import express from "express";
import { TwitterApi } from "twitter-api-v2";
import { appTokens } from "../Data/index.js";
import { asyncWrapper } from "../Helpers/utils.js";

const router = express.Router();

// add new welcomeDm
router.post(
   "/",
   asyncWrapper(async (req, res) => {
      const { name, text, isActive } = req.body;
      const client = new TwitterApi({ ...appTokens, ...req.session.userTokens });
      const { welcome_message } = await client.v1.newWelcomeDm(name, { text });

      if (isActive) await client.v1.setWelcomeDm(welcome_message.id, false);

      res.json({
         id: welcome_message.id,
         name: welcome_message.name,
         text: welcome_message.message_data.text,
         isActive,
      });
   })
);

// delete the welcomeDm
router.delete(
   "/:id",
   asyncWrapper(async (req, res) => {
      const client = new TwitterApi({ ...appTokens, ...req.session.userTokens });

      await client.v1.deleteWelcomeDm(req.params.id);
      res.json({ message: "welcomeDm deleted" });
   })
);

// activate the welcomeDm 
router.put(
   "/:id/active",
   asyncWrapper(async (req, res) => {
      const client = new TwitterApi({ ...appTokens, ...req.session.userTokens });

      await client.v1.setWelcomeDm(req.params.id, false);
      res.json({ message: "welcomeDm activated successfully" });
   })
);

// deactive the welcomeDm
router.put(
   "/:id/deactive",
   asyncWrapper(async (req, res) => {
      const client = new TwitterApi({ ...appTokens, ...req.session.userTokens });
      const { welcome_message_rules } = await client.v1.listWelcomeDmRules({ count: 1 });

      await client.v1.deleteWelcomeDmRule(welcome_message_rules[0].id);

      res.json({ message: "welcomeDm deactivated successfully" });
   })
);

// get user welcomeDms
router.get(
   "/",
   asyncWrapper(async (req, res) => {
      const client = new TwitterApi({ ...appTokens, ...req.session.userTokens });
      const { welcome_message_rules } = await client.v1.listWelcomeDmRules({ count: 1 });
      const activeWelcomeDmId =
         welcome_message_rules && welcome_message_rules.length
            ? welcome_message_rules[0].welcome_message_id
            : null;
      let welcomeDms = [];
      // a cureser that point on the nexpt page of welcomeDms
      let nextWelcomeDmsCurserPage;

      do {
         const welcomeDmsPage = await client.v1.listWelcomeDms({ count: 50, cursor: nextWelcomeDmsCurserPage });
         if (welcomeDmsPage.data.welcome_messages)
            welcomeDms = [
               ...welcomeDms,
               ...welcomeDmsPage.data.welcome_messages.map((item) => ({
                  id: item.id,
                  text: item.message_data.text,
                  name: item.name,
                  isActive: item.id === activeWelcomeDmId,
               })),
            ].sort((a, b) => (a.isActive ? -1 : b.isActive ? 1 : 0));

         nextWelcomeDmsCurserPage = welcomeDmsPage.data.next_cursor;
      } while (nextWelcomeDmsCurserPage);

      res.json(welcomeDms);
   })
);

export default router;
