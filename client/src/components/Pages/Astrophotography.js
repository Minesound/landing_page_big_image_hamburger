import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Loading from "../../Animations/Loading";
import "../../css/featured-proj.css";
import { REACT_APP_BASE_TITLE, REACT_APP_SERVER } from "../../grobalVars";

function AstrophotoGraphy() {
    const [photos, SetPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([])
    document.title = `Astrophotography | ${REACT_APP_BASE_TITLE}`;

    useEffect(() => {
        fetch(`${REACT_APP_SERVER}/api/isSignedIn`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    localStorage.removeItem("jwtToken");
                    return;
                }
            });

        fetch(`${REACT_APP_SERVER}/api/astrophotographies/approved`, {
            method: "get",
        })
            .then((res) => res.json())
            .then((data) => {
                SetPhotos(data);
                setFilteredPhotos(data)
            });
    }, []);

    const [page, SetPage] = useState(1);
    const photos_per_page = 6;
    const no_of_pages = Math.ceil(photos.length / photos_per_page);

    const handleTagFilter = tag => {
        setFilteredPhotos(photos.filter(item => item.tags.includes(tag)))
    }

    return (
        <>
            <Loading time={2} />
            <div className="cont">
                <h3 className="my-3 titleBold d-flex justify-content-center topic">
                    <p className="" style={{ marginBottom: "0px", textAlign: "center" }}>PROJECTS</p>
                </h3>
                <div
                    className="miniSep"
                    style={{ marginBottom: "40px", background: "rgb(204, 67, 67)" }}
                ></div>
                <div
                    className="main"
                    style={{ overflow: "hidden", minHeight: "31.7vh" }}
                >
                    <ul className="cards">
                        {filteredPhotos
                            .slice((page - 1) * photos_per_page, page * photos_per_page)
                            .map(photo => (
                                <li
                                    className="cards_item"
                                    data-aos="fade-up"
                                    data-aos="flip-left"
                                    data-aos-easing="linear"
                                    data-aos-duration="1500"
                                    key={photos._id}
                                >
                                    <div className="card cardproj">
                                        <div className="card_image">
                                            <img
                                                className="evfeatured"
                                                src={`${REACT_APP_SERVER}/images/${photo.pic}`}
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "18rem",
                                                    minHeight: "18rem",
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="card_content forphone forphone1"
                                            style={{ width: "100%" }}
                                        >
                                            <h2
                                                className="card_title forphone forphone2 text-center"
                                                style={{ width: "100%", fontSize: '4rem' }}
                                            >
                                                {photo.title}
                                            </h2>
                                            <p
                                                className="card_text forphone forphone3"
                                                style={{ width: "100%", height: '3rem' }}
                                            >
                                                <strong>Tags :{" "}</strong>
                                                {
                                                    photo.tags.map((tag, i) => (
                                                        <h5 className="d-inline" key={i} style={{ cursor: 'pointer' }} onClick={e => handleTagFilter(tag)}><span className="badge badge-primary my-1 mx-1">{tag}</span></h5>
                                                    ))
                                                }
                                            </p>
                                            <Button
                                                className="btns card_btns"
                                                variant="danger"
                                                href={`astrophotography/${photo._id}`}
                                                style={{ marginTop: 10 }}
                                            >
                                                Read More
                      </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                    {!photos.length && (
                        <h3 className="text-center mt-5">No photos available...!</h3>
                    )}
                    <div className="float-right mr-5 mb-3 mt-5">
                        {page > 1 && (
                            <Button
                                className="mx-1"
                                variant="primary"
                                onClick={() => {
                                    SetPage((page) => page - 1);
                                }}
                            >
                                <i className="fa fa-angle-double-left"></i> Previous
                            </Button>
                        )}
                        {page < no_of_pages && (
                            <Button
                                variant="primary"
                                className="mx-1"
                                onClick={() => {
                                    SetPage((page) => page + 1);
                                }}
                            >
                                Next <i className="fa fa-angle-double-right"></i>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AstrophotoGraphy;