const {TravelPlans} = require('../models/travelPlans')
const {User} = require('../models/User')


module.exports = {
    addPlan,
    //Create a travel plan for the user with trip details

    deletePlan,
    //Remove a travel plan for the user with click of a button

    editPlan,
    //Allows you to edit the travel plan for the user, can only edit if the user is logged in and created the respective plan

    getUserPlan,
    //Get all secret travel plans

    getAllPlans,
    //Will be on a page that allows you to see all public travel plans
}