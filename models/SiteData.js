const mongoose = require('mongoose');

const TimelineEventSchema = new mongoose.Schema({
    time: String,
    title: String,
    desc: String,
    type: { type: String, enum: ['sports', 'college'], default: 'sports' }
}, { _id: false });

const GalleryImageSchema = new mongoose.Schema({
    url: String,
    type: { type: String, enum: ['sports', 'college'] },
    label: String,
    publicId: String // Cloudinary public ID for deletion
}, { _id: false });

const HouseLeaderSchema = new mongoose.Schema({
    name: String,
    image: String,
    publicId: String
}, { _id: false });

const VideoSchema = new mongoose.Schema({
    title: String,
    link: String
}, { _id: false });

const CoordinatorSchema = new mongoose.Schema({
    name: String,
    image: String,
    type: String,
    publicId: String
}, { _id: false });

const SiteDataSchema = new mongoose.Schema({
    _docId: { type: String, default: 'main', unique: true }, // single document pattern
    boysSchedule: { type: String, default: '' },
    girlsSchedule: { type: String, default: '' },
    matchSchedule: { type: String, default: '' },
    announcements: { type: [String], default: [] },
    galleryImages: { type: [GalleryImageSchema], default: [] },
    timeline: {
        type: [TimelineEventSchema],
        default: [
            { time: '8:00 AM', title: 'Registration & Assembly', desc: 'Participant check-in and opening ceremony', type: 'sports' },
            { time: '9:00 AM', title: 'Sports Events Begin', desc: 'Track and field events commence', type: 'sports' },
            { time: '11:00 AM', title: 'Team Sports', desc: 'Cricket, Football, Volleyball matches', type: 'sports' },
            { time: '1:00 PM', title: 'Lunch Break', desc: 'Refreshments for all participants', type: 'sports' },
            { time: '2:00 PM', title: 'Cultural Events', desc: 'Dance, singing, and drama performances', type: 'college' },
            { time: '4:00 PM', title: 'Fashion Show & Art', desc: 'Creative showcases and exhibitions', type: 'college' },
            { time: '5:30 PM', title: 'Prize Distribution', desc: 'Awards ceremony for winners', type: 'college' },
            { time: '6:30 PM', title: 'Closing Ceremony', desc: 'Vote of thanks and conclusion', type: 'college' }
        ]
    },
    sportsEvents: {
        type: [String],
        default: ['100m Race & Relay', 'Cricket Tournament', 'Football Championship', 'Volleyball & Kabaddi', 'Girls: Throwball & Kho-Kho', 'Chess & Carrom Board']
    },
    collegeEvents: {
        type: [String],
        default: ['Dance Performances', 'Singing Competitions', 'Drama & Theatre', 'Fashion Show', 'Art Exhibition', 'Talent Show']
    },
    leaders: {
        type: {
            red: HouseLeaderSchema,
            green: HouseLeaderSchema,
            yellow: HouseLeaderSchema,
            blue: HouseLeaderSchema
        },
        default: {
            red: { name: 'Add Leader Name', image: '' },
            green: { name: 'Add Leader Name', image: '' },
            yellow: { name: 'Add Leader Name', image: '' },
            blue: { name: 'Add Leader Name', image: '' }
        }
    },
    videos: {
        type: [VideoSchema],
        default: [
            { title: 'Internship Experience GenLab', link: '#' },
            { title: 'Volley Ball Tournament', link: '#' },
            { title: 'Drone Hackathon', link: '#' },
            { title: 'Student Testimonial', link: '#' }
        ]
    },
    coordinators: {
        type: [CoordinatorSchema],
        default: [
            { name: 'John Doe', image: 'https://picsum.photos/300/300?random=21', type: 'sports' },
            { name: 'Jane Smith', image: 'https://picsum.photos/300/300?random=22', type: 'college' }
        ]
    }
}, { timestamps: true });

module.exports = mongoose.model('SiteData', SiteDataSchema);
