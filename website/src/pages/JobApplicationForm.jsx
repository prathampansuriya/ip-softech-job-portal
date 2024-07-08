// website/src/pages/jobDetail.jsx

import { useState } from "react";
import { CustomButton } from "../components";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import { useParams } from "react-router-dom";

const JobApplicationForm = () => {

    const { id } = useParams();

    const { user } = useSelector((state) => state.user);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [about, setAbout] = useState("");
    const [isApplying, setIsApplying] = useState(false);

    const handleApplyNow = async () => {
        setIsApplying(true);

        try {
            const res = await apiRequest({
                url: "/jobs/apply-job",
                method: "POST",
                token: user?.token,
                data: {
                    jobId: id,
                    name,
                    email,
                    contact,
                    about,
                },
            });

            if (res.success) {
                alert(res.message);
                window.location.replace('/');
                // Optionally, you can redirect or update state as needed after application submission
            }

            setIsApplying(false);
        } catch (error) {
            setIsApplying(false);
            console.log(error);
        }
    };

    return (
        <div>
            <h2 className="text-center font-bold text-2xl mt-10">Apply for this Job</h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:p-8">
                {/* Job Details Section */}
                {/* ... your existing job details JSX */}

                {/* Application Form */}
                <div className="bg-white shadow-md p-6 rounded">
                    <h2 className="text-xl font-semibold mb-4">Application Form</h2>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 mb-3 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 mb-3 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Your Contact Number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full px-3 py-2 mb-3 border rounded"
                    />
                    <textarea
                        placeholder="About Yourself (optional)"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="w-full px-3 py-2 mb-3 border rounded"
                    />
                    <CustomButton
                        title="Apply Now"
                        onClick={handleApplyNow}
                        containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base ${isApplying ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={isApplying}
                    />
                </div>

                {/* Instructions Section */}
                <div className="bg-gray-100 p-6 rounded">
                    <h2 className="text-xl font-semibold mb-4">Application Instructions</h2>
                    <p className="text-sm text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                        condimentum nisl non ultrices tempor. Aliquam tincidunt lorem eu
                        ante bibendum, ac egestas elit consectetur.
                    </p>
                    {/* Add more instructions as needed */}
                </div>

                {/* Similar Jobs Section */}
                {/* ... your existing similar jobs JSX */}
            </div>
        </div>
    );
};

export default JobApplicationForm;
