import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function toPublicUser(user) {
  return { id: user._id, name: user.name, phone: user.phone, role: user.role }
}

export async function signup(req, res, next) {
  try {
    const { name, phone, password, role } = req.body
    const existing = await User.findOne({ phone })
    if (existing) {
      return res.status(400).json({ message: "في حساب مسجّل بنفس رقم الهاتف" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      role: role || "renter"
    });

    const token = generateToken(user._id)
    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { phone, password, role } = req.body;
    console.log('البيانات الجايالي من الفرونت:', phone, role);// مبدأيا
    const user = await User.findOne({ phone, role });
    console.log('شو لقيت بقاعدة البيانات:', user);// مبدأيا


    if (!user) {
      return res.status(401).json({ message: 'رقم الهاتف أو كلمة المرور غير صحيحة' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'رقم الهاتف أو كلمة المرور غير صحيحة' })
    }

    const token = generateToken(user._id);
    res.json({ token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}