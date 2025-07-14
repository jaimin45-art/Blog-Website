//     // import { handleError } from "../helpers/handleError.js"
//     // import User from "../models/user.model.js"
//     // import bcryptjs from 'bcryptjs'
//     // import jwt from 'jsonwebtoken'
//     // export const Register = async (req, res, next) => {
//     //     try {
//     //         const { name, email, password } = req.body
//     //         const checkuser = await User.findOne({ email })
//     //         if (checkuser) {
//     //             // user already registered 
//     //             next(handleError(409, 'User already registered.'))
//     //         }

//     //         const hashedPassword = bcryptjs.hashSync(password)
//     //         // register user  
//     //         const user = new User({
//     //             name, email, password: hashedPassword
//     //         })

//     //         await user.save();

//     //         res.status(200).json({
//     //             success: true,
//     //             message: 'Registration successful.'
//     //         })

//     //     } catch (error) {
//     //         next(handleError(500, error.message))
//     //     }
//     // }


//     // export const Login = async (req, res, next) => {
//     //     try {
//     //         const { email, password } = req.body
//     //         const user = await User.findOne({ email })
//     //         if (!user) {
//     //             next(handleError(404, 'Invalid login credentials.'))
//     //         }
//     //         const hashedPassword = user.password

//     //         const comparePassword = bcryptjs.compare(password, hashedPassword)
//     //         if (!comparePassword) {
//     //             next(handleError(404, 'Invalid login credentials.'))
//     //         }

//     //         const token = jwt.sign({
//     //             _id: user._id,
//     //             name: user.name,
//     //             email: user.email,
//     //             avatar: user.avatar
//     //         }, process.env.JWT_SECRET)


//     //         res.cookie('access_token', token, {
//     //             httpOnly: true,
//     //             secure: process.env.NODE_ENV === 'production',
//     //             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//     //             path: '/'
//     //         })

//     //         const newUser = user.toObject({ getters: true })
//     //         delete newUser.password
//     //         res.status(200).json({
//     //             success: true,
//     //             user: newUser,
//     //             message: 'Login successful.'
//     //         })

//     //     } catch (error) {
//     //         next(handleError(500, error.message))
//     //     }
//     // }

//     // export const GoogleLogin = async (req, res, next) => {
//     //     try {
//     //         const { name, email, avatar } = req.body
//     //         let user
//     //         user = await User.findOne({ email })
//     //         if (!user) {
//     //             //  create new user 
//     //             const password = Math.random().toString()
//     //             const hashedPassword = bcryptjs.hashSync(password)
//     //             const newUser = new User({
//     //                 name, email, password: hashedPassword, avatar
//     //             })

//     //             user = await newUser.save()

//     //         }


//     //         const token = jwt.sign({
//     //             _id: user._id,
//     //             name: user.name,
//     //             email: user.email,
//     //             avatar: user.avatar
//     //         }, process.env.JWT_SECRET)


//     //         res.cookie('access_token', token, {
//     //             httpOnly: true,
//     //             secure: process.env.NODE_ENV === 'production',
//     //             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//     //             path: '/'
//     //         })

//     //         const newUser = user.toObject({ getters: true })
//     //         delete newUser.password
//     //         res.status(200).json({
//     //             success: true,
//     //             user: newUser,
//     //             message: 'Login successful.'
//     //         })

//     //     } catch (error) {
//     //         next(handleError(500, error.message))
//     //     }
//     // }



//     // export const Logout = async (req, res, next) => {
//     //     try {

//     //         res.clearCookie('access_token', {
//     //             httpOnly: true,
//     //             secure: process.env.NODE_ENV === 'production',
//     //             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//     //             path: '/'
//     //         })

//     //         res.status(200).json({
//     //             success: true,
//     //             message: 'Logout successful.'
//     //         })

//     //     } catch (error) {
//     //         next(handleError(500, error.message))
//     //     }
//     // }


//     import { handleError } from "../helpers/handleError.js";
// import User from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Register
// export const Register = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     const checkuser = await User.findOne({ email });
//     if (checkuser) {
//       return next(handleError(409, "User already registered."));
//     }

//     const hashedPassword = bcryptjs.hashSync(password);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Registration successful.",
//     });
//   } catch (error) {
//     return next(handleError(500, error.message));
//   }
// };

// // Login
// export const Login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return next(handleError(404, "Invalid login credentials."));
//     }

//     const hashedPassword = user.password;
//     const comparePassword = await bcryptjs.compare(password, hashedPassword);
//     if (!comparePassword) {
//       return next(handleError(404, "Invalid login credentials."));
//     }

//     const token = jwt.sign(
//       {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//       },
//       process.env.JWT_SECRET
//     );

//     res.cookie("access_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       path: "/",
//     });

//     const newUser = user.toObject({ getters: true });
//     delete newUser.password;

//     res.status(200).json({
//       success: true,
//       user: newUser,
//       message: "Login successful.",
//     });
//   } catch (error) {
//     return next(handleError(500, error.message));
//   }
// };

// // Google Login
// export const GoogleLogin = async (req, res, next) => {
//   try {
//     const { name, email, avatar } = req.body;

//     let user = await User.findOne({ email });

//     if (!user) {
//       const password = Math.random().toString();
//       const hashedPassword = bcryptjs.hashSync(password);

//       const newUser = new User({
//         name,
//         email,
//         password: hashedPassword,
//         avatar,
//       });

//       user = await newUser.save();
//     }

//     const token = jwt.sign(
//       {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//       },
//       process.env.JWT_SECRET
//     );

//     res.cookie("access_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       path: "/",
//     });

//     const newUser = user.toObject({ getters: true });
//     delete newUser.password;

//     res.status(200).json({
//       success: true,
//       user: newUser,
//       message: "Login successful.",
//     });
//   } catch (error) {
//     return next(handleError(500, error.message));
//   }
// };

// // Logout
// export const Logout = async (req, res, next) => {
//   try {
//     res.clearCookie("access_token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       path: "/",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Logout successful.",
//     });
//   } catch (error) {
//     return next(handleError(500, error.message));
//   }
// };



import  User from "../model/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateJWTToken } from "../utils/generateJWTToken.js";

import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail
} from "../resend/email.js";

// ✅ SIGNUP
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role, // ✅ admin or user
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    });
    await user.save();

    generateJWTToken(res, user._id, user.role); // ✅ send role too
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ LOGIN


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ success: false, message: "Incorrect password" });

    if (!user.isVerified) {
      const code = generateVerificationToken();
      user.verificationToken = code;
      user.verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000;
      await user.save();

      await sendVerificationEmail(user.email, code);

      return res.status(400).json({ success: false, message: "Email not verified. Code sent again." });
    }

    generateJWTToken(res, user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      }
    });
  } catch (error) {
    console.log("Login error", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


// ✅ LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// ✅ VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );

    res.status(200).json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ CHECK AUTH
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      user: { ...user._doc, password: undefined }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
