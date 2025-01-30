import React, { useState } from "react";
import emailjs from "emailjs-com";  // Import emailjs
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import Map from "../widgets/cards/map";

export function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    termsAccepted: false,
  });
  const [formStatus, setFormStatus] = useState(""); // To show success or error messages

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox for terms acceptance
  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: !prevData.termsAccepted,
    }));
  };

  // Submit form using emailjs
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if terms are accepted
    if (!formData.termsAccepted) {
      setFormStatus("Please accept the terms and conditions.");
      return;
    }

    // EmailJS service sending logic
    const templateParams = {
      from_name: formData.fullName,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_u6t7ufk", // Replace with your emailjs service ID
        "template_p2xpfnf", // Replace with your emailjs template ID
        templateParams,
        "TY--UzKHlDLtRce-H" // Replace with your emailjs user ID
      )
      .then(
        (response) => {
          console.log("Success:", response);
          setFormStatus("Message sent successfully!");
          setFormData({ fullName: "", email: "", message: "", termsAccepted: false }); // Reset form
        },
        (error) => {
          console.error("Error:", error);
          setFormStatus("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="container relative mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black text-4xl sm:text-5xl lg:text-6xl"
              >
                Stay healthy, Play Football.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                This our Stadium Reservation Application, you can chose one of our stadiums and reserve to play football with your friends
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center">
            <div className="mx-auto w-full px-4 md:w-6/12 lg:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full  p-2 text-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                </svg>
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold text-2xl sm:text-3xl"
                color="blue-gray"
              >
                Here are our map locations
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                This feature is still a work in progress.
                <br />
                <br />
                
              </Typography>
              <Button variant="filled">read more</Button>
            </div>
            <div className="mx-auto mt-12 w-full px-4 sm:mt-16 md:w-5/12 lg:w-4/12">
              <Map />
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Our Stadiums" heading="Make your reservation below">
            Choose one of the following stadiums by clicking on it. Select your
            preference; we offer stadiums suitable for 12 to 18 players.
          </PageTitle>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          
          
          <PageTitle section="Contact Us" heading="Want to work with us?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle>
          <form className="mx-auto w-full mt-12 lg:w-5/12" onSubmit={handleSubmit}>
            <div className="mb-8 flex flex-wrap gap-8">
              <Input
                variant="outlined"
                size="lg"
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full sm:w-1/2"
              />
              <Input
                variant="outlined"
                size="lg"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full sm:w-1/2"
              />
            </div>
            <Textarea
              variant="outlined"
              size="lg"
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={8}
            />
            <Checkbox
              checked={formData.termsAccepted}
              onChange={handleCheckboxChange}
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="ml-2 font-normal"
                >
                  I accept the{" "}
                  <a href="#terms" className="font-medium text-blue-500 hover:text-blue-700">
                    Terms and Conditions
                  </a>
                </Typography>
              }
            />
            <Button
              type="submit"
              variant="filled"
              color="blue"
              className="mt-6 w-full"
            >
              Send Message
            </Button>
            {formStatus && (
              <Typography
                variant="small"
                color={formStatus.includes("success") ? "green" : "red"}
                className="mt-4 text-center"
              >
                {formStatus}
              </Typography>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
