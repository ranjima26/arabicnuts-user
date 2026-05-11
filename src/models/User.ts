import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [false, "Please enter your name"],
      maxlength: [50, "Your name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: function (this: any, value: string) {
          return !this.phone || !!value;
        },
        message: "Email or phone is required",
      },
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: function (this: any, value: string) {
          return !this.email || !!value;
        },
        message: "Email or phone is required",
      },
    },
    password: {
      type: String,
      required: [false, "Please enter your password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    signupMethod: {
      type: String,
      enum: ["OTP", "Email/Password", "OAuth"],
      default: "Email/Password",
    },
    userAddress: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  } else if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME as any,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = new Date(Date.now() + 30 * 60 * 1000);
  return resetToken;
};

const User = models.User || model("User", userSchema);

export default User;
