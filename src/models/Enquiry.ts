import mongoose, { Schema, model, models } from 'mongoose';

const EnquirySchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please indicate a valid email address',
      ],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
  },
  { timestamps: true }
);

const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);

export default Enquiry;
