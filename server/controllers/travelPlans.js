const { TravelPlan } = require("../models/travelPlans");
const { User } = require("../models/User");

module.exports = {
  addPlan: async (req, res) => {
    //working
    try {
      const { location, userId, img, startDate, endDate, publicStatus } =
        req.body;
      await TravelPlan.create({
        tripLocation: location,
        UserId: userId,
        tripImg: img,
        startDate: startDate,
        endDate: endDate,
        publicStatus: publicStatus,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      console.log("Cannot add travel Plan");
      res.sendStatus(400);
    }
  },
  //Create a travel plan for the user with trip details

  // deletePlan,
  // //Remove a travel plan for the user with click of a button
  deletePlan: async (req, res) => {
    try {
      const { id } = req.params;
      await TravelPlan.destroy({
        where: { id: +id },
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      console.log("Cannot delete");
      res.sendStatus(400);
    }
  },

  // editPlan,
  // //Allows you to edit the travel plan for the user, can only edit if the user is logged in and created the respective plan]
  editPlan: async (req, res) => {
    try {
      const { id } = req.params;
      const { publicStatus } = req.body;
      await TravelPlan.update(
        {
          publicStatus: publicStatus,
        },
        {
          where: { id: +id },
        }
      );
      res.sendStatus(200);
      console.log("Status updated");
    } catch (err) {
      console.log(err);
      console.log("Error in edit");
      res.sendStatus(400);
    }
  },

  // getUserPlan,
  // //Get all secret travel plans
  getUserPlan: async (req, res) => {
    try {
      const { userId } = req.params;
      const travelPlans = await TravelPlan.findAll({
        where: { UserId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: ["username"],
          },
        ],
      });
      console.log(travelPlans);
      res.status(200).send(travelPlans);
      console.log("Successfull sent user travel Plans");
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // getAllPlans,
  //Will be on a page that allows you to see all public travel plans
  getAllPlans: async (req, res) => {
    try {
      const travelPlans = await TravelPlan.findAll({
        where: { publicStatus: true },
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
      console.log("Before travel plan console log");
      console.log(travelPlans);
      res.status(200).send(travelPlans);
      console.log("getting plans");
    } catch (err) {
      console.log(err);
      console.log("Error in getting posts");
      res.sendStatus(400);
    }
  },
};
