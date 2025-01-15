import { useState, useEffect } from "react";
import { Button, Input, Typography, Radio } from "@material-tailwind/react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      setError("You are already signed in.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!gender) {
      setError("Please select a gender.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Call the backend to save additional data
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseId: user.uid,
          email,
          firstName,
          lastName,
          gender,
        }),
      });

      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseId: user.uid,
          email: user.email,
          firstName: "Google",
          lastName: "User",
          gender: "Not Specified",
        }),
      });

      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md rounded-xl space-y-6">
          <Typography variant="h4" className="text-center mb-4">Create an Account</Typography>
          {error && <Typography className="text-red-500">{error}</Typography>}

          <div className="space-y-4">
            <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <Radio id="male" name="gender" label="Male" value="Male" onChange={() => setGender("Male")} />
            <Radio id="female" name="gender" label="Female" value="Female" onChange={() => setGender("Female")} />
          </div>

          <div className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Input
              label="Re-enter Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button className="mt-6 w-full" type="submit">Sign Up</Button>

          <div className="space-y-4 mt-8">
            <Button onClick={handleGoogleSignUp} className="flex items-center gap-2 justify-center shadow-md w-full">
              Sign Up With Google
            </Button>
          </div>

          <Typography className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/sign-in" className="text-gray-900 ml-1">Sign In</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
