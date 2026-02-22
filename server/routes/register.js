app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created" });

  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});