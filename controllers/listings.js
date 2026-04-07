const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");
const mapToken = process.env.MAP_TOKEN;
const axios = require("axios")

module.exports.index = async (req, res) => {
    const { category, search } = req.query; // 1. Destructure 'search' from query
    let allListings;

    if (category) {
        allListings = await Listing.find({ category: category });
    } else if (search) {
        // 2. Add this block to search by location or country
        allListings = await Listing.find({
            $or: [
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });
    } else {
        allListings = await Listing.find({});
    }
    if (allListings.length === 0) {
        req.flash("error", "No listings found for your search!");
        return res.redirect("/");
    }

    return res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
	res.render("listings/new.ejs");
};
module.exports.showListing = async (req, res) => {
	let {id} = req.params;
	const listing = await Listing.findById(id)
	.populate({
		path: "reviews",
		populate: {
			path: "author",
		},
	})
	.populate("owner");
	if(!listing) {
		req.flash("error", "No such listing exist");
		return res.redirect("/listings");
	}
	return res.render("listings/show.ejs",{ listing });
};

module.exports.createListing = async (req, res, next) => {
	const locationQuery = req.body.listing.location;
    const jawgUrl = `https://api.jawg.io/places/v1/search?text=${encodeURIComponent(locationQuery)}&access-token=${process.env.MAP_TOKEN}&limit=1`;

    try {
        const response = await axios.get(jawgUrl);
		const geoData = response.data;

		let url = req.file.path;
		let filename = req.file.filename;
		const newListing = new Listing(req.body.listing);
		newListing.owner = req.user._id;
		newListing.image = {url, filename};
		if (geoData.features && geoData.features.length > 0) {
            newListing.geometry = geoData.features[0].geometry;
        } else {
            // Optional: Handle cases where the address isn't found
            console.error("Geocoding failed for location:", locationQuery);
        }
		await newListing.save();
		req.flash("success", "New Listing Created!");
		return res.redirect("/listings");
		} catch (err) {
        next(err);
    }
};

module.exports.renderEditForm = async (req, res) => {
	let {id} = req.params;
	const listing = await Listing.findById(id);
	if(!listing) {
		req.flash("error", "No such listing exist");
		return res.redirect("/listings");
	}
	let originalImageUrl = listing.image.url;
	if(originalImageUrl) {
		originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
	}
	return res.render("listings/edit.ejs",{ listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) =>{
		let { id } = req.params;
		let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
		if(typeof req.file !== "undefined") {
			let url = req.file.path;
			let filename = req.file.filename;
			listing.image = { url, filename };
			await listing.save();
		}
		req.flash("success", "Listing Updated!");
		return res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) =>{
	let {id} = req.params;
	let deletedListing = await Listing.findByIdAndDelete(id);
	console.log(deletedListing);
	req.flash("error", " Listing Deleted");
	res.redirect("/listings");
};