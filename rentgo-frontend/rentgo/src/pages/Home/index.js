import React from 'react'

export default function Home() {
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{marginBottom: 50}}>
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={require('../../assets/img/travel.jpg')} className="d-block w-100" alt="..." width="300" height="500"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={require('../../assets/img/driver-travel.jpg')} className="d-block w-100" alt="..." width="300" height="500"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            <main className="mt-5 pt-5">
                <div className="container">
                    <section className="text-center">
                        <div className="row mb-4 wow fadeIn">

                            <div className="col-lg-4 col-md-12 mb-4">
                                <div className="card">
                                    <img class="card-img-top" src={require('../../assets/img/passengers.jpg')} alt="Card image cap" />
                                    <div className="card-body">
                                        <h4 className="card-title">Para passageiros</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 mb-4">
                                <div className="card">
                                    <img class="card-img-top" src={require('../../assets/img/driver-travel.jpg')} alt="Card image cap" />
                                    <div className="card-body">
                                        <h4 className="card-title">Para motoristas</h4>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}