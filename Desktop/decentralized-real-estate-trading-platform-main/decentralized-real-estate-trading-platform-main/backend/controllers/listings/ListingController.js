const { ResponseMessage } = require("../../helpers/Response");
const { SendListingTransaction } = require("../../helpers/SendListingTransaction");
const { Listing } = require("../../models");

exports.createListing = async (req, res) => {
    try {
        const data = req.body;
        const newListing = await Listing.create({ details: data });
        return ResponseMessage(res, true, 200, "Listing created successfully", newListing);
    } catch (error) {
        console.log(error.message)
        ResponseMessage(res, false, 500, error.message ?? "Internal server error", {});
    }
}


exports.approveListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findByPk(id)
        if (listing) {
            const transaction = await SendListingTransaction(id, listing.details);
            if (transaction.success) {
                return ResponseMessage(res, true, 200, "Listing approved successfully", tx);

            } else {
                return ResponseMessage(res, false, 400, transaction.message, transaction.tx);

            }
        } else {
            return ResponseMessage(res, false, 400, "Listing not found", {});
        }
    } catch (error) {
        console.log(error.message)
        ResponseMessage(res, false, 500, error.message ?? "Internal server error", {});
    }
}


exports.getListings = async (req, res) => {
    try {
        const { page, size } = req.query;
        const listings = await Listing.findAndCountAll({
            distinct: true,
            limit: size ?? 50,
            offset: (page ?? 0) * (size ?? 50),
            order: [["createdAt", "ASC"]],
        })
        return ResponseMessage(res, true, 200, "Listing fetched", listings);
    } catch (error) {
        console.log(error)
        ResponseMessage(res, false, 500, "Internal server error", {});
    }
}


exports.deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findByPk(id);
        if (listing) {
            await listing.destroy();
        }
        return ResponseMessage(res, true, 200, "Listing deleted", listing);
    } catch (error) {
        console.log(error)
        ResponseMessage(res, false, 500, error.message ?? "Internal server error", {});
    }
}