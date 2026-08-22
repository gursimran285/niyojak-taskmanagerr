export default function Home() {
    return (
        <>
            {/* Carousel Start */}
            <div className="container-fluid px-0">
                <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
                    <ol className="carousel-indicators">
                        <li
                            data-bs-target="#carouselId"
                            data-bs-slide-to={0}
                            className="active"
                            aria-current="true"
                            aria-label="First slide"
                        />
                        <li
                            data-bs-target="#carouselId"
                            data-bs-slide-to={1}
                            aria-label="Second slide"
                        />
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <img
                                src="/assets/img/carousel-1.jpg"
                                className="img-fluid"
                                alt="First slide"
                            />
                            <div className="carousel-caption">
                                <div className="container carousel-content">
                                    <h6 className="text-secondary h4 animated fadeInUp">
                                        Best IT Solutions
                                    </h6>
                                    <h1 className="text-white display-1 mb-4 animated fadeInRight">
                                        Smart Task Management for Modern Teams
                                    </h1>
                                    <p className="mb-4 text-white fs-5 animated fadeInDown">
                                        Niyojak is an innovative task management solution crafted to streamline project workflows and enhance team collaboration in modern organizations.
                                    </p>
                                    <a href="/login">
                                        <button
                                            type="button"
                                            className="px-4 py-sm-3 px-sm-5 btn btn-warning rounded-pill animated fadeInUp"
                                            style={{ fontWeight: "bold", color: "#03257E" }}
                                        >
                                            LOGIN
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselId"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselId"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/* Carousel End */}



            {/* Cards Start */}
<div
  className="position-relative"
  style={{
    marginTop: "-30vh",
    zIndex: 10,
    backgroundColor: "#0d111c",
  }}
>
  <div className="container py-5">
    <div className="row g-4">

      {/* Organize Card */}
      <div className="col-md-4">
        <div className="niyojak-card h-100">
          <div className="card-body text-center">

            <div className="mb-3">
              <i className="bi bi-folder2-open fs-1 text-primary" />
            </div>

            <h4 className="card-title fw-bold">
              Organize
            </h4>

            <p className="card-text">
              Adding structure to your business allows you to
              free up wasted time and not be bogged down with
              administrative processes.

              <br /><br />

              Information and documents are easy to find with
              one click of the button anytime, anywhere.
            </p>

          </div>
        </div>
      </div>


      {/* Track Card */}
      <div className="col-md-4">
        <div className="niyojak-card h-100">
          <div className="card-body text-center">

            <div className="mb-3">
              <i className="bi bi-graph-up-arrow fs-1 text-success" />
            </div>

            <h4 className="card-title fw-bold">
              Track
            </h4>

            <p className="card-text">
              Stay on top of your projects and tasks and know
              exactly what is occurring in your business.

              <br /><br />

              The ability to see who is doing what in real-time
              or through reports allows greater efficiency,
              through better resource allocation and
              accountability.
            </p>

          </div>
        </div>
      </div>


      {/* Collaborate Card */}
      <div className="col-md-4">
        <div className="niyojak-card h-100">
          <div className="card-body text-center">

            <div className="mb-3">
              <i className="bi bi-people fs-1 text-warning" />
            </div>

            <h4 className="card-title fw-bold">
              Collaborate
            </h4>

            <p className="card-text">
              Keeping everyone on the same page is possible.
              Streamlining and centralizing communications
              makes sure that nothing slips through the cracks.

              <br /><br />

              It provides the comfort that critical business
              information or processes will be continuously
              available.
            </p>

          </div>
        </div>
      </div>

    </div>
  </div>
</div>
{/* Cards End */}

            {/* Blog Start */}
            {/* <div className="container-fluid blog py-5 mb-5">
                <div className="container">
                    <div
                        className="text-center mx-auto pb-5 wow fadeIn"
                        data-wow-delay=".3s"
                        style={{ maxWidth: 600 }}
                    >
                        <h5 className="text-primary">Our Blog</h5>
                        <h1>Core Features</h1>
                    </div>
                    <div className="row g-5 justify-content-center">
                        <div className="col-lg-6 col-xl-4 wow fadeIn" data-wow-delay=".3s">
                            <div className="blog-item position-relative bg-light rounded">
                                <img
                                    src="/assets/img/blog-1.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                                <span
                                    className="position-absolute px-4 py-3 bg-primary text-white rounded"
                                    style={{ top: "-28px", right: 20 }}
                                >
                                    Web Design
                                </span>
                                <div
                                    className="blog-btn d-flex justify-content-between position-relative px-3"
                                    style={{ marginTop: "-75px" }}
                                >
                                    <div className="blog-icon btn btn-secondary px-3 rounded-pill my-auto">
                                        <a href="" className="btn text-white">
                                            Read More
                                        </a>
                                    </div>
                                    <div className="blog-btn-icon btn btn-secondary px-4 py-3 rounded-pill ">
                                        <div className="blog-icon-1">
                                            <p className="text-white px-2">
                                                Share
                                                <i className="fa fa-arrow-right ms-3" />
                                            </p>
                                        </div>
                                        <div className="blog-icon-2">
                                            <a href="" className="btn me-1">
                                                <i className="fab fa-facebook-f text-white" />
                                            </a>
                                            <a href="" className="btn me-1">
                                                <i className="fab fa-twitter text-white" />
                                            </a>
                                            <a href="" className="btn me-1">
                                                <i className="fab fa-instagram text-white" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="blog-content text-center position-relative px-3"
                                    style={{ marginTop: "-25px" }}
                                >
                                    <img
                                        src="/assets/img/admin.jpg"
                                        className="img-fluid rounded-circle border border-4 border-white mb-3"
                                        alt=""
                                    />
                                    <h5 className="">By Daniel Martin</h5>
                                    <span className="text-secondary">24 March 2023</span>
                                    <p className="py-2">
                                        Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut
                                        interdum. Aliquam dolor eget urna ultricies tincidunt libero sit
                                        amet
                                    </p>
                                </div>
                                <div className="blog-coment d-flex justify-content-between px-4 py-2 border bg-primary rounded-bottom">
                                    <a href="" className="text-white">
                                        <small>
                                            <i className="fas fa-share me-2 text-secondary" />
                                            5324 Share
                                        </small>
                                    </a>
                                    <a href="" className="text-white">
                                        <small>
                                            <i className="fa fa-comments me-2 text-secondary" />5 Comments
                                        </small>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4 wow fadeIn" data-wow-delay=".5s">
                            <div className="blog-item position-relative bg-light rounded">
                                <img
                                    src="/assets/img/blog-2.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                                <span
                                    className="position-absolute px-4 py-3 bg-primary text-white rounded"
                                    style={{ top: "-28px", right: 20 }}
                                >
                                    Development
                                </span>
                                <div
                                    className="blog-btn d-flex justify-content-between position-relative px-3"
                                    style={{ marginTop: "-75px" }}
                                >
                                    <div className="blog-icon btn btn-secondary px-3 rounded-pill my-auto">
                                        <a href="" className="btn text-white ">
                                            Read More
                                        </a>
                                    </div>
                                    <div className="blog-btn-icon btn btn-secondary px-4 py-3 rounded-pill ">
                                        <div className="blog-icon-1">
                                            <p className="text-white px-2">
                                                Share
                                                <i className="fa fa-arrow-right ms-3" />
                                            </p>
                                        </div>
                                        <div className="blog-icon-2">
                                            <a href="" className="btn me-1">
                                                <i className="fab fa-facebook-f text-white" />
                                            </a>
                                            <a href="" className="btn me-1">
                                                <i className="fab fa-twitter text-white" />
                                            </a>
                                            <a href="" className="btn me-1">
                                                <i className="fab fa-instagram text-white" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="blog-content text-center position-relative px-3"
                                    style={{ marginTop: "-25px" }}
                                >
                                    <img
                                        src="/assets/img/admin.jpg"
                                        className="img-fluid rounded-circle border border-4 border-white mb-3"
                                        alt=""
                                    />
                                    <h5 className="">By Daniel Martin</h5>
                                    <span className="text-secondary">23 April 2023</span>
                                    <p className="py-2">
                                        Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut
                                        interdum. Aliquam dolor eget urna ultricies tincidunt libero sit
                                        amet
                                    </p>
                                </div>
                                <div className="blog-coment d-flex justify-content-between px-4 py-2 border bg-primary rounded-bottom">
                                    <a href="" className="text-white">
                                        <small>
                                            <i className="fas fa-share me-2 text-secondary" />
                                            5324 Share
                                        </small>
                                    </a>
                                    <a href="" className="text-white">
                                        <small>
                                            <i className="fa fa-comments me-2 text-secondary" />5 Comments
                                        </small>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4 wow fadeIn" data-wow-delay=".7s">
                            <div className="blog-item position-relative bg-light rounded">
                                <img
                                    src="/assets/img/blog-3.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                                <span
                                    className="position-absolute px-4 py-3 bg-primary text-white rounded"
                                    style={{ top: "-28px", right: 20 }}
                                >
                                    Mobile App
                                </span>
                                <div
                                    className="blog-btn d-flex justify-content-between position-relative px-3"
                                    style={{ marginTop: "-75px" }}
                                >
                                    <div className="blog-icon btn btn-secondary px-3 rounded-pill my-auto">
                                        <a href="" className="btn text-white ">
                                            Read More
                                        </a>
                                    </div>
                                    <div className="blog-btn-icon btn btn-secondary px-4 py-3 rounded-pill ">
                                        <div className="blog-icon-1">
                                            <p className="text-white px-2">
                                                Share
                                                <i className="fa fa-arrow-right ms-3" />
                                            </p>
                                        </div>
                                        <div className="blog-icon-2">
                                            <a href="" className="btn me-1">
                                                <i className="fab fa-facebook-f text-white" />
                                            </a>
                                            <a href="" className="btn me-1">
                                                <i className="fab fa-twitter text-white" />
                                            </a>
                                            <a href="" className="btn me-1">
                                                <i className="fab fa-instagram text-white" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="blog-content text-center position-relative px-3"
                                    style={{ marginTop: "-25px" }}
                                >
                                    <img
                                        src="/assets/img/admin.jpg"
                                        className="img-fluid rounded-circle border border-4 border-white mb-3"
                                        alt=""
                                    />
                                    <h5 className="">By Daniel Martin</h5>
                                    <span className="text-secondary">30 jan 2023</span>
                                    <p className="py-2">
                                        Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut
                                        interdum. Aliquam dolor eget urna ultricies tincidunt libero sit
                                        amet
                                    </p>
                                </div>
                                <div className="blog-coments d-flex justify-content-between px-4 py-2 border bg-primary rounded-bottom">
                                    <a href="" className="text-white">
                                        <small>
                                            <i className="fas fa-share me-2 text-secondary" />
                                            5324 Share
                                        </small>
                                    </a>
                                    <a href="" className="text-white">
                                        <small>
                                            <i className="fa fa-comments me-2 text-secondary" />5 Comments
                                        </small>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Blog End */}


            

        </>
    )
}