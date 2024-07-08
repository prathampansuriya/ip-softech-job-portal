import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiRequest } from '../utils';

const JobApplications = () => {
    const { user } = useSelector((state) => state.user);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = user.token; // Assuming user is logged in and token is stored in Redux state
                const result = await apiRequest({
                    url: `/jobs/get-user-job-applications`, // Endpoint to fetch user's job applications
                    token,
                    method: 'GET'
                });

                if (result.success) {
                    setApplications(result.applications);
                } else {
                    console.log(result.message);
                }
            } catch (error) {
                console.error('Error fetching job applications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user]);

    return (
        <div className="job-applications p-4">
            <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
            {loading ? (
                <p>Loading applications...</p>
            ) : (
                <div className="applications-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {applications.length === 0 ? (
                        <p>No job applications found.</p>
                    ) : (
                        applications.map(application => (
                            <div key={application._id} className="application bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <p className="mb-2"><strong>Job Name:</strong> <span className="ml-2">{application?.jobId?.jobTitle}</span></p>
                                <p className="mb-2"><strong>Job Type:</strong> <span className="ml-2">{application?.jobId?.jobType}</span></p>
                                <p className="mb-2"><strong>Location:</strong> <span className="ml-2">{application?.jobId?.location}</span></p>
                                <p className="mb-2"><strong>Salary:</strong> <span className="ml-2">{application?.jobId?.salary}</span></p>
                                <p className="mb-2"><strong>Name:</strong> <span className="ml-2">{application.name}</span></p>
                                <p className="mb-2"><strong>Email:</strong> <span className="ml-2">{application.email}</span></p>
                                <p className="mb-2"><strong>Contact:</strong> <span className="ml-2">{application.contact}</span></p>
                                <p className="mb-2"><strong>About:</strong> <span className="ml-2">{application.about}</span></p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default JobApplications;
