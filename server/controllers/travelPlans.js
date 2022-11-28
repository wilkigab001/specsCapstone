const { TravelPlan } = require("../models/travelPlans");
const { User } = require("../models/User");
const { Wishlist } = require("../models/Wishlist");

module.exports = {
  addPlan: async (req, res) => {
    //working
    try {
      const {
        location,
        userId,
        img,
        startDate,
        endDate,
        publicStatus,
        postId,
      } = req.body;
      await TravelPlan.create({
        tripLocation: location,
        UserId: userId,
        tripImg: img,
        startDate: startDate,
        endDate: endDate,
        publicStatus: publicStatus,
        postId: postId,
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
      console.log(id);
      const { location, userId, img, startDate, endDate, publicStatus } =
        req.body;
      console.log(location, "location");
      console.log(userId, "userId");
      console.log(startDate, "startDate");
      await TravelPlan.update(
        {
          tripLocation: location,
          UserId: userId,
          tripImg: img,
          startDate: startDate,
          endDate: endDate,
          publicStatus: publicStatus,
          id,
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

  addToWishlist: async (req, res) => {
    try {
      const { UserId, planId } = req.body;
      console.log(UserId, 'user', planId, 'plan')
      await Wishlist.create({ userId: UserId, travelPlanId: planId });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  getMyWishlist: async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId)
      const wishlist = await Wishlist.findAll({
        where: { userId },
        include: [{
          model: TravelPlan,
          // required: true,
          // include: {
          //   model: User,
          //   required: true,
          //   attributes: ["username"],
          // }
        }],
      });
      res.status(200).send(wishlist);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
