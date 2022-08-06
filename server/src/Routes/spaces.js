import express from "express";
import { langs } from "../Data/index.js";
import { asyncWrapper } from "../Helpers/utils.js";
import { appOnlyClientAuth2 } from "../Modules/index.js";

const router = express.Router();

router.post(
   "/",
   asyncWrapper(async (req, res) => {
      let spaces = [];
      const searchOptions = req.body;
      const spacesSearchResult = await appOnlyClientAuth2.v2.searchSpaces({
         query: searchOptions.query,
         state: searchOptions.state,
         "space.fields": [
            "id",
            "title",
            "state",
            "host_ids",
            "participant_count",
            "lang",
            "topic_ids",
            "is_ticketed",
            "started_at",
            "scheduled_start",
         ],
         "user.fields": ["profile_image_url"],
         expansions: ["host_ids", "topic_ids"],
      });

      if (spacesSearchResult.meta.result_count)
         spaces = spacesSearchResult.data.map((spaceData) => ({
            id: spaceData.id,
            title: spaceData.title,
            state: spaceData.state,
            participantCount: spaceData.participant_count,
            lang: langs[spaceData.lang] || "",
            isTicketed: spaceData.is_ticketed,
            [spaceData.state === "live" ? "startedAt" : "scheduledStart"]:
               spaceData[spaceData.state === "live" ? "started_at" : "scheduled_start"],
            hosts: spaceData.host_ids.map((hostId) => {
               const hostUser = spacesSearchResult.includes.users.find((user) => user.id === hostId);
               delete hostUser.name;
               return hostUser;
            }),
            topics:
               spaceData.topic_ids &&
               spaceData.topic_ids.map((targetTopicId) => {
                  const topic = spacesSearchResult.includes.topics.find((topic) => topic.id === targetTopicId);
                  return topic.name;
               }),
         }));

      res.json(spaces);
   })
);

export default router;
