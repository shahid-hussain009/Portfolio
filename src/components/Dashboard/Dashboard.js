import React, { useEffect, useState } from 'react'

export const Dashboard = () => {
    let [showPage, setShowPage] = useState(false);

    const handleRefresh = () => {
        window.location.reload();
    };

    useEffect(() => {
        setTimeout(() => {
            setShowPage(true);
        }, 5000);
    }, []);

    return (

        <>
            {
                showPage === true &&
                <>
                    <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
                        <div className="hero-container" data-aos="fade-in">
                            <h1>Name Here</h1>
                            <p>
                                <span className="typed" id="typed" data-typed-items="Designer, Developer, Freelancer"></span>
                            </p>
                        </div>
                    </section>
                </>
            }
            {
                showPage === false &&

                <>
                    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                        <div className="text-center">
                            <i className="fas fa-search fa-3x text-primary mb-4"></i>
                            <h1 className="text-primary mb-3">Profile Not Found</h1>
                            <p className="text-muted mb-4">We couldn't find a profile for this URL. Please refresh the page.</p>
                            <button
                                type="button"
                                className="btn btn-primary btn-lg px-4"
                                onClick={handleRefresh}
                            >
                                <i className="fas fa-redo me-2"></i>
                                Refresh Page
                            </button>
                        </div>
                    </div>
                </>
            }

        </>
    )
}
